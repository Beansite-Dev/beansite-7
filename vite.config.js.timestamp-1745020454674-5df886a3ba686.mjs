// vite.config.js
import { defineConfig } from "file:///C:/Users/M1dnight/Downloads/Projects/Beansite/beansite-7/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/M1dnight/Downloads/Projects/Beansite/beansite-7/node_modules/@vitejs/plugin-react-swc/index.mjs";
function CustomHmr() {
  return {
    name: "custom-hmr",
    enforce: "post",
    // HMR
    handleHotUpdate({ file, server }) {
      if (file.endsWith(".scss")) {
        console.log("reloading theme file...");
        server.ws.send({
          type: "full-reload",
          path: "*"
        });
      }
    }
  };
}
var vite_config_default = defineConfig({
  plugins: [react(), CustomHmr()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxNMWRuaWdodFxcXFxEb3dubG9hZHNcXFxcUHJvamVjdHNcXFxcQmVhbnNpdGVcXFxcYmVhbnNpdGUtN1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcTTFkbmlnaHRcXFxcRG93bmxvYWRzXFxcXFByb2plY3RzXFxcXEJlYW5zaXRlXFxcXGJlYW5zaXRlLTdcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL00xZG5pZ2h0L0Rvd25sb2Fkcy9Qcm9qZWN0cy9CZWFuc2l0ZS9iZWFuc2l0ZS03L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcbi8vIGh0dHBzOi8vdml0ZS5kZXYvY29uZmlnL1xuZnVuY3Rpb24gQ3VzdG9tSG1yKCkge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdjdXN0b20taG1yJyxcbiAgICBlbmZvcmNlOiAncG9zdCcsXG4gICAgLy8gSE1SXG4gICAgaGFuZGxlSG90VXBkYXRlKHsgZmlsZSwgc2VydmVyIH0pIHtcbiAgICAgIGlmIChmaWxlLmVuZHNXaXRoKCcuc2NzcycpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWxvYWRpbmcgdGhlbWUgZmlsZS4uLicpO1xuICAgICAgICBzZXJ2ZXIud3Muc2VuZCh7XG4gICAgICAgICAgdHlwZTogJ2Z1bGwtcmVsb2FkJywgICAgICAgICAgXG4gICAgICAgICAgcGF0aDogJyonXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLEN1c3RvbUhtcigpXSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdXLFNBQVMsb0JBQW9CO0FBQ3JZLE9BQU8sV0FBVztBQUVsQixTQUFTLFlBQVk7QUFDbkIsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBO0FBQUEsSUFFVCxnQkFBZ0IsRUFBRSxNQUFNLE9BQU8sR0FBRztBQUNoQyxVQUFJLEtBQUssU0FBUyxPQUFPLEdBQUc7QUFDMUIsZ0JBQVEsSUFBSSx5QkFBeUI7QUFDckMsZUFBTyxHQUFHLEtBQUs7QUFBQSxVQUNiLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUNBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUUsVUFBVSxDQUFDO0FBQy9CLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
