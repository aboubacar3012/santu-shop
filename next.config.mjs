/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",
  trailingSlash: false, //
  reactStrictMode: false,
  images: {
    domains: ["static.vecteezy.com", "placehold.co"],
    unoptimized: true,
  },
  // Désactiver les erreurs TS et Lint pour le build afin de contourner les blocages demandés
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Mode standalone pour optimiser l'image Docker
  output: "standalone",
  // Configuration webpack pour exclure xterm du SSR
  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     config.externals = [
  //       ...(config.externals || []),
  //       {
  //         xterm: "commonjs xterm",
  //         "xterm-addon-fit": "commonjs xterm-addon-fit",
  //         "xterm-addon-web-links": "commonjs xterm-addon-web-links",
  //         "socket.io-client": "commonjs socket.io-client",
  //       },
  //     ];
  //   }
  //   return config;
  // },
  // Configuration de la redirection de la page d'accueil vers /learning
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
