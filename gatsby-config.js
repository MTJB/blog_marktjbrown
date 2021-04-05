module.exports = {
  siteMetadata: {
    title: `Mark Brown`,
    name: `Mark Brown`,
    siteUrl: `https://novela.narative.co`,
    description: `This is my description that will be used in the meta tags and important for search results`,
    hero: {
      heading: `Welcome.`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/marktjbrown`,
      },
      {
        name: `github`,
        url: `https://github.com/mtjb`,
      },
      {
        name: `instagram`,
        url: `https://instagram.com/marktjbrown`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/mark-brown-9952b4a8/`,
      },
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Novela by Narative`,
        short_name: `Novela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
      },
    },
    "gatsby-plugin-twitter",
  ],
};
