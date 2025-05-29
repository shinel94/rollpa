import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'custom-file-serve-plugin',
      configureServer(server) {
        server.middlewares.use('/piskel', (req, res, next) => {
          const urlPath = req.url?.split('?')[0] || '';
          const filePath = path.join(__dirname, 'piskel/dest/prod', urlPath);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            fs.createReadStream(filePath).pipe(res);
          } else {
            res.statusCode = 404;
            res.end('Not Found');
          }
        });
      }
    }
  ],
  // server: {
  //   proxy: {
  //     '/piskel': {
  //       target: 'http://localhost:5173/node_modules/@code-dot-org/piskel/dest/prod',
  //       rewrite: p => p.replace(/^\/piskel/, ''),
  //     },
  //   },
  // },
  server: {
    fs: {
      allow: [
        path.resolve(__dirname, 'piskel/dest/prod'),
        path.resolve(__dirname, 'src'),
      ],
    }
  }
})
