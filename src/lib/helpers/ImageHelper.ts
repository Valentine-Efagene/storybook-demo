import EnvironmentHelper from "./EnvironmentHelper"

export type IImageType = 'avatar' | 'property'

export default class ImageHelper {
  public static mimeTypes = {
    image: [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
      'image/gif',
      'image/svg+xml',
      'image/bmp',
      'image/tiff',
      'image/heif',
      'image/heic',
    ]
  }

  public static getCdnLink: (url: string | null | undefined, imageType: IImageType) => string | null | undefined = (url, imageType) => {
    if (!url) {
      return null
    }

    let baseUrl = EnvironmentHelper.PROPERTY_CDN_BASE_URL

    switch (imageType) {
      case 'avatar':
        baseUrl = EnvironmentHelper.AVATAR_CDN_BASE_URL
        break;

      default:
        baseUrl = EnvironmentHelper.PROPERTY_CDN_BASE_URL
        break;
    }
    const fileName = url.split('/').at(-1)
    const link = `${baseUrl}/${fileName}`
    return link
  }
}