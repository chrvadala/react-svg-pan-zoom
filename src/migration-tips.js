import {isNullOrUndefined} from "./utils/is";

const github_base = 'https://github.com/chrvadala/react-svg-pan-zoom/blob/main'

const doc_v2_to_v3 = github_base + '/docs/migrate-from-v2-to-v3.md'

export function tipControlledComponent() {
  console.error(`HEY! With ReactSVGPanZoom >= 3 you MUST specify value and tool props. Please read here ${doc_v2_to_v3}`)
}

export function tipDeprecatedMiniatureProps(){
  console.error(`HEY! With ReactSVGPanZoom >= 3 the props miniaturePosition, miniatureBackground, miniatureWidth, miniatureHeight can be specified as key in the miniatureProps object. Please read here ${doc_v2_to_v3}`)
}

export function tipDeprecateToolbarProps(){
  console.error(`HEY! With ReactSVGPanZoom >= 3 the prop toolbarPosition can be specified as key in the toolbarProps object. Please read here ${doc_v2_to_v3}`)
}

export function printMigrationTipsRelatedToProps(props){
  if (
    isNullOrUndefined(props.tool) ||
    isNullOrUndefined(props.value)
  ) tipControlledComponent()

  if (
    !isNullOrUndefined(props.miniaturePosition) ||
    !isNullOrUndefined(props.miniatureBackground) ||
    !isNullOrUndefined(props.miniatureWidth) ||
    !isNullOrUndefined(props.miniatureHeight)
  ) tipDeprecatedMiniatureProps()


  if (
    !isNullOrUndefined(props.toolbarPosition)
  ) tipDeprecateToolbarProps()
}
