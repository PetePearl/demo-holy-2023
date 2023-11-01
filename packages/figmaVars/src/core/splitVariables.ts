import { IPreparedVar, IPreparedVarGroup, TFigmaVariableCollectionId } from '../types'
import { toHyphenString } from '../utils.js'

const generateGroupName = (variable: IPreparedVar) => {
  const path = variable.name.split('/')

  if (path.length < 2) {
    return false
  }

  return toHyphenString(path[0])
}

export const splitVariables = (
  preparedVars: IPreparedVar[],
  splitCollectionId?: TFigmaVariableCollectionId,
) => {
  const groups: Record<string, IPreparedVarGroup> = {
    default: { vars: [] },
  }

  preparedVars.forEach((variable) => {
    const groupName = generateGroupName(variable)

    if (variable.collectionId !== splitCollectionId || !groupName) {
      groups.default.vars.push(variable)
      return
    }

    if (!groups[groupName]) {
      groups[groupName] = {
        name: groupName,
        vars: [],
      }
    }

    groups[groupName].vars.push(variable)
  })

  return groups
}
