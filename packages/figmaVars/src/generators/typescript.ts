import { IPreparedVar } from '../types'

export const generateTs = (preparedVars: IPreparedVar[]) => {
  return preparedVars
    .map((v) => {
      const nameInCamelCase = v.name
        .slice(2)
        .replace(/-([A-z])/g, (_, char) => {
          return char.toUpperCase()
        })
        .replace('-', '')

      return `export const ${nameInCamelCase} = 'var(${v.name})'`
    })
    .join('\n')
}
