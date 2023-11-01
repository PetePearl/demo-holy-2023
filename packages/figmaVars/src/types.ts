export type TFigmaVariableCollectionId = string
export type TFigmaModeId = string
export type TFigmaVariableId = string
export type TFigmaVariableValue = boolean | number | string | IFigmaVariableAlias | IFigmaColor
export type TFigmaVariableScope =
  | 'ALL_SCOPES'
  | 'TEXT_CONTENT'
  | 'WIDTH_HEIGHT'
  | 'GAP'
  | 'ALL_FILLS'
  | 'FRAME_FILL'
  | 'SHAPE_FILL'
  | 'TEXT_FILL'
  | 'STROKE_COLOR'
  | 'CORNER_RADIUS'

export interface IFigmaVariableCollection {
  id: TFigmaVariableCollectionId
  name: string
  defaultModeId: string
  hiddenFromPublishing: boolean

  remote: boolean
  key: string
  variableIds: TFigmaVariableId[]
  modes: IFigmaMode[]
}

export interface IFigmaMode {
  modeId: TFigmaModeId
  name: string
}

export interface IFigmaVariable {
  id: TFigmaVariableId
  name: string
  description: string
  variableCollectionId: TFigmaVariableCollectionId
  resolvedType: 'BOOLEAN' | 'FLOAT' | 'STRING' | 'COLOR'
  hiddenFromPublishing: boolean
  scopes: TFigmaVariableScope[]
  codeSyntax: {
    WEB?: string
    IOS?: string
    ANDROID?: string
  }

  valuesByMode: Record<TFigmaModeId, TFigmaVariableValue>
  remote: boolean
  key: string
}

export interface IFigmaVariableAlias {
  id: TFigmaVariableId
  type: 'VARIABLE_ALIAS'
}

export interface IFigmaColor {
  a?: number
  r: number
  g: number
  b: number
}

export interface IPreparedVar {
  collectionId: string
  name: string
  values: Record<string, string>
}

export interface IPreparedVarGroup {
  name?: string
  vars: IPreparedVar[]
}

export interface ICliOptions {
  figmaFileKey?: string
  figmaAccessToken?: string
  outDir?: string
  outCss?: string
  outTs?: string
}
