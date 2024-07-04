/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            // Habilita CORS para todas las rutas API en desarrollo local
            source: '/api/:path*', // Ruta de tu API
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
              { key: 'Access-Control-Allow-Origin', value: '*' },
              { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
              { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With, Content-Type, Authorization' },
            ],
          },
        ]
}
}
export default nextConfig;
