import type { Preview } from '@storybook/nextjs-vite'
import '../src/app/globals.css'
import React from 'react'

// Mock CSS variables for components that depend on them
const mockCSSVariables = `
  :root {
    --primary-text: #1a1a1a;
    --secondary-text: #666666;
    --tertiary-bg: #f5f5f5;
    --sidebar: #ffffff;
    --sidebar-foreground: #1a1a1a;
  }
`

// Add CSS variables to document head if not already present
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = mockCSSVariables
  document.head.appendChild(styleSheet)
}

// Decorator to provide consistent styling context
const withGlobalStyles = (Story: any) => {
  return React.createElement('div', {
    style: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: 1.6,
    }
  }, React.createElement(Story))
}

const preview: Preview = {
  decorators: [withGlobalStyles],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    },
    nextjs: {
      appDirectory: true,
    },
  },
}

export default preview