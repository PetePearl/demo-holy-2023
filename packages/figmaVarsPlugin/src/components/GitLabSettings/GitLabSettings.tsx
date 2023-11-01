/* eslint-disable unicorn/no-useless-undefined */
import React, { useEffect, useState } from 'react'

import { getStorageValue } from '../../api/getStorageValue'
import { gitlabCurrentUser, gitlabProjectInfo, setGitlabAccessToken } from '../../api/gitlab'
import { setStorageValue } from '../../api/setStorageValue'

import * as s from './styles'

export const GitLabSettings = () => {
  const [accessToken, setAccessToken] = useState('')
  const [repositoryId, setRepositoryId] = useState('')
  const [branch, setBranch] = useState('')

  const [isDisabled, setIsDisabled] = useState(true)
  const [error, setError] = useState<string>()
  const [connectionData, setConnectionData] = useState<{ email: string; repository: string }>()

  useEffect(() => {
    getStorageValue('gitlabAccessToken').then((value) => {
      if (value) {
        setAccessToken(value)
      }
    })

    getStorageValue('gitlabRepositoryId').then((value) => {
      if (value) {
        setRepositoryId(value)
      }
    })

    getStorageValue('gitlabBranch').then((value) => {
      setBranch(value ?? 'master')
    })
  }, [])

  useEffect(() => {
    setIsDisabled(!(accessToken && repositoryId && branch))
  }, [accessToken, repositoryId, branch])

  const handleClick = async () => {
    try {
      setIsDisabled(true)
      setError(undefined)
      setConnectionData(undefined)

      setGitlabAccessToken(accessToken)

      const user = await gitlabCurrentUser()
      const project = await gitlabProjectInfo(repositoryId)

      setConnectionData({
        email: user.email,
        repository: project.name,
      })

      setStorageValue('gitlabAccessToken', accessToken)
      setStorageValue('gitlabRepositoryId', repositoryId)
      setStorageValue('gitlabBranch', branch)
    } catch (error_) {
      setError((error_ as any)?.message)
    } finally {
      setIsDisabled(false)
    }
  }

  return (
    <s.GitLabSettings>
      <s.Field>
        Access token:
        <input
          type="password"
          value={accessToken}
          onChange={(event) => setAccessToken(event.target.value)}
        />
      </s.Field>

      <s.Field>
        Repository ID:
        <input
          type="text"
          value={repositoryId}
          onChange={(event) => setRepositoryId(event.target.value)}
        />
      </s.Field>

      <s.Field>
        Source/target branch:
        <input type="text" value={branch} onChange={(event) => setBranch(event.target.value)} />
      </s.Field>

      <s.CheckButton disabled={isDisabled} onClick={handleClick}>
        Проверить соединение
      </s.CheckButton>

      {connectionData && (
        <>
          <s.Title>Успешное соединение!</s.Title>

          <div>
            Account: {connectionData.email}
            <br />
            Repository: {connectionData.repository}
          </div>
        </>
      )}

      {error && (
        <>
          <s.Title>При проверке возникла ошибка!</s.Title>

          <div>{error}</div>
        </>
      )}
    </s.GitLabSettings>
  )
}
