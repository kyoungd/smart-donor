const path = require('path');
const _ = require('lodash');

exports.createPages = ({ actions: { createPage } }) => {

  const listDonation = path.resolve('src/pages/root.js');

  // create donation list page.
  createPage({
    path: `/`,
    component: require.resolve(listDonation),
    context: {
      slug: `/`,
    }
  })

};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};
