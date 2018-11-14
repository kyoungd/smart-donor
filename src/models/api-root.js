const { ApiDonationList } = require('./api-donor-donation');
const { ApiCampaignList } = require('./api-customer-campaign');

const ApiRoot = async (siteState) => 
    siteState == 'DONOR' ? await ApiDonationList () :
    (siteState == 'CUSTOMER' ? await ApiCampaignList() : undefined);

module.exports = { ApiRoot };
