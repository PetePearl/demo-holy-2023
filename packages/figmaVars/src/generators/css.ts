import { IPreparedVar } from '../types'
import { toHyphenString } from '../utils.js'

export const collectVars = (preparedVars: IPreparedVar[]) => {
  const collectByMode = (mode: string, variables: IPreparedVar[]) => {
    return variables
      .filter((variable) => {
        return mode in variable.values
      })
      .map((variable) => {
        return {
          name: `--${toHyphenString(variable.name)}`,
          value: variable.values[mode],
        }
      })
  }

  return {
    simpleVars: collectByMode('default', preparedVars),
    lightModeVars: collectByMode('light', preparedVars),
    darkModeVars: collectByMode('dark', preparedVars),
    largeScreenVars: collectByMode('large screen', preparedVars),
    mediumScreenVars: collectByMode('medium screen', preparedVars),
    smallScreenVars: collectByMode('small screen', preparedVars),
  }
}

export const generateCss = (preparedVars: IPreparedVar[]) => {
  const {
    simpleVars,
    lightModeVars,
    darkModeVars,
    largeScreenVars,
    mediumScreenVars,
    smallScreenVars,
  } = collectVars(preparedVars)

  const css: string[] = []

  const rootVars = [...simpleVars, ...lightModeVars, ...smallScreenVars]

  if (rootVars.length) {
    css.push(':root {', ...rootVars.map((v) => `${v.name}: ${v.value};`), '}')
  }

  if (darkModeVars.length) {
    css.push(
      '@media (prefers-color-scheme: dark) {',
      ':root {',
      ...darkModeVars.map((v) => `${v.name}: ${v.value};`),
      '}',
      '}',
    )
  }

  if (mediumScreenVars.length) {
    css.push(
      '@media (min-width: 560px) {',
      ':root {',
      ...mediumScreenVars.map((v) => `${v.name}: ${v.value};`),
      '}',
      '}',
    )
  }

  if (largeScreenVars.length) {
    css.push(
      '@media (min-width: 960px) {',
      ':root {',
      ...largeScreenVars.map((v) => `${v.name}: ${v.value};`),
      '}',
      '}',
    )
  }

  return css.join('\n')
}
