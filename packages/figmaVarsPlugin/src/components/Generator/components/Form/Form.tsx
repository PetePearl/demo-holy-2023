import React, { useEffect, useState } from 'react'

import { getLocalVariableCollections } from '../../../../api/getLocalVariableCollections'
import { getStorageValue } from '../../../../api/getStorageValue'
import { setStorageValue } from '../../../../api/setStorageValue'
import { ICollection } from '../../types'

import * as s from './styles'

interface IProps {
  onSubmit: (
    componentCollectionId: string | undefined,
    baseCollectionId: string | undefined,
  ) => void
}

export const Form = ({ onSubmit }: IProps) => {
  const [collections, setCollections] = useState<ICollection[]>([])
  const [selectedBaseCollectionId, setSelectedBaseCollectionId] = useState<string>()
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>()

  useEffect(() => {
    getLocalVariableCollections().then((collectionz) => {
      setCollections(collectionz)
    })

    getStorageValue('selectedBaseCollectionId').then((value) => {
      setSelectedBaseCollectionId(value)
    })

    getStorageValue('selectedCollectionId').then((value) => {
      setSelectedCollectionId(value)
    })
  }, [])

  return (
    <s.Form>
      <s.Field className="field" htmlFor="base-collection">
        <span>Базовая коллекция:</span>
        <select
          id="base-collection"
          value={selectedBaseCollectionId}
          onChange={(event) => {
            setSelectedBaseCollectionId(event.target.value)
            setStorageValue('selectedBaseCollectionId', event.target.value)
          }}
        >
          <option>Выберите</option>
          {collections.map((collection) => {
            return (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            )
          })}
        </select>
      </s.Field>

      <s.Field className="field" htmlFor="vars-collections">
        <span>Коллекция с компонентами:</span>
        <select
          id="vars-collections"
          value={selectedCollectionId}
          onChange={(event) => {
            setSelectedCollectionId(event.target.value)
            setStorageValue('selectedCollectionId', event.target.value)
          }}
        >
          <option>Выберите</option>
          {collections.map((collection) => {
            return (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            )
          })}
        </select>
      </s.Field>

      <s.GenerateButton
        type="button"
        onClick={() => onSubmit(selectedCollectionId, selectedBaseCollectionId)}
      >
        Сгенерировать
      </s.GenerateButton>
    </s.Form>
  )
}
