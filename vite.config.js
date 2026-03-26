import react from '@vitejs/plugin-react'

export default {
  plugins: [react()],
  base: '/User-Management/',
  server: {
    // Render expects the server to listen on all interfaces (0.0.0.0)
    // and on the dynamically assigned $PORT.
    allowedHosts: 'all',
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    strictPort: true,
  },
  preview: {
    // Keep preview consistent with dev for any hosting environments.
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    strictPort: true,
  },
}
