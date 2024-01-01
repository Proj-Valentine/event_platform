/** @type {import('next').NextConfig} */
const nextConfig = {
    // create images domain to be allowed by next js from other networks and serves ie uploadhing server to avoid warning in the EventDetails page 
    // trying ot render the image url from uploadthing server
  images: {
    domains: ['utfs.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: ''
      }
    ]
  }
}

module.exports = nextConfig



