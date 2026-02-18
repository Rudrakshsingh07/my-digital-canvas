import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

async function getPlugins(mode: string) {
  const plugins = [react()]
  if (mode === 'development') {
    try {
      const { componentTagger } = await import('lovable-tagger')
      plugins.push(componentTagger())
    } catch {
      // lovable-tagger optional; dev server works without it
    }
  }
  return plugins
}

export default defineConfig(async ({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: await getPlugins(mode),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
