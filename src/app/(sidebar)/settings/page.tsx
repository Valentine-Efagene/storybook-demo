import { Button } from "@/components/ui/button";

export default function page() {
    const currencies: {
        from: string;
        to: string;
        rate: number;
        from_symbol: string;
        to_symbol: string;
        last_updated: string;
    }[] = [
            {
                from: "USD",
                to: "NGN",
                rate: 750,
                last_updated: "2024-01-01",
                from_symbol: "$",
                to_symbol: "₦"
            },
            {
                from: 'GBP',
                to: 'NGN',
                rate: 950,
                from_symbol: '£',
                to_symbol: '₦',
                last_updated: '2024-01-01'
            },
            {
                from: 'CAD',
                to: 'NGN',
                rate: 600,
                from_symbol: 'C$',
                to_symbol: '₦',
                last_updated: '2024-01-01'
            },
            {
                from: "EUR",
                to: "NGN",
                rate: 800,
                last_updated: "2024-01-01",
                from_symbol: "€",
                to_symbol: "₦",
            },
        ]

    const currencyFlags: Record<string, string> = {
        USD: '🇺🇸',
        NGN: '🇳🇬',
        EUR: '🇪🇺',
        GBP: '🇬🇧',
        CAD: '🇨🇦',
    };

    return (
        <div className="w-full flex flex-col gap-6">
            <h1 className="text-2xl font-semibold">Currencies</h1>
            <div className="grid grid-cols-2 gap-6">
                {currencies.map((currency) => (
                    <div
                        key={`${currency.from}-${currency.to}`}
                        className="p-4 border border-gray-200 rounded-lg shadow-sm m-2"
                    >
                        <div className="flex flex-row items-center justify-between gap-2 mb-4">
                            <div className="text-8xl rounded-full w-10 h-10 flex items-center justify-center overflow-hidden">
                                {currencyFlags[currency.from]}
                            </div>
                            <Button variant='subtle' size='sm'>Edit</Button>
                        </div>
                        <h2 className="text-lg font-medium mb-2">
                            {currency.from} to {currency.to}
                        </h2>
                        <p className="text-gray-600 mb-1">
                            Exchange Rate: {currency.from_symbol}
                            {currency.rate} {currency.to_symbol}
                        </p>
                        <p className="text-gray-500 text-sm">
                            Last Updated: {currency.last_updated}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
