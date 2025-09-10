import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite';
import {VitePWA} from 'vite-plugin-pwa';


// https://vite.dev/config/
export default defineConfig({

  plugins: [
    react(), 
    tailwindcss(),
    Icons({compiler:"jsx"}),
    VitePWA({
      registerType: "autoUpdate",
      devOptions:{
        enabled:true
      },
      manifest: {
        name: "Dressify",
        short_name: "Dressify",
        start_url: "/",
        id:"/",
        display: "standalone",
        background_color: "#ffffff",
        icons: [
          {
            src: "src/assets/192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "src/assets/512x512.png",
            sizes: "512x512",
            type: "image/png",
          }
        ],
        "screenshots": [
          {
            "src": "src/assets/sc.png",
            "sizes": "1400x900",
            "type": "image/png",
            "form_factor": "wide",
          },
          {
            "src": "src/assets/512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      },
    })
  ],
  server: {
    allowedHosts:true
  }
  


});

