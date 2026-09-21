import path from 'path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    // Agent worktrees live under .claude/ and carry their own copies of the
    // suite; without this a stale one fails the run from outside the project.
    exclude: ['node_modules/**', 'dist/**', '.next/**', '.claude/**'],
    setupFiles: ['./vitest.setup.mts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, '.'),
    },
  },
})
