#!/usr/bin/env node
import console from 'console'
import { writeFile } from 'fs/promises'
import path from 'path'

import { program } from 'commander'

import { generateCss } from './generators/css.js'
import { generateTs } from './generators/typescript.js'
import { fetchVariables } from './importers/rest.js'
import { prepareVars } from './core/prepareVars.js'
import { ICliOptions } from './types'

const options = program
  .name('figma-vars')
  .helpOption('-h, --help', 'Описание опций')
  .requiredOption(
    '-ffk, --figma-file-key [key]',
    'Key фигма файла, из которого будут импортированы переменные',
  )
  .requiredOption(
    '-fat, --figma-access-token [token]',
    'Access-токен для REST API, генерируется в фигме',
  )
  .option('-od, --out-dir [dir]', 'Путь к папке, куда будет сгенерирован ts и css', '.')
  .option('-ot, --out-ts [file]', 'Путь к файлу, куда будет сгенерирован ts', 'variables.ts')
  .option('-oc, --out-css [file]', 'Путь к файлу, куда будут сгенерирован css', 'variables.css')
  .parse()
  .opts<ICliOptions>()

const figmaFileKey = `${options.figmaFileKey}`
const figmaAccessToken = `${options.figmaAccessToken}`
const outDir = `${options.outDir}`
const outCssFile = `${options.outCss}`
const outTsFile = `${options.outTs}`

const { variables, collections } = await fetchVariables(figmaFileKey, figmaAccessToken)
const preparedVars = prepareVars(variables, collections)
const cssCode = generateCss(preparedVars)
const tsCode = generateTs(preparedVars)

await writeFile(path.resolve(outDir, outCssFile), cssCode)
await writeFile(path.resolve(outDir, outTsFile), tsCode)

console.log(`✅  Файлы "${outCssFile}" и "${outTsFile}" сгенерированы.`)
