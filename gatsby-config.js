module.exports = {
  siteMetadata: {
    title: `Mark Brown`,
    name: `Mark Brown`,
    siteUrl: `https://marktjbrown.com`,
    description: `Hi I’m Mark, a Software Engineer from Belfast and Head of Support in the Brown house, duties mainly involve turning it off and on again.`,
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
    "gatsby-plugin-gatsby-cloud"
  ],
};
