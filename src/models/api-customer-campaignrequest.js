const _ = require('lodash');
const { get, getResourceId } = require('./api');
const config = require('./config');

const ApiCustomerCampaignRequest = async (campaignId) => {
    const allCampaign = await get('campaign', campaignId);
    if (!allCampaign || !allCampaign.data)
        return {};
    const mainTitle = allCampaign.data.name;
    const allRequest = await get('campaignrequest');
    const allProduct = await get('product');
    const reqs = allRequest.data.filter(r => getResourceId(r.campaign) == campaignId).map(request => {
        const product = allProduct.data.filter(p => 
            getResourceId(p.campaignRequest) == request.entityId);
        const isProduct = product && product.length > 0;
        const editslug = '';
        const slug = `/root-campaignrequest?${campaignId}`;
        const clickslug = '';
        const result = {
            id : request.entityId,
            title: request.name,
            excerpt: (isProduct ? product[0].excerpt : config.default.productExcerpt),
            html: (isProduct ? product[0].html : config.default.productHtml),
            status: (isProduct ? product[0].approvalStatus : config.default.productApprovalStatus),
            rfp: (isProduct ? product[0].status : config.default.productStatus),
            slug,
            editslug,
            clickslug,
            video: (isProduct ? product[0].video : config.default.video),
        }
        return result;
    });
    return { mainTitle, backslag: config.default.root, data: reqs };
}

module.exports = { ApiCustomerCampaignRequest };
