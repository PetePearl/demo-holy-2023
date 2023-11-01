import { ReactNode } from 'react'

export interface ISideBarItem {
  code: string
  content: ReactNode
}

export interface IItemStyleProps {
  isSelected: boolean
}
