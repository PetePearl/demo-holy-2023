import { generateCss, prepareVars, splitVariables } from '@demo-holy/figma-vars'

import { dispatch } from './dispatcher'

interface IFile {
  name: string
  data: string
}

export const generateCode = (
  baseCollectionId: string | undefined,
  componentsCollectionId: string | undefined,
) => {
  return dispatch<IFile[]>('generateCode', baseCollectionId, componentsCollectionId)
}

export const handleGenerateCode = (
  baseCollectionId: string | undefined,
  componentsCollectionId: string | undefined,
) => {
  const localVariables = figma.variables.getLocalVariables()
  const localCollections = figma.variables.getLocalVariableCollections()

  const vars = prepareVars(
    localVariables,
    localCollections,
    baseCollectionId,
    figma.variables.getVariableById,
  )

  const groups = splitVariables(vars, componentsCollectionId)

  return Object.values(groups).map((group) => {
    return {
      name: group.name,
      data: `/* eslint-disable */\n${generateCss(group.vars)}`,
    }
  })
}
