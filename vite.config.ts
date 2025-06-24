import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwind from '@tailwindcss/vite'
import { VitePWA } from "vite-plugin-pwa";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon/*.png', 'favicon/*.svg'],
    manifest: {
      name: 'Audio Recorder App',
      short_name: 'Recorder',
      description: 'A simple offline audio recorder',
      start_url: '/',
      id: '/?mode=app',
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#f8fafc',
      theme_color: '#ef4444',
      icons: [
        {
          src: 'favicon/web-app-manifest-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: 'favicon/web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: 'favicon/web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable' // allows rounded display on splash
        }
      ],
      screenshots: [
        {
          src: 'favicon/image.png',
          sizes: '1046x608',
          form_factor: 'wide'
        },
        {
          src: 'favicon/mobile-screenshot.png',
          sizes: '1082x2402',
          form_factor: 'narrow'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      runtimeCaching: [
        {
          urlPattern: ({ request }) =>
            request.destination === 'document' ||
            request.destination === 'script' ||
            request.destination === 'style' ||
            request.destination === 'image' ||
            request.destination === 'font' ||
            request.url.endsWith('.webm'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'app-assets',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 7 * 24 * 60 * 60
            }
          }
        }
      ]
    }
  })
  ],
  server: {
    allowedHosts: ["ab75-59-182-177-223.ngrok-free.app"]
  }
})
