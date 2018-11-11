const path = require('path');
const _ = require('lodash');

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  const editslug = `/donation-edit/${node.entityId}/`;
  if (node.internal.type === 'DonorapiDonation') {
    const slug = `/approval-list/${node.entityId}/`;
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
    createNodeField({
      node,
      name: `editslug`,
      value: editslug,
    });
    createNodeField({
      node,
      name: `category`,
      value: `donation`,
    });
  }
  if (node.internal.type === 'DonorapiApproval') {
    const slug = `/approval/${node.entityId}/`;
    const backslug = `/approval-list/${node.donationId}/`;
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
    createNodeField({
      node,
      name: `backslug`,
      value: backslug,
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
              editslug
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
  const editDonation = path.resolve('src/templates/edit-donation.js');

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

  // create donation list page.
  createPage({
    path: `/`,
    component: require.resolve(listDonation),
    context: {
      slug: `/`,
    }
  })

  // create donation-approval list page.  Each entry is tied to the donation list.
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

  // create proudct page.  It is tied to the donation-approval list page.
  allApproval.forEach((item, index) => {
    const next = index === 0 ? null : allApproval[index - 1].node;
    const prev = index === allApproval.length - 1 ? null : allApproval[index + 1].node;
    createPage({
      path: item.node.fields.slug,
      component: require.resolve(postApproval),
      context: {
        id: item.node.id,
        slug: item.node.fields.slug,
        backslug: item.node.fields.backslug,
        next,
        prev,
        entityId: item.node.entityId,
        donationId: item.node.donationId
      },
    });
  });

  // create donation edit page.
  allDonation.forEach(item => {
    createPage({
      path: item.node.fields.editslug,
      component: require.resolve(editDonation),
      context: {
        slug: item.node.fields.editslug,
        donationId: item.node.entityId,
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
