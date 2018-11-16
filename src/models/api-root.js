import config from '../../config/SiteConfig';
const { ApiDonationList } = require('./api-donor-donation');
const { ApiCampaignList } = require('./api-customer-campaign');
const { ApiSupplierRfpList } =  require('./api-supplier-rfp');
export default async function (siteState) {
    return (
        siteState == config.siteStateDonor ? await ApiDonationList () :
        (siteState == config.siteStateCustomer ? await ApiCampaignList() : 
        (siteState === config.siteStateSupplier ? await ApiSupplierRfpList(config.pageState.supplier.supplierId) : undefined))
    )
}
