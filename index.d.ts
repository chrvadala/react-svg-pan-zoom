import * as React from 'react';

export interface Value {
  x: number;
  y: number;
  zoom: number;
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
  version: string;
}

export type Tool = 'none' | 'pan' | 'zoom-in' | 'zoom-out' | 'auto';
export type ToolbarPosition = 'none' | 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'left' | 'center' | 'right' | 'top' | 'bottom' | 'cover';

export interface ViewerMouseEvent {
  originalEvent: React.SyntheticEvent;
  SVGViewer: SVGSVGElement;
  point: { x: number; y: number };
  x: number;
  y: number;
  scaleFactor: number;
  translationX: number;
  translationY: number;
  preventDefault(): void;
  stopPropagation(): void;
}

export interface ViewerTouchEvent {
  originalEvent: React.SyntheticEvent;
  SVGViewer: SVGSVGElement;
  points: Array<{ x: number; y: number; identifier: number }>;
  changedPoints: Array<{ x: number; y: number; identifier: number }>;
  scaleFactor: number;
  translationX: number;
  translationY: number;
  preventDefault(): void;
  stopPropagation(): void;
}

interface CommonProps {
  width: number;
  height: number;
  background?: string;
  SVGBackground?: string;
  SVGStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  className?: string;
  detectWheel?: boolean;
  detectAutoPan?: boolean;
  detectPinchGesture?: boolean;
  onZoom?: (value: Value) => void;
  onPan?: (value: Value) => void;
  onClick?: (event: ViewerMouseEvent) => void;
  onDoubleClick?: (event: ViewerMouseEvent) => void;
  onMouseUp?: (event: ViewerMouseEvent) => void;
  onMouseMove?: (event: ViewerMouseEvent) => void;
  onMouseDown?: (event: ViewerMouseEvent) => void;
  onTouchStart?: (event: ViewerTouchEvent) => void;
  onTouchMove?: (event: ViewerTouchEvent) => void;
  onTouchEnd?: (event: ViewerTouchEvent) => void;
  onTouchCancel?: (event: ViewerTouchEvent) => void;
  preventPanOutside?: boolean;
  scaleFactor?: number;
  scaleFactorOnWheel?: number;
  scaleFactorMax?: number;
  scaleFactorMin?: number;
  modifierKeys?: string[];
  disableDoubleClickZoomWithToolAuto?: boolean;
  customMiniature?: React.ComponentType<any>;
  miniatureProps?: {
    position?: ToolbarPosition;
    background?: string;
    width?: number;
    height?: number;
  };
  customToolbar?: React.ComponentType<any>;
  toolbarProps?: {
    position?: ToolbarPosition;
    SVGAlignX?: Alignment;
    SVGAlignY?: Alignment;
    activeToolColor?: string;
  };
}


export interface ReactSVGPanZoomProps extends CommonProps {
  value: Value;
  onChangeValue(value: Value): void;
  tool: Tool;
  onChangeTool(tool: Tool): void;
}


export interface UncontrolledReactSVGPanZoomProps extends CommonProps {
  defaultTool?: Tool;
  defaultValue?: Value;
  onChangeValue?(value: Value): void;
  onChangeTool?(tool: Tool): void;
}


export class ReactSVGPanZoom extends React.Component<ReactSVGPanZoomProps> {
  // Методы, доступные через ref
  public pan(SVGDeltaX: number, SVGDeltaY: number): void;
  public zoom(SVGPointX: number, SVGPointY: number, scaleFactor: number): void;
  public fitSelection(
    selectionSVGPointX: number,
    selectionSVGPointY: number,
    selectionWidth: number,
    selectionHeight: number
  ): void;
  public fitToViewer(alignX?: Alignment, alignY?: Alignment): void;
  public setPointOnViewerCenter(
    SVGPointX: number,
    SVGPointY: number,
    zoomLevel: number
  ): void;
  public reset(): void;
  public zoomOnViewerCenter(scaleFactor: number): void;
  public getValue(): Value;
  public setValue(value: Value): void;
  public getTool(): Tool;
  public changeTool(tool: Tool): void;
  public openMiniature(): void;
  public closeMiniature(): void;
}

export class UncontrolledReactSVGPanZoom extends React.Component<UncontrolledReactSVGPanZoomProps> {

  public pan(SVGDeltaX: number, SVGDeltaY: number): void;
  public zoom(SVGPointX: number, SVGPointY: number, scaleFactor: number): void;
  public fitSelection(
    selectionSVGPointX: number,
    selectionSVGPointY: number,
    selectionWidth: number,
    selectionHeight: number
  ): void;
  public fitToViewer(alignX?: Alignment, alignY?: Alignment): void;
  public setPointOnViewerCenter(
    SVGPointX: number,
    SVGPointY: number,
    zoomLevel: number
  ): void;
  public reset(): void;
  public zoomOnViewerCenter(scaleFactor: number): void;
  public getValue(): Value;
  public setValue(value: Value): void;
  public getTool(): Tool;
  public changeTool(tool: Tool): void;
  public openMiniature(): void;
  public closeMiniature(): void;
}

export function setPointOnViewerCenter(
  value: Value,
  SVGPointX: number,
  SVGPointY: number,
  zoomLevel: number
): Value;

export function reset(value: Value): Value;

export function pan(value: Value, SVGDeltaX: number, SVGDeltaY: number): Value;

export function zoom(
  value: Value,
  SVGPointX: number,
  SVGPointY: number,
  scaleFactor: number
): Value;

export function fitSelection(
  value: Value,
  selectionSVGPointX: number,
  selectionSVGPointY: number,
  selectionWidth: number,
  selectionHeight: number
): Value;

export function fitToViewer(value: Value, alignX?: Alignment, alignY?: Alignment): Value;

export function zoomOnViewerCenter(value: Value, scaleFactor: number): Value;

export function openMiniature(): void;
export function closeMiniature(): void;

export const INITIAL_VALUE: Partial<Value>
export const MODE_IDLE: string;
export const MODE_PANNING: string;
export const MODE_ZOOMING: string;
export const TOOL_AUTO: Tool;
export const TOOL_NONE: Tool;
export const TOOL_PAN: Tool;
export const TOOL_ZOOM_IN: Tool;
export const TOOL_ZOOM_OUT: Tool;
export const POSITION_NONE: ToolbarPosition;
export const POSITION_TOP: ToolbarPosition;
export const POSITION_RIGHT: ToolbarPosition;
export const POSITION_BOTTOM: ToolbarPosition;
export const POSITION_LEFT: ToolbarPosition;
export const ACTION_ZOOM: string;
export const ACTION_PAN: string;
export const ALIGN_CENTER: Alignment;
export const ALIGN_LEFT: Alignment;
export const ALIGN_RIGHT: Alignment;
export const ALIGN_TOP: Alignment;
export const ALIGN_BOTTOM: Alignment;
export const ALIGN_COVER: Alignment;

export const ToolbarButton: React.ComponentType<any>;
export const IconCursor: React.ComponentType<any>;
export const IconPan: React.ComponentType<any>;
export const IconFit: React.ComponentType<any>;
export const IconZoomIn: React.ComponentType<any>;
export const IconZoomOut: React.ComponentType<any>;
export const Miniature: React.ComponentType<any>;
