import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fraud-alert-network-1blz.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/community-guidelines`,
      lastModified: new Date(),
    },
  ];
}