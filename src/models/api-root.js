import config from '../../config/SiteConfig';

const { ApiDonationList } = require('./api-donor-donation');
const { ApiCampaignList } = require('./api-customer-campaign');
const { ApiSupplierRfpList } = require('./api-supplier-rfp');

export default async function(siteState) {
  let data;
  switch (siteState) {
    case config.siteStateDonor:
      data = await ApiDonationList(config.siteCustomerId, config.siteDonorId);
      break;
    case config.siteStateCustomer:
      data = await ApiCampaignList();
      break;
    case config.siteStateSupplier:
      data = await ApiSupplierRfpList(siteSupplierId);
      break;
    default:
      data = undefined;
      break;
  }
  return data;
}
