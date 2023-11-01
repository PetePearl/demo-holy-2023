import { IFigmaVariable, IFigmaVariableCollection } from '../types'

export const fetchVariables = async (fileKey: string, accessToken: string) => {
  // сделать rest-запрос за переменными (docs: https://www.figma.com/developers/api#variables)
  // console.log('dbg: fetch from figma', fileKey, accessToken)

  return { variables: [] as IFigmaVariable[], collections: [] as IFigmaVariableCollection[] }
}
