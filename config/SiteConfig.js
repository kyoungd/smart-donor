module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

  siteTitle: 'Smart Donor', // Navigation and Site Title
  siteTitleAlt: 'Smart Donor - Gatsby Starter', // Alternative Site title for SEO
  siteUrl: 'https://minimal-blog.netlify.com', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  siteBanner: '/social/banner.jpg', // Your image for og:image tag. You can find it in the /static folder
  favicon: 'src/favicon.png', // Your image for favicons. You can find it in the /src folder
  siteDescription: 'Smart Donor with big typography', // Your site description
  author: 'LekoArts', // Author for schemaORGJSONLD
  siteLogo: '/social/logo.png', // Image for schemaORGJSONLD

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@minimal', // Twitter Username - Optional
  ogSiteName: 'minimal', // Facebook Site Name - Optional
  ogLanguage: 'en_US', // Facebook Language

  // Manifest and Progress color
  // See: https://developers.google.com/web/fundamentals/web-app-manifest/
  themeColor: '#3498DB',
  backgroundColor: '#2b2e3c',

  // Settings for typography.js
  headerFontFamily: 'Bitter',
  bodyFontFamily: 'Open Sans',
  baseFontSize: '18px',

  pageStateDonorRoot: 'LIST-DONATION',
  pageStateDonorListPost: 'LIST-POST',
  pageStateDonorAddDonation: 'ADD-DONATION',
  pageStateDonorEditDonation: 'EDIT-DONATION',
  pageStateDonorPost: 'DONATION-POST',

  pageStateCustomerRoot: 'LIST-CAMPAIGN',
  pageStateCustomerEdit: 'EDIT-CAMPAIGN',
  pageStateCustomerAdd: 'ADD-CAMPAIGN',
  pageStateCustomerRequesstList: 'LIST-CAMPAIGNREQUEST',
  pageStateCustomerRequesstEdit: 'EDIT-CAMPAIGNREQUEST',
  pageStateCustomerRequesstAdd: 'ADD-CAMPAIGNREQUEST',

  pageState: {
    donor: {
      rootTitle: 'ALL DONATIONS',
      rootList: 'LIST-DONATION',
      rootEdit: 'EDIT-DONATION',
      rootAdd: 'ADD-DONATION',
      sublevelList: 'LIST-POST',
      sublevelEdit: '',
      sublevelAdd: '',
      post: 'DONATION-POST',
    },
    customer: {
      rootTitle: 'ALL CAMPAIGNS',
      rootList: 'LIST-CAMPAIGN',
      rootEdit: 'EDIT-CAMPAIGN',
      rootAdd: 'ADD-CAMPAIGN',
      sublevelList: 'LIST-CAMPAIGNREQUEST',
      sublevelEdit: 'EDIT-CAMPAIGNREQUEST',
      sublevelAdd: 'ADD-CAMPAIGNREQUEST',
      post: 'CAMPAIGN-POST',
    },
    supplier: {
      rootTitle: 'ALL REQUESTS',
      rootList: 'LIST-REQUESTPRODUCT',
      rootEdit: 'EDIT-PRODUCT',
      rootAdd: '',
      sublevelList: '',
      sublevelEdit: '',
      sublevelAdd: '',
      post: '',
      supplierId: 's-6ee91abf-d094-49e1-9385-d3cbd84b54a903',
    }
  },

  siteState: 'donor',
  
  siteStateDonor: 'donor',
  siteStateCustomer: 'customer',
  siteStateSupplier: 'supplier',

  siteCustomerId: 'c-6ee91abf-d094-49e1-9385-d3cbd84b54a9',
  siteDonorId: 'd-6ee91abf-d094-49e1-9385-d3cbd84b54a9',
  siteSupplierId: 's-6ee91abf-d094-49e1-9385-d3cbd84b54a903',
};
