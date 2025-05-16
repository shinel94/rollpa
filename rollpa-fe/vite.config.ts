import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/piskel': {
        target: 'http://localhost:5173/node_modules/@code-dot-org/piskel/dest/prod',
        rewrite: p => p.replace(/^\/piskel/, ''),
      },
    },
  },
})
