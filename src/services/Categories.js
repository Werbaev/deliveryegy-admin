import request from '@/utils/axios'

const req = {
  postCategory: (data) => request({ method: 'post', url: '/category/create', data }),
  putCategory: (data) => request({ method: 'put', url: '/category/update', data }),
  getCategories: (data) => request({ method: 'get', url: '/category/list', data }),
  getCategory: (id, data) => request({ method: 'get', url: `/category/get/${id}`, data }),
  deleteCategory: (data) => request({ method: 'delete', url: '/category/delete', data })
}
export default req
