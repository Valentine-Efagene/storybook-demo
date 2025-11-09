import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { FormSearchInput } from './FormSearchInput';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const meta = {
  title: 'Form/FormSearchInput',
  component: FormSearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    error: {
      control: { type: 'text' },
    },
    helperText: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    isRequired: {
      control: { type: 'boolean' },
    },
    showClearButton: {
      control: { type: 'boolean' },
    },
    searchIconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
  },
  args: {
    onChange: fn(),
    onClear: fn(),
  },
} satisfies Meta<typeof FormSearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

// Basic States
export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Search Products',
    placeholder: 'Enter product name or SKU...',
  },
};

export const Required: Story = {
  args: {
    label: 'Search Users',
    placeholder: 'Search by name or email...',
    isRequired: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Global Search',
    placeholder: 'Type to search across all content...',
    helperText: 'Search will include products, users, and orders',
  },
};

export const WithError: Story = {
  args: {
    label: 'Search Query',
    placeholder: 'Enter search term...',
    error: 'Search term must be at least 3 characters long',
    value: 'ab',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Search (Disabled)',
    placeholder: 'Search not available...',
    disabled: true,
    helperText: 'Search is temporarily unavailable',
  },
};

export const SearchIconRight: Story = {
  args: {
    label: 'Filter Items',
    placeholder: 'Filter by category...',
    searchIconPosition: 'right',
  },
};

export const NoClearButton: Story = {
  args: {
    label: 'Simple Search',
    placeholder: 'No clear button...',
    showClearButton: false,
    value: 'sample search text',
  },
};

export const LongPlaceholder: Story = {
  args: {
    label: 'Advanced Search',
    placeholder: 'Search by product name, SKU, category, brand, or description...',
    helperText: 'Use specific keywords for better results',
  },
};

// Interactive Examples
export const InteractiveSearch: Story = {
  render: (args) => {
    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState<string[]>([]);

    // Mock search results
    const mockResults = [
      'Apple iPhone 15',
      'Samsung Galaxy S24',
      'Google Pixel 8',
      'Apple MacBook Pro',
      'Dell XPS 13',
      'Sony WH-1000XM5',
      'Apple AirPods Pro',
      'Microsoft Surface Pro',
    ];

    const handleSearch = (value: string) => {
      setSearchValue(value);

      if (value.length >= 2) {
        const filtered = mockResults.filter(item =>
          item.toLowerCase().includes(value.toLowerCase())
        );
        setResults(filtered);
      } else {
        setResults([]);
      }
    };

    const handleClear = () => {
      setSearchValue('');
      setResults([]);
    };

    return (
      <div className="w-80 space-y-4">
        <FormSearchInput
          {...args}
          label="Product Search"
          placeholder="Search products..."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          onClear={handleClear}
          helperText={`${results.length} results found`}
        />

        {/* Search Results */}
        {searchValue && (
          <div className="border rounded-lg shadow-sm max-h-48 overflow-y-auto">
            {results.length > 0 ? (
              <div className="p-2">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Search Results:
                </div>
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer rounded text-sm"
                    onClick={() => {
                      setSearchValue(result);
                      setResults([result]);
                    }}
                  >
                    {result}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500 text-sm">
                No results found for "{searchValue}"
              </div>
            )}
          </div>
        )}

        {/* Current Value Display */}
        <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
          <strong>Current value:</strong> "{searchValue}"
        </div>
      </div>
    );
  },
};

// Search States Showcase
export const SearchStates: Story = {
  args: {
    label: 'Demo search',
  },
  render: () => {
    return (
      <div className="space-y-6 p-6 max-w-lg">
        <h3 className="text-lg font-semibold mb-4">Search Input States</h3>

        {/* Empty State */}
        <FormSearchInput
          label="Empty Search"
          placeholder="Start typing to search..."
          helperText="Enter at least 2 characters to begin searching"
        />

        {/* With Value State */}
        <FormSearchInput
          label="Active Search"
          placeholder="Search..."
          value="laptop"
          helperText="5 results found"
        />

        {/* Loading State */}
        <FormSearchInput
          label="Loading Search"
          placeholder="Search..."
          value="searching..."
          helperText="Searching... please wait"
          disabled={true}
        />

        {/* Error State */}
        <FormSearchInput
          label="Error Search"
          placeholder="Search..."
          value="x"
          error="Search term must be at least 2 characters"
        />

        {/* Disabled State */}
        <FormSearchInput
          label="Disabled Search"
          placeholder="Search not available"
          disabled={true}
          helperText="Search feature is temporarily disabled"
        />

        {/* Icon Variations */}
        <FormSearchInput
          label="Icon Right"
          placeholder="Search with icon on right..."
          searchIconPosition="right"
          value="sample text"
        />
      </div>
    );
  },
};

