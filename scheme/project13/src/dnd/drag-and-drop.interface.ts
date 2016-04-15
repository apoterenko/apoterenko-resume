import { ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';

export interface IDragAndDropPayload {
  swap: boolean;
  sourceId: string;
  targetId: string;
}

export interface INodeOffset {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface INodeCoordinates {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export interface IDragAndDropView extends OnInit, OnDestroy {
  dragulaOptions: any;
  changeLocation(payload: IDragAndDropPayload): void;
}

export interface IDragAndDropConfig {
  viewElementRef: ElementRef;
  draggableNodesSelector: string;
  renderer: Renderer2;
}
