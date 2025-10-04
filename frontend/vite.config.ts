import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite';
import {VitePWA} from 'vite-plugin-pwa';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base:"/",
  plugins: [
    react(), 
    tailwindcss(),
    Icons({compiler:"jsx"}),
    VitePWA({
      registerType: "autoUpdate",

      workbox: {
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/images/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60,
              },
            },
          },
        ],
      },
      devOptions:{
        enabled:true
      },
      manifest: {
        name: "OOTDuck",
        short_name: "OOTDuck",
        start_url: "/",
        id:"/",
        display: "standalone",
        background_color: "#f3f4f6", // Tailwind gray-100
        theme_color: "#f3f4f6",    
        icons: [
          {
            src: "/images/logo2.png",
            sizes: "1024x1024",
            type: "image/png",
          },          
        ],
        "screenshots": [
          {
            "src": "/images/sc.png",
            "sizes": "1400x900",
            "type": "image/png",
            "form_factor": "wide",
          },         {
            "src": "/images/sc2.png",
            "sizes": "1400x900",
            "type": "image/png",
            "form_factor": "wide",
          },         {
            "src": "/images/sc3.png",
            "sizes": "1400x900",
            "type": "image/png",
            "form_factor": "wide",
          },
 
        ]
      },
    }),
  ],
  server: {
    allowedHosts:true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ['onnxruntime-web']
  },
    worker: {
    format: 'es'
  }


});

