import React, { useEffect, useState } from 'react'

import { handleMessageGlobally } from './api/dispatcher'
import { getStorageValue } from './api/getStorageValue'
import { setGitlabAccessToken } from './api/gitlab'
import { Generator } from './components/Generator'
import { GitLabSettings } from './components/GitLabSettings'
import { Layout } from './components/Layout'
import { ISideBarItem, SideBar } from './components/SideBar'

export const App = () => {
  const sideBarItems: ISideBarItem[] = [
    {
      code: 'generator',
      content: (
        <svg
          className="svg"
          height="32"
          viewBox="0 0 32 32"
          width="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.682 20 8.35 16l3.333-4h1.302l-3.333 4 3.333 4h-1.302zm8.635 0h-1.301l3.333-4-3.333-4h1.302l3.333 4-3.334 4zm-2.178-8-3.2 8H13.86l3.2-8h1.078z"
            fill="currentColor"
            fillOpacity="1"
            fillRule="nonzero"
            stroke="none"
          />
        </svg>
      ),
    },
    {
      code: 'gitlab',
      content: (
        <svg height="32" viewBox="0 0 380 380" width="32" xmlns="http://www.w3.org/2000/svg">
          <defs />
          <g id="LOGO">
            <path
              d="M282.83,170.73l-.27-.69-26.14-68.22a6.81,6.81,0,0,0-2.69-3.24,7,7,0,0,0-8,.43,7,7,0,0,0-2.32,3.52l-17.65,54H154.29l-17.65-54A6.86,6.86,0,0,0,134.32,99a7,7,0,0,0-8-.43,6.87,6.87,0,0,0-2.69,3.24L97.44,170l-.26.69a48.54,48.54,0,0,0,16.1,56.1l.09.07.24.17,39.82,29.82,19.7,14.91,12,9.06a8.07,8.07,0,0,0,9.76,0l12-9.06,19.7-14.91,40.06-30,.1-.08A48.56,48.56,0,0,0,282.83,170.73Z"
              fill="currentColor"
            />
          </g>
        </svg>
      ),
    },
  ]

  const [selectedSideBarItem, setSelectedSideBarItem] = useState(sideBarItems[0])

  useEffect(() => {
    window.addEventListener('message', handleMessageGlobally)

    getStorageValue('gitlabAccessToken').then((token) => {
      setGitlabAccessToken(token)
    })

    return () => {
      window.removeEventListener('message', handleMessageGlobally)
    }
  }, [])

  return (
    <Layout>
      <SideBar
        items={sideBarItems}
        selectedItem={selectedSideBarItem}
        onChange={(item) => setSelectedSideBarItem(item)}
      />

      {selectedSideBarItem.code === 'generator' && <Generator />}

      {selectedSideBarItem.code === 'gitlab' && <GitLabSettings />}
    </Layout>
  )
}
