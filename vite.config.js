import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  // Caminhos relativos: preview local, Vercel e GitHub Pages.
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        sobre: resolve(rootDir, 'sobre/index.html'),
        gestao: resolve(rootDir, 'gestao/index.html'),
        desenvolvimento: resolve(rootDir, 'equipes/desenvolvimento/index.html'),
        design: resolve(rootDir, 'equipes/design/index.html'),
        ciberseguranca: resolve(rootDir, 'equipes/ciberseguranca/index.html'),
        notFound: resolve(rootDir, '404.html'),
      },
    },
  },
});
