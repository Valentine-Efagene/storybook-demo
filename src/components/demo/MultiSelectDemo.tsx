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

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">Accessible MultiSelect Demo</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="tech-select" className="block text-sm font-medium mb-2">
                        Select your favorite technologies:
                    </label>
                    <MultiSelect
                        options={techOptions}
                        selected={selectedTech}
                        onSelectionChange={setSelectedTech}
                        placeholder="Choose technologies..."
                        searchable={true}
                        showSelectedBadges={true}
                        maxDisplay={2}
                    />
                </div>
                
                <div className="p-3 bg-gray-50 rounded-md">
                    <h3 className="font-medium text-sm mb-2">Selected Technologies:</h3>
                    <div className="text-sm text-gray-600">
                        {selectedTech.length > 0 ? selectedTech.join(", ") : "None selected"}
                    </div>
                </div>
                
                <div className="text-xs text-gray-500">
                    <h4 className="font-medium mb-1">Accessibility Features:</h4>
                    <ul className="space-y-1 list-disc ml-4">
                        <li>Proper ARIA labels and descriptions</li>
                        <li>Keyboard navigation (Tab, Enter, Space, arrows)</li>
                        <li>Screen reader compatible</li>
                        <li>Focus management</li>
                        <li>Individual item checkboxes</li>
                        <li>Built with shadcn/ui components</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}