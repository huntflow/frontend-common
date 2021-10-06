const path = require('path');
const { defineConfig } = require('vite');
const { createVuePlugin } = require('vite-plugin-vue2');

module.exports = defineConfig({
  plugins: [
    createVuePlugin()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib.js'),
      formats: ['cjs', 'es'],
      name: 'HuntKit',
      fileName: (format) => `hunt-kit.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        assetFileNames: (asset) => {
          if (asset.name === 'style.css') {
            return 'hunt-kit.css';
          }
          return asset.name;
        }
      }
    }
  }
})
