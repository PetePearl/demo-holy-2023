## Описание

Демо версия плагина к Figma для работы с переменными. 
Репозиторий содержит два пакета @demo-holy/figma-vars и @demo-holy/figma-vars-plugin.

В @demo-holy/figma-vars содержится логика генерации css кода из figma переменных.

В @demo-holy/figma-vars-plugin содержится реализация интерфейса плагина. 
В нем используются некоторые функции из @demo-holy/figma-vars для генерации кода.

## Сборка проекта

Выполните следующие команды в корневой директории проекта:

```bash
yarn
yarn workspaces run build
```

## Подключение плагина к Figma

В приложении Figma выбрать следующий пункт "Plugins" -> "Development" -> "Import plugin from manifest...".
Далее выбрать файл packages/figmaVarsPlugin/lib/manifest.json. 
После этого в списке плагинов должен появиться плагин Figma vars.

## Полезные ресурсы
- [Общая документация](https://www.figma.com/plugin-docs/) по разработке плагинов.
- [Инструкция](https://help.figma.com/hc/en-us/articles/360042786733-Create-a-plugin-for-development) как создавать/подключать плагины к Figma.
