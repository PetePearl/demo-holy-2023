import React from 'react'

import * as s from './styles'
import { ISideBarItem } from './types'

interface IProps {
  selectedItem: ISideBarItem
  items: ISideBarItem[]
  onChange: (item: ISideBarItem) => void
}

export const SideBar = ({ selectedItem, items, onChange }: IProps) => {
  return (
    <s.SideBar>
      {items.map((item) => {
        return (
          <s.Item
            isSelected={item.code === selectedItem.code}
            key={item.code}
            onClick={() => onChange(item)}
          >
            {item.content}
          </s.Item>
        )
      })}
    </s.SideBar>
  )
}
