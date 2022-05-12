import request from '@/utils/axios'

const req = {
  postMerchant: (data) => request({ method: 'post', url: '/merchant/create', data }),
  putMerchant: (data) => request({ method: 'put', url: '/merchant/update', data }),
  getMerchants: (data) => request({ method: 'get', url: '/merchant/list', data }),
  getMerchantOrders: (guid) => request({ method: 'get', url: `/merchant/orders/${guid}` }),
  getMerchant: (id, params) => request({ method: 'get', url: `/merchant/get/${id}`, params }),
  getMerchantBranch: (id) => request({ method: 'get', url: `/merchant/get-branches/${id}` }),
  deleteMerchant: (data) => request({ method: 'delete', url: '/merchant/delete', data }),
  getMerchantProducts: (guid) => request({ method: 'get', url: `/merchant/products/${guid}` })
}
export default req
