import {
  IFigmaMode,
  IFigmaVariable,
  IFigmaVariableCollection,
  TFigmaModeId,
  TFigmaVariableCollectionId,
  TFigmaVariableId,
} from '../types'

export const createFindByFunctions = (
  variables: IFigmaVariable[],
  collections: IFigmaVariableCollection[],
  getFigmaVariableById?: (id: TFigmaVariableId) => IFigmaVariable | null,
) => {
  const collectionById: Record<TFigmaVariableCollectionId, IFigmaVariableCollection> = {}
  const modeById: Record<TFigmaModeId, IFigmaMode> = {}
  const variableById: Record<TFigmaVariableId, IFigmaVariable> = {}

  collections.forEach((collection) => {
    collectionById[collection.id] = collection

    collection.modes.forEach((mode) => {
      modeById[mode.modeId] = mode
    })
  })

  variables.forEach((variable) => {
    variableById[variable.id] = variable
  })

  return {
    getCollectionById(id: TFigmaVariableCollectionId) {
      if (!collectionById[id]) {
        throw new Error(`Cannot find collection by id "${id}"`)
      }

      return collectionById[id]
    },

    getModeById(id: TFigmaModeId) {
      if (!modeById[id]) {
        throw new Error(`Cannot find mode by id "${id}"`)
      }

      return modeById[id]
    },

    getVariableById(id: TFigmaVariableId) {
      if (!variableById[id] && getFigmaVariableById) {
        try {
          const variable = getFigmaVariableById(id)

          if (variable && variable.name) {
            variableById[id] = variable
          }
        } catch (error) {
          //
        }
      }

      if (!variableById[id]) {
        throw new Error(`Cannot find variable by id "${id}"`)
      }

      return variableById[id]
    },
  }
}
