import { z } from "zod"

export const propertyDetailsFormSchema = z.object({
    title: z.string().min(1, "Property title is required"),
    type: z.enum(["apartment", "house", "condo", "townhouse"]),
    description: z.string().optional(),
    bedrooms: z.number().min(0, "Bedrooms must be 0 or greater").optional(),
    bathrooms: z.number().min(0, "Bathrooms must be 0 or greater").optional(),
    location: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    price: z.number().min(0.01, "Price must be greater than 0"),
    currency: z.enum(["NGN", "USD"]),
    status: z.enum(["available", "pending", "sold", "rented"]),
    completion_status: z.enum(["under_construction", "completed", "off_plan"]).optional(),
})

export const propertyDetailsSchema = z.object({
    title: z.string().min(1, "Property title is required"),
    type: z.enum(["apartment", "house", "condo", "townhouse"]),
    description: z.string().optional(), //.min(1, "Description is required"),
    bedrooms: z.number().min(0, "Bedrooms must be 0 or greater").optional(),
    bathrooms: z.number().min(0, "Bathrooms must be 0 or greater").optional(),
    location: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    price: z.number().min(0, "Price must be 0 or greater"),
    currency: z.enum(["NGN", "USD"]),
    completion_status: z.enum(["under_construction", "completed", "off_plan"]).optional(),
    status: z.enum(["available", "pending", "sold", "rented"]),
})

export const milestoneUpdateSchema = z.object({
    completion_date: z.string().min(1, "Completion date is required"),
    proof: z.array(z.instanceof(File)),
})

export const propertyAvailabilityStatusSchema = z.object({
    availability_status: z.enum(["available", "unavailable", "pending"]).optional(),
})

export const gallerySchema = z.object({
    media: z.array(z.instanceof(File)).min(1, { message: "Display image is required" }),
    model3dImages: z.array(z.instanceof(File)).optional(),
    floorPlanImages: z.array(z.instanceof(File)).optional(),
    aerialImages: z.array(z.instanceof(File)).optional(),
})

export const amenitiesSchema = z.object({
    amenities: z.array(z.string()).min(1, "Please select at least one amenity"),
})

export const plansSchema = z.object({
    plans: z.array(z.string()).min(1, "Please select at least one plan"),
})

export const completePropertySchema = propertyDetailsSchema
    .merge(gallerySchema)
    .merge(amenitiesSchema)
    .merge(plansSchema)

export type PropertyDetailsFormInputs = z.infer<typeof propertyDetailsFormSchema>
export type PropertyDetailsFormData = z.infer<typeof propertyDetailsSchema>
export type GalleryFormData = z.infer<typeof gallerySchema>
export type AmenitiesFormData = z.infer<typeof amenitiesSchema>
export type PlansFormData = z.infer<typeof plansSchema>
export type CompletePropertyFormData = z.infer<typeof completePropertySchema>