// vite.config.ts
import { defineConfig } from 'vitest/config'  // vitest/config extends vite's config with 'test' support
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    // Generates TypeScript declaration files (*.d.ts) alongside the JS output.
    // This lets consuming repos get full type safety and autocomplete.
    dts({
      tsconfigPath: './tsconfig.lib.json', // use the library-specific tsconfig
      rollupTypes: true,                   // bundle all .d.ts into a single dist/index.d.ts
      include: ['src'],
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx'],
    }),
  ],

  // ─── Library build config ───────────────────────────────────────────────────
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      // React must NOT be bundled — the consuming app provides it
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },

  // ─── Test config (vitest) ───────────────────────────────────────────────────
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
})
