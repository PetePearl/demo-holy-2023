import React, { useState } from 'react'

import { generateCode } from '../../api/generateCode'

import { Files } from './components/Files'
import { Form } from './components/Form'
import { IFile } from './types'
import * as s from './styles'

export const Generator = () => {
  const [files, setFiles] = useState<IFile[]>([])

  const handleSubmit = async (
    collectionId: string | undefined,
    baseCollectionId: string | undefined,
  ) => {
    setFiles(await generateCode(baseCollectionId, collectionId))
  }

  return (
    <s.Generator>
      {files.length === 0 ? <Form onSubmit={handleSubmit} /> : <Files files={files} />}
    </s.Generator>
  )
}
