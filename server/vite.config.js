const servers = require("./servers.js");

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: servers.backend,
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
