module.exports = {
  base: "/webpack-workshop/",
  plugins: {
    "@vuepress/pwa": {
      serviceWorker: true,
      updatePopup: {
        message: "New content is available.",
        buttonText: "Refresh"
      }
    }
  },
  locales: {
    "/": {
      lang: "en-US", // this will be set as the lang attribute on <html>
      title: "Webpack Workshop",
      description: "Webpack discovering and mastering workshops"
    },
    "/fr/": {
      lang: "fr-FR",
      title: "Ateliers Webpack",
      description: "Ateliers pour découvrir et maîtriser Webpack"
    }
  },
  themeConfig: {
    locales: {
      "/": {
        selectText: "Languages",
        label: "English",
        editLinkText: "Edit this page on GitHub",
        lastUpdated: "Last Updated",
        repo: "Slashgear/webpack-workshop",
        repoLabel: "Contribute!",
        docsRepo: "Slashgear/webpack-workshop",
        docsDir: "docs",
        editLinks: true,
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
              "/workshops/intermediate/babel",
              "/workshops/intermediate/style",
              "/workshops/intermediate/reduce-bundle-size",
              "/workshops/intermediate/modern-build",
              "/workshops/intermediate/compression",
              "/workshops/intermediate/intermediate-koans"
            ]
          },
          {
            title: "Advanced",
            collapsable: false,
            children: ["/workshops/advanced/plugins"]
          }
        ]
      },
      "/fr/": {
        selectText: "Langues",
        label: "Français",
        editLinkText: "Edit cette page sur Github",
        lastUpdated: "Mis à jour le",
        repo: "Slashgear/webpack-workshop",
        repoLabel: "Contribue !",
        docsRepo: "Slashgear/webpack-workshop",
        docsDir: "docs",
        editLinks: true,
        nav: [{ text: "Ateliers", link: "/fr/workshops/" }],
        sidebar: [
          "/fr/workshops/",
          {
            title: "Novice",
            collapsable: false,
            children: ["/fr/workshops/novice/basics"]
          }
        ]
      }
    }
  }
};
