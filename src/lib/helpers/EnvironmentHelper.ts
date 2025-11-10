export default class EnvironmentHelper {
    public static API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
    public static PAGINATION_LIMIT = 10 // Number(process.env.NEXT_PUBLIC_PAGINATION_LIMIT) ?? 10
    public static PRESIGNER_TTL = Number(process.env.NEXT_PUBLIC_PRESIGNER_TTL)
    public static GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    public static PROJECT_OWNER = process.env.NEXT_PUBLIC_PROJECT_OWNER
    public static PROPERTY_CDN_BASE_URL = process.env.NEXT_PUBLIC_PROPERTY_CDN_BASE_URL
    public static AVATAR_CDN_BASE_URL = process.env.NEXT_PUBLIC_AVATAR_CDN_BASE_URL
    public static FRONT_END_URL = process.env.NEXT_PUBLIC_FRONT_END_URL
    public static APP_NAME = 'MREIF ADMIN DASHBOARD'
    public static SUPERSET_ID = process.env.NEXT_PUBLIC_SUPERSET_ID
    public static SUPERSET_URL = process.env.NEXT_PUBLIC_SUPERSET_URL
    public static GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    public static GOOGLE_CALENDAR_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY
    public static GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
}