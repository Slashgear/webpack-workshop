module.exports = {
  title: "Webpack Workshop",
  description: "Webpack discovering and mastering workshops",
  base: "/webpack-workshop/",
  serviceWorker: true,
  themeConfig: {
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
      }
    ]
  }
};
