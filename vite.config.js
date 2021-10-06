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
      external: ['vue']
    }
  }
})
