export const campaignEndpoints = {
  // Product
  product: "product",
  product_type: "product/type",
  product_category: "product/category",
  product_variant: "product/variant",
  operator: "operator",
  provider_ads: "sms-ads-provider",
  product_package: "product/package",

  // Hlr Checker
  hlr: "operator/hlr/checker",

  // file upload
  upload: "file",

  // sms-lba
  lba: "order/sms-location-based",
};

export type ApiEndpoint = keyof typeof campaignEndpoints;

export const getApiCampaign: (key: ApiEndpoint) => string = (key) => {
  const host = process.env.NEXT_PUBLIC_API;

  return `${host}/adsqoo/v1/${campaignEndpoints[key]}`;
};
