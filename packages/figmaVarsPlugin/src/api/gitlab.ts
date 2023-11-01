let accessToken = ''
const gitlabHost = 'https://git.docdoc.pro/api/v4'

export const setGitlabAccessToken = (token: string) => {
  accessToken = token
}

const throwError = (method: string, data: { message?: string; error?: string }) => {
  let message = `Unknown api error`

  if (data.error) {
    message = data.error
  } else if (data.message) {
    message = data.message
  }

  throw new Error(`Method ${method} returned the error: ${message}`)
}

export const gitlabCurrentUser = async () => {
  const response = await fetch(`${gitlabHost}/user`, {
    headers: { 'PRIVATE-TOKEN': accessToken },
  })

  const data = await response.json()

  if (response.status > 399) {
    throwError('gitlabCheckConnection', data)
  }

  return data as {
    email: string
  }
}

export const gitlabProjectInfo = async (id: string | number) => {
  const response = await fetch(`${gitlabHost}/projects/${id}`, {
    headers: { 'PRIVATE-TOKEN': accessToken },
  })

  const data = await response.json()

  if (response.status > 399) {
    throwError('gitlabProjectInfo', data)
  }

  return data as {
    name: string
  }
}

export const gitlabCreateBranch = async (id: string | number, branch: string, ref: string) => {
  const response = await fetch(
    `${gitlabHost}/projects/${id}/repository/branches?branch=${branch}&ref=${ref}`,
    {
      method: 'post',
      headers: { 'PRIVATE-TOKEN': accessToken },
    },
  )

  const data = await response.json()

  if (response.status > 399) {
    throwError('gitlabCreateBranch', data)
  }

  return data
}

export const gitlabCreateCommit = async (
  id: string | number,
  branch: string,
  commit_message: string,
  files: { file_path: string; content: string }[],
) => {
  const response = await fetch(`${gitlabHost}/projects/${id}/repository/commits`, {
    method: 'post',
    headers: { 'PRIVATE-TOKEN': accessToken, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      branch,
      commit_message,
      actions: files.map(({ file_path, content }) => {
        return {
          action: 'create',
          file_path,
          content,
        }
      }),
    }),
  })

  const data = await response.json()

  if (response.status > 399) {
    throwError('gitlabCreateCommit', data)
  }

  return data
}

export const gitlabCreateMergeRequest = async (
  id: string | number,
  sourceBranch: string,
  targetBranch: string,
  title: string,
) => {
  const response = await fetch(
    `${gitlabHost}/projects/${id}/merge_requests?source_branch=${sourceBranch}&target_branch=${targetBranch}&title=${title}&remove_source_branch=true`,
    {
      method: 'post',
      headers: { 'PRIVATE-TOKEN': accessToken },
    },
  )

  const data = await response.json()

  if (response.status > 399) {
    throwError('gitlabCreateMergeRequest', data)
  }

  return data as {
    web_url: string
  }
}
