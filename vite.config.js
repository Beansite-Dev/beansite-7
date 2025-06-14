import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// https://vite.dev/config/
function CustomHmr() {
  return {
    name: 'custom-hmr',
    enforce: 'post',
    // HMR
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.scss')) {
        console.log('reloading theme file...');
        server.ws.send({
          type: 'full-reload',          
          path: '*'
        });
      }
    },
  }
}
export default defineConfig({
  plugins: [react(),CustomHmr()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
})
