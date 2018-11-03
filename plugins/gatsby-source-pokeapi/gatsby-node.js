"use strict";

const data = require('./data');
const createNodeHelpers = require("gatsby-node-helpers").default;

exports.sourceNodes = async({ actions }) => {
  const { createNode } = actions;
  const { createNodeFactory } = createNodeHelpers({
    typePrefix: "Donorapi"
  });
  const prepareRootNode = createNodeFactory("Root");
  const prepareDonationyNode = createNodeFactory("Donation");
  const prepareApprovalNode = createNodeFactory("Approval");

  // Get all our pokemon data
  const allPokemon = data;

  const processDonation = items => {
    items.donation.map(item => item.id = item.entityId);
    const donationNodes = items.donation.map(chunk =>
      prepareDonationyNode(chunk)
    );
    donationNodes.forEach(node => { createNode(node); });
    const rootNode = prepareRootNode(items);

    rootNode.abilities___NODE = donationNodes.map(node => node.id);
    return (rootNode);
  };

  const processApproval = items => {
    items.approval.map(item => item.id = item.entityId);
    const approvalNodes = items.approval.map(chunk =>
      prepareApprovalNode(chunk)
    );
    approvalNodes.forEach(node => { createNode(node); });
    const rootNode = prepareRootNode(items);

    rootNode.abilities___NODE = approvalNodes.map(node => node.id);
    return (rootNode);
  };

  // Process data into nodes using our helper.
  createNode(processDonation(allPokemon));
  createNode(processApproval(allPokemon));
  let i = 0;
};
