import request from '@/utils/axios'

export default {
  postProduct: (data) => request({ method: 'post', url: '/product/create', data }),
  putProduct: (data) => request({ method: 'put', url: '/product/update', data }),
  getProducts: (data) => request({ method: 'get', url: '/product/list', data }),
  getProduct: (id, data) => request({ method: 'get', url: `/product/get/${id}`, data }),
  deleteProduct: (data) => request({ method: 'delete', url: '/product/delete', data })
}
