import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
    /** Current page number (1-indexed) */
    currentPage: number;
    /** Total number of items */
    totalItems: number;
    /** Number of items per page */
    itemsPerPage: number;
    /** Available page size options */
    pageSizeOptions?: number[];
    /** Callback when page changes */
    onPageChange: (page: number) => void;
    /** Callback when page size changes */
    onPageSizeChange: (pageSize: number) => void;
    /** Custom className */
    className?: string;
    /** Show page size selector */
    showPageSizeSelector?: boolean;
}

export function Pagination({
    currentPage,
    totalItems,
    itemsPerPage,
    pageSizeOptions = [10, 20, 50, 100],
    onPageChange,
    onPageSizeChange,
    className,
    showPageSizeSelector = true,
}: PaginationProps) {
    // Calculate pagination values
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    // Handlers
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageSizeChange = (value: string) => {
        const newPageSize = parseInt(value, 10);
        onPageSizeChange(newPageSize);

        // Adjust current page if necessary
        const newTotalPages = Math.ceil(totalItems / newPageSize);
        if (currentPage > newTotalPages && newTotalPages > 0) {
            onPageChange(newTotalPages);
        }
    };

    return (
        <div className={cn(
            "flex items-center justify-between gap-4 px-2 py-3 text-[var(--primary-text)]",
            className
        )}>
            {/* Left side - Page size selector */}
            <div className="flex items-center gap-2">
                {showPageSizeSelector && (
                    <Select
                        value={itemsPerPage.toString()}
                        onValueChange={handlePageSizeChange}
                    >
                        <SelectTrigger className="h-8">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent align="start">
                            {pageSizeOptions.map((option) => (
                                <SelectItem key={option} value={option.toString()}>
                                    {option} Rows
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>

            {/* Right side - Pagination info and navigation */}
            <div className="flex items-center gap-6">
                {/* Count display */}
                <div className="text-sm text-muted-foreground whitespace-nowrap">
                    {totalItems === 0 ? (
                        "No items"
                    ) : (
                        `${startItem}-${endItem} of ${totalItems}`
                    )}
                </div>

                {/* Navigation buttons */}
                <div className="flex items-center gap-1">
                    <Button
                        variant="subtle"
                        size="sm"
                        onClick={handlePreviousPage}
                        disabled={currentPage <= 1 || totalItems === 0}
                        aria-label="Previous page"
                    >
                        Previous
                    </Button>

                    <Button
                        variant="subtle"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={currentPage >= totalPages || totalItems === 0}
                        aria-label="Next page"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}