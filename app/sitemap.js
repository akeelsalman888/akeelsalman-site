// Sitemap — single-page site for now. Add case-study routes here as they ship.
export default function sitemap() {
  return [
    {
      url: "https://akeelsalman.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://akeelsalman.com/resume",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://akeelsalman.com/work/iman-connect",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://akeelsalman.com/work/iman-islam",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
