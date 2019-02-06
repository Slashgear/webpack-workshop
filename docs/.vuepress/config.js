module.exports = {
  title: "Webpack Workshop",
  description: "Webpack discovering and mastering workshops",
  base: "/webpack-workshop/",
  serviceWorker: true,
  themeConfig: {
    lastUpdated: "Last Updated",
    repo: "Slashgear/webpack-workshop",
    repoLabel: "Contribute!",
    docsRepo: "Slashgear/webpack-workshop",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "Help us improve this page!",
    algolia: {
      apiKey: "5f0c4bd6212a8fc141c63283636d5228",
      indexName: "webpack_workshop"
    },
    serviceWorker: {
      updatePopup: true
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
          "/workshops/intermediate/babel",
          "/workshops/intermediate/style",
          "/workshops/intermediate/intermediate-koans"
        ]
      }
    ]
  }
};
