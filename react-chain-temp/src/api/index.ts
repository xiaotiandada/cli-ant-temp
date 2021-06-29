import client from './client'

export function add(params: any) {
  return client.get('/', { params })
}

export function testCache(params: any) {
  return client.get('https://api.smartsignature.io/tags/hotest', { params: params, useCache: true })
}
export function testCacheA(params: any) {
  return client.get('https://api.smartsignature.io/tags/latest', { params: params })
}