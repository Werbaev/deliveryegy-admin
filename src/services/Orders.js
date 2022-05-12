import request from '@/utils/axios'

export default {
  postOrder: (data) => request({ method: 'post', url: '/order/create', data }),
  putOrder: (data) => request({ method: 'put', url: '/order/update', data }),
  getOrders: (data) => request({ method: 'get', url: '/order/list', data }),
  getOrder: (id, data) => request({ method: 'get', url: `/order/get/${id}`, data }),
  deleteOrder: (data) => request({ method: 'delete', url: '/order/delete', data })
}
