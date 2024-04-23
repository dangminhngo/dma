const { env } = await import("./env.js")

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: env.R2_PUBLIC_URL.replace("https://", ""),
        port: "",
      },
    ],
  },
}

export default nextConfig
