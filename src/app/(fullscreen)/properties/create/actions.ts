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

    const { media = [], aerialImages = [], model3dImages = [], floorPlanImages = [] } = parsed.data
    const presignedMediaPromises = [...media.map((file) => getPresignedPost(`property_media/${file.name}`))]
    const presignedAerialPromises = aerialImages?.length > 0 ? [...aerialImages.map((file) => getPresignedPost(`property_media/${file.name}`))] : []
    const presigned3dModelPromises = model3dImages?.length > 0 ? [...model3dImages.map((file) => getPresignedPost(`property_media/${file.name}`))] : []
    const presignedFloorPlanPromises = floorPlanImages?.length > 0 ? [...floorPlanImages.map((file) => getPresignedPost(`property_media/${file.name}`))] : []
    const presignedPostsResponses = await Promise.all([
        ...presignedMediaPromises,
        ...presignedAerialPromises,
        ...presigned3dModelPromises,
        ...presignedFloorPlanPromises,
    ])
    const allFiles = [...media, ...aerialImages, ...model3dImages, ...floorPlanImages]

    // Here you would typically upload the files to the presigned URLs
    // and then collect the URLs to send in the final property creation request.
    const uploadUrlPromises = presignedPostsResponses.map(async (presignedPostResponse, index) => {
        return uploadToS3(allFiles[index], presignedPostResponse.body)
    })

    const uploadedUrls = await Promise.all(uploadUrlPromises)

    // Now, construct the final property data with uploaded URLs
    const propertyData = {
        ...parsed.data,
        media: uploadedUrls.slice(0, media.length),
        aerialImages: uploadedUrls.slice(media.length, media.length + aerialImages.length),
        model3dImages: uploadedUrls.slice(media.length + aerialImages.length, media.length + aerialImages.length + model3dImages.length),
        floorPlanImages: uploadedUrls.slice(media.length + aerialImages.length + model3dImages.length),
    }

    try {
        const accessToken = await getServerToken()
        const res = await fetch(`${EnvironmentHelper.API_BASE_URL}/property`, {
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
                    form: [data?.message || 'Sign in failed.'],
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