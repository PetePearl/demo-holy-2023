import { styled } from '@linaria/react'

import { IItemStyleProps } from './types'

export const SideBar = styled.aside`
  display: flex;
  width: 48px;
  flex-direction: column;
  background-color: var(--figma-color-bg-secondary);
`

const getItemBackgroundColor = ({ isSelected }: IItemStyleProps) =>
  isSelected ? 'var(--figma-color-bg-tertiary)' : 'transparent'

export const Item = styled.button<IItemStyleProps>`
  height: 48px;
  border: 2px solid ${getItemBackgroundColor};
  appearance: none;
  background-color: ${getItemBackgroundColor};
  border-radius: 2px;
  color: var(--figma-color-icon);
  outline: none;

  &:focus-visible {
    border-color: var(--figma-color-border-selected);
  }
`
