import { z } from "zod"

export const propertyDetailsFormSchema = z.object({
    title: z.string().min(1, "Property title is required"),
    type: z.enum(["apartment", "house", "condo", "townhouse"]),
    description: z.string().optional(),
    bedrooms: z.number().min(0, "Bedrooms must be 0 or greater").optional(),
    bathrooms: z.number().min(0, "Bathrooms must be 0 or greater").optional(),
    squareFeet: z.number().min(0, "Square feet must be 0 or greater").optional(),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    price: z.number().min(0.01, "Price must be greater than 0"),
    priceType: z.enum(["sale", "rent", "lease"]),
    status: z.enum(["available", "pending", "sold", "rented"]),
})

export const propertyDetailsSchema = z.object({
    title: z.string().min(1, "Property title is required"),
    type: z.enum(["apartment", "house", "condo", "townhouse"]),
    description: z.string().optional(),
    bedrooms: z.number().min(0, "Bedrooms must be 0 or greater").optional(),
    bathrooms: z.number().min(0, "Bathrooms must be 0 or greater").optional(),
    squareFeet: z.number().min(0, "Square feet must be 0 or greater").optional(),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    price: z.number().min(0, "Price must be 0 or greater"),
    priceType: z.enum(["sale", "rent", "lease"]),
    status: z.enum(["available", "pending", "sold", "rented"]),
})

export const gallerySchema = z.object({
    displayImage: z.instanceof(File, { message: "Display image is required" }),
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