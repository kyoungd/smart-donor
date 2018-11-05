const path = require('path');
const _ = require('lodash');

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === 'DonorapiDonation') {
    const slug = _.kebabCase(`/approval-list/${node.id}/`);
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
    createNodeField({
      node,
      name: `category`,
      value: `donation`,
    });
  }
  if (node.internal.type === 'DonorapiApproval') {
    const slug = _.kebabCase(`/approval/${node.id}/`);
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
    createNodeField({
      node,
      name: `category`,
      value: `approval`,
    });
  }
};

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    query {
      allDonorapiDonation {
        edges {
          node {
            id
            name
            fields {
              slug
            }
            entityId
          }
        }
      }
      allDonorapiApproval {
        edges {
          node {
            id
            name
            donationName
            fields {
              slug
            }
            donationId
          }
        }
      }
    }
  `);

  const listDonation = path.resolve('src/templates/list-donation.js');
  const listApproval = path.resolve('src/templates/list-approval.js');
  const postApproval = path.resolve('src/templates/post-approval.js');

  const {
    data: {
      allDonorapiDonation: { edges: allDonation },
    },
  } = result;
  const {
    data: {
      allDonorapiApproval: { edges: allApproval },
    },
  } = result;

  createPage({
    path: `/`,
    component: require.resolve(listDonation),
    context: {
      slug: `/`
    }
  })

  allDonation.forEach((item, index) => {
    const next = index === 0 ? null : allDonation[index - 1].node;
    const prev = index === allDonation.length - 1 ? null : allDonation[index + 1].node;
    createPage({
      path: item.node.fields.slug,
      component: require.resolve(listApproval),
      context: {
        slug: item.node.fields.slug,
        next,
        prev,
        donationId: item.node.entityId
      },
    });
  });

  allApproval.forEach((item, index) => {
    const next = index === 0 ? null : allApproval[index - 1].node;
    const prev = index === allApproval.length - 1 ? null : allApproval[index + 1].node;
    createPage({
      path: item.node.fields.slug,
      component: require.resolve(postApproval),
      context: {
        id: item.node.id,
        slug: item.node.fields.slug,
        next,
        prev,
        entityId: item.node.entityId,
        donationId: item.node.donationId
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};
