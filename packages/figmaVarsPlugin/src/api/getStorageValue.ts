import { dispatch } from './dispatcher'

export const getStorageValue = (key: string) => {
  return dispatch<string>('getStorageValue', key)
}

export const handleGetStorageValue = (key: string) => {
  return figma.clientStorage.getAsync(key)
}
