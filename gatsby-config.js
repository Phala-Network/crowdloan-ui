/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const path = require('path')

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        '@': path.join(__dirname, 'src'),
      },
    },
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/i18n`,
        languages: [`en`, `zh`],
        defaultLanguage: `en`,
        redirect: true,
        // redirectComponent: require.resolve(`./src/components/redirect.js`),
      },
    },
    `gatsby-plugin-styled-jsx`,
    `gatsby-plugin-styled-components`,
  ],
}