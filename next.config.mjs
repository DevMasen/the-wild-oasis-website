/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecqqdmjyrtkkceyczkve.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname:
          "/a/ACg8ocJ7I4BlrwOqAMVZbz6XVqklndh2zb6v2zTjq5LdJVzKikeBxW8=s96-c/**",
      },
    ],
  },
};

export default nextConfig;
