module.exports = {
  title: "Webpack Workshop",
  description: "Webpack discovering and mastering workshops",
  base: "/webpack-workshop/",
  serviceWorker: true,
  themeConfig: {
    algolia: {
      apiKey: "5f0c4bd6212a8fc141c63283636d5228",
      indexName: "webpack_workshop"
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Workshops", link: "/workshops/" }
    ],
    sidebar: [
      "/workshops/",
      {
        title: "Novice",
        collapsable: false,
        children: [
          "/workshops/novice/basics",
          "/workshops/novice/static-assets",
          "/workshops/novice/code-assets",
          "/workshops/novice/outputs",
          "/workshops/novice/novice-koans"
        ]
      },
      {
        title: "Intermediate",
        collapsable: false,
        children: [
          "/workshops/intermediate/dev",
          "/workshops/intermediate/babel"
        ]
      }
    ]
  }
};
