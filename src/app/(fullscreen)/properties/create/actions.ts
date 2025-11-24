'use server'
import EnvironmentHelper from '@/lib/helpers/EnvironmentHelper'
import { completePropertySchema } from '@/lib/schemas/property'
import { getPresignedPost, uploadToS3 } from '@/lib/api'
import { ApiResponse } from '@/types/common'
import { Property } from '@/types/property'
import { invalidatePropertiesCache } from '@/lib/cache-utils'
import { getServerToken } from '@/lib/server'

export async function createProperty(formData: unknown) {
    const parsed = completePropertySchema.safeParse(formData)

    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors }
    }

    const { media = [], three_d_walkthroughs = [], floor_plans = [] } = parsed.data

    // Get presigned URLs for all files
    const presignedMediaPromises = media.map((file) => getPresignedPost(`property_media/${file.name}`))
    const presigned3dModelPromises = three_d_walkthroughs.map((file) => getPresignedPost(`property_media/${file.name}`))
    const presignedFloorPlanPromises = floor_plans.map((file) => getPresignedPost(`property_media/${file.name}`))

    const presignedPostsResponses = await Promise.all([
        ...presignedMediaPromises,
        ...presigned3dModelPromises,
        ...presignedFloorPlanPromises,
    ])

    const allFiles = [...media, ...three_d_walkthroughs, ...floor_plans]

    // Upload all files to S3 using presigned URLs
    const uploadUrlPromises = presignedPostsResponses.map(async (presignedPostResponse, index) => {
        return uploadToS3(allFiles[index], presignedPostResponse.body)
    })

    const uploadedUrls = await Promise.all(uploadUrlPromises)

    // Now, construct the final property data with uploaded URLs
    // Calculate slice indices correctly
    const mediaEndIndex = media.length
    const model3dEndIndex = mediaEndIndex + three_d_walkthroughs.length

    const propertyData = {
        ...parsed.data,
        media: uploadedUrls.slice(0, mediaEndIndex),
        three_d_walkthroughs: uploadedUrls.slice(mediaEndIndex, model3dEndIndex),
        floor_plans: uploadedUrls.slice(model3dEndIndex),
    }

    console.log({ propertyData })

    try {
        const accessToken = await getServerToken()
        const res = await fetch(`${EnvironmentHelper.API_BASE_URL}/property/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(propertyData),
            cache: 'no-store',
        })

        const data: ApiResponse<Property> = await res.json()

        if (!res.ok) {
            return {
                error: {
                    form: [data?.message || 'Failed to create property. Please try again.'],
                },
            }
        }

        await invalidatePropertiesCache()

        return { success: data?.message || 'Property created successfully!' }
    } catch (err: any) {
        // Delete documents from S3 if property creation fails
        await Promise.all(uploadedUrls.map(async (url) => {
            try {
                const endpoint = new URL(`${EnvironmentHelper.API_BASE_URL}/uploader/document`);
                endpoint.searchParams.append("url", url);
                const res = await fetch(endpoint.toString(), {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url }),
                    cache: 'no-store',
                })
                if (!res.ok) {
                    console.error(`Failed to delete document at ${url}`)
                }
            } catch (deleteErr) {
                console.error(`Error deleting document at ${url}:`, deleteErr)
            }
        }))

        return {
            error: {
                form: [err.message || 'Unexpected error occurred.'],
            },
        }
    }
}