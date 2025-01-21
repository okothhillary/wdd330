export default defineConfig({
    root: "src/",
    build: {
      outDir: "../dist",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "src/index.html"),
          cart: resolve(__dirname, "src/cart/index.html"),
          product: resolve(__dirname, "src/product_pages/index.html"),
        },
      },
    },
    optimizeDeps: {
      include: ['utils.mjs', 'ProductDetails.mjs'], // Ensure Vite handles these dependencies
    },
  });
  