import client from './client'

export function add(params: any) {
  return client.get('/', { params })
}
