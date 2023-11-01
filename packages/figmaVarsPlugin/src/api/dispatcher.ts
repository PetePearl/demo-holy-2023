interface IMessage {
  data: {
    pluginMessage?: {
      id: number
      data: unknown
    }
  }
}

interface IApiMessage {
  id: number
  method: string
  params: unknown[]
}

type TWaitPromise = {
  id: number
  timeout: number
  resolveFn: (data: unknown) => void
}

const waitPromises: TWaitPromise[] = []

export const dispatch: <R = unknown>(method: string, ...params: unknown[]) => Promise<R> = async (
  method,
  ...params
) => {
  return new Promise((resolve, reject) => {
    const id = Math.random()

    const timeout = setTimeout(() => {
      reject(new Error(`Time of method ${method} is out`))
    }, 5000)

    waitPromises.push({
      id,
      timeout,
      // @ts-ignore
      resolveFn: resolve,
    })

    window.parent.postMessage({ pluginMessage: { id, method, params } }, '*')
  })
}

export const handleMessageGlobally = (msg: IMessage) => {
  const { pluginMessage } = msg.data

  if (!pluginMessage) {
    return
  }

  console.log('handleMessageGlobally', pluginMessage)

  const waitPromiseIndex = waitPromises.findIndex((promise) => promise.id === pluginMessage.id)

  if (waitPromiseIndex === -1) {
    return
  }

  const waitPromise = waitPromises[waitPromiseIndex]

  waitPromise.resolveFn(pluginMessage.data)
  clearTimeout(waitPromise.timeout)

  waitPromises.splice(waitPromiseIndex, 1)
}

export const registerMethodHandler = (method: string, handler: any) => {
  figma.ui.on('message', async (msg: IApiMessage) => {
    if (msg.method === method) {
      console.log('registerMethodHandler', msg)

      const data = await handler(...msg.params)

      figma.ui.postMessage({
        id: msg.id,
        data,
      })
    }
  })
}
