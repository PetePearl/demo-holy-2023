import {
  IFigmaVariable,
  IFigmaVariableCollection,
  IPreparedVar,
  TFigmaVariableCollectionId,
  TFigmaVariableId,
} from '../types'
import { colorToHex, toHyphenString } from '../utils.js'

import { createFindByFunctions } from './createFindByFunctions.js'

export const prepareVars = (
  variables: IFigmaVariable[],
  collections: IFigmaVariableCollection[],
  baseCollectionId?: TFigmaVariableCollectionId,
  getFigmaVariableById?: (id: TFigmaVariableId) => IFigmaVariable | null,
) => {
  const { getCollectionById, getModeById, getVariableById } = createFindByFunctions(
    variables,
    collections,
    getFigmaVariableById,
  )

  const resolveValues = (variable: IFigmaVariable) => {
    const values: Record<string, string> = {}

    const processAlias = (aliasId: TFigmaVariableId) => {
      const alias = getVariableById(aliasId)

      if (alias.variableCollectionId === baseCollectionId) {
        const aliasValues = resolveValues(alias)

        if ('default' in aliasValues) {
          return aliasValues.default
        }

        throw new Error(`Alias "${aliasId}" doesn't have default value`)
      }

      return `var(--${toHyphenString(alias.name)})`
    }

    Object.entries(variable.valuesByMode).forEach(([modeId, value]) => {
      let valueAsString: string | undefined

      if (typeof value === 'object' && 'r' in value) {
        valueAsString = colorToHex(value)
      } else if (typeof value === 'object' && 'id' in value) {
        valueAsString = processAlias(value.id)
      } else if (typeof value === 'number') {
        valueAsString = `${value}px`
      } else {
        valueAsString = `${value}`
      }

      if (!valueAsString) {
        console.warn(`Cannot convert variable into string`, variable)
        return
      }

      const collection = getCollectionById(variable.variableCollectionId)
      const mode = getModeById(modeId)
      const key = collection.modes.length > 1 ? mode.name.toLowerCase() : 'default'

      values[key] = valueAsString
    })

    return values
  }

  return variables
    .map((variable): IPreparedVar => {
      const collection = getCollectionById(variable.variableCollectionId)

      return {
        collectionId: collection.id,
        name: variable.name,
        values: resolveValues(variable),
      }
    })
    .filter((variable) => {
      if (baseCollectionId) {
        return variable.collectionId !== baseCollectionId
      }

      return true
    })
}
