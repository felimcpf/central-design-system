import React from 'react'
import type { Preview, Decorator } from '@storybook/react'
import { ThemeProvider, type ProductTheme } from '../src/themes/ThemeProvider'

const PRODUCTS: ProductTheme[] = ['doc-central', 'nav-central', 'draft-central', 'agent-central']

const withTheme: Decorator = (Story, context) => {
  const product = (context.globals.theme as ProductTheme) ?? 'doc-central'
  return (
    <ThemeProvider product={product}>
      <Story />
    </ThemeProvider>
  )
}

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Product theme',
      defaultValue: 'doc-central',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: PRODUCTS.map((p) => ({ value: p, title: p })),
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
}

export default preview