import request from '@/utils/axios'

export default {
  postUser: (data) => request({ method: 'post', url: '/user/create', data }),
  putUser: (data) => request({ method: 'put', url: '/user/update', data }),
  getUsers: (data) => request({ method: 'get', url: '/user/list', data }),
  getUser: (id, data) => request({ method: 'get', url: `/user/get/${id}`, data }),
  deleteUser: (data) => request({ method: 'delete', url: '/user/delete', data })
}
