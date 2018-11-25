const _ = require('lodash');
const { get, getResourceId } = require('./api');
const config = require('./config');

const ListSupplier = (allRequest, allSupplier, request) => {
  return allSupplier.data.map(supplier => {
    const selected = supplier.participantId === getResourceId(request.supplier);
    const checkResult = allRequest.reduce((total, req) => 
        getResourceId(req.supplier) === supplier.participantId 
        && !_.includes(['CANCELED', 'REJECTED'], supplier.approvalStatus) ? total+1 : total, 0) ;
    const checked = !selected && checkResult > 0 ? true : false;
    const result = {
        id: supplier.participantId,
        name: supplier.name,
        checked,
        description: supplier.note,
        selected,
    }
    return result;
  });
};

// Use default createdOn
const EmptySublevelItem = (id, campaign) => ({
    id,
    title: '',
    name: '',
    supplierName: '',
    excerpt: '',
    html: '',
    status: config.default.productApprovalStatus,
    rfp: config.default.productStatus,
    slug: '',
    editslug: '',
    clickslug: '',
    video: config.default.video,
    supplier: '',
    description: '',
    customer: campaign.data.customer,
    campaign: campaign.data.entityId,
    donor: campaign.data.donor,
    donation: campaign.data.donation,
    productCreatedOn : '',
    approvalResponse: ' ',
  });

const ApiCustomerCampaignRequest = async (campaignId) => {
    const campaign = await get('campaign', campaignId);
    if (!campaign || !campaign.data)
        return {};
    const mainTitle = campaign.data.name;
    const allRequests = await get('campaignrequest');
    const allRequest = allRequests.data.filter(rq => getResourceId(rq.campaign) === campaignId);
    const allProduct = await get('product');
    const allSupplier = await get('supplier');
    const reqs = allRequest.filter(r => getResourceId(r.campaign) === campaignId).map(request => {
        const supplier = allSupplier.data.find(s => s.participantId === getResourceId(request.supplier));
        const product = allProduct.data.filter(p =>
            getResourceId(p.campaignRequest) == request.entityId);
        const isProduct = product && product.length > 0;
        const editslug = '';
        const slug = `/root-campaignrequest?${campaignId}`;
        const clickslug = '';
        const result = {
            id : request.entityId,
            title: (isProduct? product[0].name : ' - '),
            name: `${request.name}`,
            supplierName: (supplier ? supplier.name : '-'),
            excerpt: (isProduct ? product[0].excerpt : config.default.productExcerpt),
            html: (isProduct ? product[0].html : config.default.productHtml),
            status: (isProduct ? product[0].approvalStatus : config.default.productApprovalStatus),
            rfp: request.status,
            slug,
            editslug,
            clickslug,
            video: (isProduct ? product[0].video : config.default.video),
            supplier: request.supplier,
            description: request.description,
            customer: campaign.data.customer,
            campaign: campaign.data.entityId,
            donor: campaign.data.donor,
            donation: campaign.data.donation,
            productCreatedOn : (isProduct ? product[0].createdOn : ''),
            approvalResponse: (isProduct ? product[0].approvalResponse : ' '),
            createdOn: request.createdOn,
            }
        return result;
    });
    return { 
      mainTitle, 
      backslag: config.default.root, 
      allSupplier, 
      data: [EmptySublevelItem('blank', campaign), ...reqs, EmptySublevelItem('new', campaign) ] 
    }
}

module.exports = { ApiCustomerCampaignRequest, ListSupplier };
