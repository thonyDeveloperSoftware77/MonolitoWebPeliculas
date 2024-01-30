/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
    domains: ['image.tmdb.org'],
  },
  
  async headers() {
    return [
      {
        source: '/api/:path*', // Coincide con todas las rutas de la API
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://localhost:3001', // Cambia esto por el origen que quieras permitir
            
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Access-Control-Allow-Headers, Content-Type, Authorization',
          },
        ],
      },
    ];
  },

  webpack: (config, { isServer }) => {
    // Solo devuelve la configuración modificada si estamos en el lado del cliente
    if (!isServer) {
      config.resolve.fallback.oracledb = false;

      config.resolve.fallback.fs = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.tls = false;
    }

    return config;
  },
}

module.exports = nextConfig
