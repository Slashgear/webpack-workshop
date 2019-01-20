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
      "/",
      {
        title: "Novice",
        children: ["/workshops/basics", "/workshops/static-assets"]
      }
    ]
  }
};
