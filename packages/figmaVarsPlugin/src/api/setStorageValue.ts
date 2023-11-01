import { dispatch } from './dispatcher'

export const setStorageValue = (key: string, value: string) => {
  return dispatch('setStorageValue', key, value)
}

export const handleSetStorageValue = (key: string, value: string) => {
  return figma.clientStorage.setAsync(key, value)
}
