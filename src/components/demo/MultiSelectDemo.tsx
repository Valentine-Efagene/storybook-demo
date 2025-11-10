import { useState } from "react"
import { MultiSelect } from "@/components/form/MultiSelect"

const techOptions = [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Next.js", value: "nextjs" },
    { label: "TypeScript", value: "typescript" },
    { label: "JavaScript", value: "javascript" },
    { label: "Node.js", value: "nodejs" },
    { label: "Python", value: "python", disabled: true },
    { label: "Go", value: "go" }
]

export function MultiSelectDemo() {
    const [selectedTech, setSelectedTech] = useState<string[]>(["react", "typescript"])
    const [selectedSingle, setSelectedSingle] = useState<string[]>([])

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold mb-6">Accessible Select Component Demo</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Multiple Selection */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="tech-multi-select" className="block text-sm font-medium mb-2">
                            Multiple Selection Mode:
                        </label>
                        <MultiSelect
                            options={techOptions}
                            selected={selectedTech}
                            onSelectionChange={setSelectedTech}
                            multiple={true}
                            placeholder="Choose technologies..."
                            searchable={true}
                            showSelectedBadges={true}
                            maxDisplay={2}
                        />
                    </div>

                    <div className="p-3 bg-gray-50 rounded-md">
                        <h3 className="font-medium text-sm mb-2">Selected (Multiple):</h3>
                        <div className="text-sm text-gray-600">
                            {selectedTech.length > 0 ? selectedTech.join(", ") : "None selected"}
                        </div>
                    </div>
                </div>

                {/* Single Selection */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="tech-single-select" className="block text-sm font-medium mb-2">
                            Single Selection Mode:
                        </label>
                        <MultiSelect
                            options={techOptions}
                            selected={selectedSingle}
                            onSelectionChange={setSelectedSingle}
                            multiple={false}
                            placeholder="Choose one technology..."
                            searchable={true}
                            showSelectedBadges={false}
                        />
                    </div>

                    <div className="p-3 bg-gray-50 rounded-md">
                        <h3 className="font-medium text-sm mb-2">Selected (Single):</h3>
                        <div className="text-sm text-gray-600">
                            {selectedSingle.length > 0 ? selectedSingle[0] : "None selected"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-xs text-gray-500">
                <h4 className="font-medium mb-1">Accessibility Features:</h4>
                <ul className="space-y-1 list-disc ml-4">
                    <li>Proper ARIA labels and descriptions</li>
                    <li>Keyboard navigation (Tab, Enter, Space, arrows)</li>
                    <li>Screen reader compatible</li>
                    <li>Focus management</li>
                    <li>Checkboxes for multiple, checkmarks for single selection</li>
                    <li>Auto-close dropdown in single selection mode</li>
                    <li>Built with shadcn/ui components</li>
                </ul>
            </div>
        </div>
    )
}