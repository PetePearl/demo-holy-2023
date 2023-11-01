import React, { ReactNode } from 'react'

import * as s from './styles'

interface IProps {
  children: ReactNode
}

export const Layout = ({ children }: IProps) => {
  return <s.Root>{children}</s.Root>
}
