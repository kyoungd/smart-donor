import config from '../../config/SiteConfig';
const { ApiDonationList } = require('./api-donor-donation');
const { ApiCampaignList } = require('./api-customer-campaign');

export default async function (siteState) {
    return (
        siteState == config.siteStateDonor ? await ApiDonationList () :
        (siteState == config.siteStateCustomer ? await ApiCampaignList() : undefined)
    )
}
