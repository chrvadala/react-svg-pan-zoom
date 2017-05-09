import {decorateAction} from '@kadira/storybook-addon-actions'

export const noArgsDecorator = decorateAction([
  args => {
    return ['args ignored to allow multiple log actions merge']
  }
]);


export const viewerMouseEventDecorator = decorateAction([
  args => args
    .map(event => {
      return {
        originalEvent: '[SyntheticEvent]',
        SVGViewer: "[SVGSVGElement]",
        point: event.point,
        x: event.x,
        y: event.y,
        scaleFactor: event.scaleFactor,
        translationX: event.translationX,
        translationY: event.translationY,
      }
    })
]);

export const viewerTouchEventDecorator = decorateAction([
  args => args
    .map(event => {
      return {
        originalEvent: '[SyntheticEvent]',
        SVGViewer: "[SVGSVGElement]",
        points: event.points,
        scaleFactor: event.scaleFactor,
        translationX: event.translationX,
        translationY: event.translationY,
      }
    })
]);
