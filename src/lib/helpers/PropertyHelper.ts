import ImageHelper from "./ImageHelper"
import EnvironmentHelper from "./EnvironmentHelper"
import { Apartment, Building, Property, PropertyDocument } from "@/types/property"

export default class PropertyHelper {
  public static getApartmentsFromProperty: (property: Property) => Apartment[] = (property) => {
    return property.buildings.map(building => building.apartments).reduce((acc, curr) => [...acc, ...curr]) ?? []
  }

  public static getTotalValueOfBlock: (building: Building) => number = (building) => {
    return building.apartments.reduce((acc, curr) => Number(acc) + Number(curr.price), 0)
  }

  public static getAmenitiesFromBuilding: (building: Building) => string[] = (building) => {
    if (!building?.amenities) {
      return []
    }

    const amenitiesString = building.amenities
    const amenities = JSON.parse(amenitiesString)
    return amenities
  }

  public static getAmenitiesFromProperty: (property: Property) => string[] = (property) => {
    if (!property?.amenities) {
      return []
    }

    const amenitiesString = property.amenities
    const amenities = JSON.parse(amenitiesString)
    return amenities
  }

  public static getCdnLink: (url: string | null | undefined) => string | null | undefined = (url) => {
    if (!url) {
      return null
    }

    const baseUrl = EnvironmentHelper.PROPERTY_CDN_BASE_URL
    const fileName = url.split('/').at(-1)
    const link = `${baseUrl}/${fileName}`
    return link
  }

  public static getUnitsFromBuildings: (building: Building[]) => Apartment[] = (buildings) => {
    const units: Apartment[] = []

    buildings.forEach(building => {
      building.apartments.forEach(element => {
        units.push(element)
      });
    });

    return units
  }

  public static getUnitCount: (property: Property) => number = (property) => {
    const units = property?.buildings?.reduce((accumulator, building) => accumulator + Number(building.apartment_count), 0)
    return units
  }

  public static getBedroomCount: (property: Property) => number = (property) => {
    const bedrooms = property?.buildings?.reduce((accumulator, building) => accumulator + Number(building.bedroom_count), 0)
    return bedrooms
  }

  public static getBathroomCount: (property: Property) => number = (property) => {
    const bathrooms = property?.buildings?.reduce((accumulator, building) => accumulator + Number(building.bathroom_count), 0)
    return bathrooms
  }

  public static _getAmenitiesFromProperty: (property: Property) => string[] = (property) => {
    if (!property?.buildings || property?.buildings?.length < 1) {
      return []
    }

    const amenities = property.buildings.map(building => this.getAmenitiesFromBuilding(building)).reduce((acc, curr) => [...acc, ...curr]) ?? []
    return amenities
  }

  public static getPropertyDocuments(property: Property): PropertyDocument[] {
    const asString = property.property_documents;

    if (!asString) {
      return [];
    }

    try {
      const parsed = JSON.parse(asString);

      // Case 1: Already string[] (array of URLs)
      if (Array.isArray(parsed) && typeof parsed[0] === "string") {
        return parsed.map((url) => ({
          name: undefined,
          file: url,
          size: undefined,
        } as PropertyDocument));
      }

      // Case 2: Array of objects with file info
      if (
        Array.isArray(parsed) &&
        typeof parsed[0] === "object" &&
        parsed[0] !== null &&
        "file" in parsed[0]
      ) {
        return parsed as PropertyDocument[];
      }

      // Fallback: unknown format
      return [];
    } catch (e) {
      console.error("Failed to parse property_documents:", e);
      return [];
    }
  }

  public static getImagesFromJsonArray: (array: string | null) => (string)[] = (array) => {
    const list: string[] = array ? JSON.parse(array) : []
    return list
  }

  public static getImages: (property: Pick<Property, 'aerial_image' | 'model_3d_image' | 'floor_plan_image' | 'display_image'>) => (string)[] = (property) => {
    const aerialImages: string[] = property.aerial_image ? JSON.parse(property.aerial_image) : []
    const model3dImages: string[] = property.model_3d_image ? JSON.parse(property.model_3d_image) : []
    const floorPlanImages: string[] = property.floor_plan_image ? JSON.parse(property.floor_plan_image) : []
    const images = [property.display_image, ...floorPlanImages, ...aerialImages, ...model3dImages].filter(image => image != null)

    const cleaned: string[] = []

    images.forEach(element => {
      if (element && element.length > 0) {
        cleaned.push(element)
      }
    });

    return cleaned
  }

  // New method for form data with File objects
  public static getImagesFromFormData: (formData: { displayImage?: File; model3dImages?: File[]; floorPlanImages?: File[]; aerialImages?: File[] }) => File[] = (formData) => {
    const images: File[] = []

    if (formData.displayImage) {
      images.push(formData.displayImage)
    }

    if (formData.floorPlanImages) {
      images.push(...formData.floorPlanImages)
    }

    if (formData.model3dImages) {
      images.push(...formData.model3dImages)
    }

    if (formData.aerialImages) {
      images.push(...formData.aerialImages)
    }

    return images
  }

  public static getImagesWithTitles: (property: Property) => Record<'aerial' | 'display' | 'floorPlan' | 'model3d', (string | null)[]> = (property) => {
    const aerialImages: string[] = property.aerial_image ? JSON.parse(property.aerial_image) : []
    const model3dImages: string[] = property.model_3d_image ? JSON.parse(property.model_3d_image) : []
    const floorPlanImages: string[] = property.floor_plan_image ? JSON.parse(property.floor_plan_image) : []

    return {
      aerial: aerialImages.filter(url => url),
      display: [property.display_image].filter(url => url),
      floorPlan: floorPlanImages.filter(url => url),
      model3d: model3dImages.filter(url => url)
    }
  }
}
