/* eslint-disable unicorn/no-useless-undefined */
import React, { useState } from 'react'

import { getStorageValue } from '../../../../api/getStorageValue'
import {
  gitlabCreateBranch,
  gitlabCreateCommit,
  gitlabCreateMergeRequest,
} from '../../../../api/gitlab'
import { IFile } from '../../types'

import * as s from './styles'

interface IProps {
  files: IFile[]
}

export const Files = ({ files }: IProps) => {
  const [isDisabled, setIsDisabled] = useState(false)
  const [error, setError] = useState<string>()
  const [mrUrl, setMrUrl] = useState<string>()

  const preparedFiles = files.map((file) => {
    return {
      name: `${file.name || 'variables'}.css`,
      href: URL.createObjectURL(new Blob([file.data])),
    }
  })

  const handleGitLabClick = async () => {
    try {
      setError(undefined)
      setMrUrl(undefined)
      setIsDisabled(true)

      const branch = 'figma-vars-update'
      const projectDir = 'packages/sds/tokensVariables/src'
      const sourceBranch = await getStorageValue('gitlabBranch')
      const projectId = await getStorageValue('gitlabRepositoryId')

      await gitlabCreateBranch(projectId, branch, sourceBranch)

      await gitlabCreateCommit(
        projectId,
        branch,
        'feat: Обновлены переменные',
        files.map((file) => {
          return {
            file_path: `${projectDir}/${file.name || 'variables'}.css`,
            content: file.data,
          }
        }),
      )

      const { web_url } = await gitlabCreateMergeRequest(
        projectId,
        branch,
        sourceBranch,
        'Draft: Автоматическое обновление переменных',
      )

      setMrUrl(web_url)
    } catch (error_) {
      setError((error_ as any)?.message)
    } finally {
      setIsDisabled(false)
    }
  }

  return (
    <s.Files>
      <s.Actoins>
        <button disabled={isDisabled} type="button" onClick={handleGitLabClick}>
          Сделать MR в GitLab
        </button>
      </s.Actoins>

      {mrUrl && (
        <>
          <s.Title>MR успешно создан!</s.Title>
          <a href={mrUrl} rel="noreferrer" target="_blank">
            Открыть MR
          </a>
        </>
      )}

      {error && (
        <>
          <s.Title>При создании MR возникла ошибка!</s.Title>
          <div>{error}</div>
        </>
      )}

      <s.Title>Файлы:</s.Title>

      <s.List>
        {preparedFiles.map((file) => {
          return (
            <a download={file.name} href={file.href} key={file.name}>
              {file.name}
            </a>
          )
        })}
      </s.List>
    </s.Files>
  )
}