// Search Layout Variations
export const LayoutVariations: Story = {
  args: {
    label: 'Demo search',
  },
  render: () => {
    const [search1, setSearch1] = useState('');
    const [search2, setSearch2] = useState('sample search');
    const [search3, setSearch3] = useState('');

    return (
      <div className="space-y-6 p-6 max-w-lg">
        <h3 className="text-lg font-semibold mb-4">Search Layout Options</h3>

        <FormSearchInput
          label="Standard Layout (Icon Left)"
          placeholder="Search products..."
          value={search1}
          onChange={(e) => setSearch1(e.target.value)}
          onClear={() => setSearch1('')}
          helperText="Icon on left, clear button when typing"
        />

        <FormSearchInput
          label="Icon Right Layout"
          placeholder="Filter results..."
          searchIconPosition="right"
          value={search2}
          onChange={(e) => setSearch2(e.target.value)}
          onClear={() => setSearch2('')}
          helperText="Icon on right, clear button takes priority"
        />

        <FormSearchInput
          label="No Clear Button"
          placeholder="Simple search..."
          showClearButton={false}
          value={search3}
          onChange={(e) => setSearch3(e.target.value)}
          helperText="No clear button, just the search icon"
        />

        <FormSearchInput
          label="Icon Right + No Clear"
          placeholder="Minimal search..."
          searchIconPosition="right"
          showClearButton={false}
          helperText="Icon right, no clear button"
        />
      </div>
    );
  },
};

// React Hook Form Integration
export const ReactHookFormExample: Story = {
  args: {
    label: 'Demo search',
  },
  render: () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      setValue,
      reset,
    } = useForm({
      defaultValues: {
        globalSearch: '',
        productSearch: '',
        userSearch: '',
        categoryFilter: '',
      },
    });

    const onSubmit = (data: any) => {
      alert('Form submitted: ' + JSON.stringify(data, null, 2));
    };

    const formData = watch();

    return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-6">Search Form Example</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormSearchInput
            label="Global Search"
            placeholder="Search across all content..."
            {...register('globalSearch')}
            value={formData.globalSearch}
            onClear={() => setValue('globalSearch', '')}
            helperText="Search products, users, and orders"
          />

          <FormSearchInput
            label="Product Search"
            placeholder="Find products by name or SKU..."
            {...register('productSearch', {
              minLength: {
                value: 2,
                message: 'Product search must be at least 2 characters'
              }
            })}
            value={formData.productSearch}
            onClear={() => setValue('productSearch', '')}
            error={errors.productSearch?.message}
            isRequired={true}
          />

          <FormSearchInput
            label="User Search"
            placeholder="Search by name or email..."
            searchIconPosition="right"
            {...register('userSearch')}
            value={formData.userSearch}
            onClear={() => setValue('userSearch', '')}
            helperText="Find customers and team members"
          />

          <FormSearchInput
            label="Category Filter"
            placeholder="Filter by category..."
            showClearButton={false}
            {...register('categoryFilter')}
            value={formData.categoryFilter}
            helperText="Browse product categories"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Search All
            </button>

            <button
              type="button"
              onClick={() => reset()}
              className="px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Clear All
            </button>
          </div>
        </form>

        {/* Form Data Preview */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h4 className="text-sm font-medium mb-2">Current Search Values:</h4>
          <pre className="text-xs text-gray-600 whitespace-pre-wrap">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

// Search Dashboard Example
export const SearchDashboard: Story = {
  args: {
    label: 'Demo search',
  },
  render: () => {
    const [searches, setSearches] = useState({
      main: '',
      products: '',
      users: '',
      orders: '',
    });

    const updateSearch = (key: keyof typeof searches, value: string) => {
      setSearches(prev => ({ ...prev, [key]: value }));
    };

    const clearSearch = (key: keyof typeof searches) => {
      setSearches(prev => ({ ...prev, [key]: '' }));
    };

    const clearAll = () => {
      setSearches({ main: '', products: '', users: '', orders: '' });
    };

    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Dashboard Search</h3>
          <button
            onClick={clearAll}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear All Searches
          </button>
        </div>

        <div className="space-y-6">
          {/* Main Search */}
          <FormSearchInput
            label="Global Search"
            placeholder="Search everything..."
            value={searches.main}
            onChange={(e) => updateSearch('main', e.target.value)}
            onClear={() => clearSearch('main')}
            helperText="Search across all modules and data"
          />

          {/* Grid of Specific Searches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSearchInput
              label="Products"
              placeholder="Find products..."
              value={searches.products}
              onChange={(e) => updateSearch('products', e.target.value)}
              onClear={() => clearSearch('products')}
              helperText={searches.products ? `Searching: "${searches.products}"` : 'Browse inventory'}
            />

            <FormSearchInput
              label="Users"
              placeholder="Find users..."
              searchIconPosition="right"
              value={searches.users}
              onChange={(e) => updateSearch('users', e.target.value)}
              onClear={() => clearSearch('users')}
              helperText={searches.users ? `Searching: "${searches.users}"` : 'Find customers & staff'}
            />

            <FormSearchInput
              label="Orders"
              placeholder="Find orders..."
              value={searches.orders}
              onChange={(e) => updateSearch('orders', e.target.value)}
              onClear={() => clearSearch('orders')}
              helperText={searches.orders ? `Searching: "${searches.orders}"` : 'Track order history'}
            />

            <FormSearchInput
              label="Advanced Filter"
              placeholder="Apply filters..."
              showClearButton={false}
              searchIconPosition="right"
              helperText="Use advanced search options"
            />
          </div>
        </div>

        {/* Search Results Summary */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h4 className="text-sm font-medium mb-3">Active Searches:</h4>
          <div className="space-y-2 text-sm">
            {Object.entries(searches).map(([key, value]) => (
              value && (
                <div key={key} className="flex justify-between items-center">
                  <span className="capitalize font-medium">{key}:</span>
                  <span className="text-gray-600">"{value}"</span>
                </div>
              )
            ))}
            {Object.values(searches).every(v => !v) && (
              <div className="text-gray-500 italic">No active searches</div>
            )}
          </div>
        </div>
      </div>
    );
  },
};