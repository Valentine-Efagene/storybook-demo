export class QueryHelper {
    public static buildQueryUrl(base: string, params: Record<string, string | null | number | undefined>) {
        const query = new URLSearchParams(
            Object.entries(params).filter(([, v]) => v !== undefined && v !== null) as [string, string][]
        ).toString();

        return `${base}?${query}`;
    }
}