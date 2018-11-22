import config from '../../config/SiteConfig';
const { ApiDonorPostList } = require('./api-donor-postlist');
const { ApiCustomerCampaignRequest } = require('./api-customer-campaignrequest');

export default async function (siteState, entityId) {
  switch (siteState) {
    case config.siteStateDonor : 
      return await ApiDonorPostList(entityId);
    case config.siteStateCustomer :
      return await ApiCustomerCampaignRequest(entityId);
    default:
      return {}
  }
}
