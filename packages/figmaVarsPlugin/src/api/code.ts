import { registerMethodHandler } from './dispatcher'
import { handleGenerateCode } from './generateCode'
import { handleGetLocalVariableCollections } from './getLocalVariableCollections'
import { handleGetStorageValue } from './getStorageValue'
import { handleSetStorageValue } from './setStorageValue'

registerMethodHandler('getStorageValue', handleGetStorageValue)
registerMethodHandler('setStorageValue', handleSetStorageValue)
registerMethodHandler('getLocalVariableCollections', handleGetLocalVariableCollections)
registerMethodHandler('generateCode', handleGenerateCode)

figma.showUI(__html__, { themeColors: true, height: 320 })
