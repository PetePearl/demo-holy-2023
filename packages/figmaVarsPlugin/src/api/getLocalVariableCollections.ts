import { dispatch } from './dispatcher'

interface ICollection {
  id: string
  name: string
}

export const getLocalVariableCollections = () => {
  return dispatch<ICollection[]>('getLocalVariableCollections')
}

export const handleGetLocalVariableCollections = () => {
  return figma.variables.getLocalVariableCollections().map((collection) => {
    return {
      id: collection.id,
      name: collection.name,
    } as ICollection
  })
}
