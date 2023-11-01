import { IFigmaColor } from './types'

export const colorToHex = (color: IFigmaColor) => {
  const toHex = (v: number) =>
    Math.round(v * 255)
      .toString(16)
      .padStart(2, '0')

  const red = toHex(color.r)
  const green = toHex(color.g)
  const blue = toHex(color.b)
  const alpha = color.a ? toHex(color.a) : 'ff'

  return `#${red}${green}${blue}${alpha === 'ff' ? '' : alpha}`
}

export const toHyphenString = (str: string) => str.toLowerCase().replace(/[^\dA-z-]+/g, '-')
