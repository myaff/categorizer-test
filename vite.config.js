/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
export default defineConfig(({ _command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.BASE_URL,
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
        inject: 'body-first',
        customDomId: '__svg__icons__dom__',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        styl: {
          additionalData: `@import '${path.resolve(__dirname, './src/assets/styles/variables')}'`,
        },
      },
    },
  }
});
