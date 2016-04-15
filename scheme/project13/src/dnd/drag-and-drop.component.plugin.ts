import { OnInit, OnDestroy, Injectable, Renderer2 } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { DragulaService } from 'ng2-dragula';

import { DragAndDropDomHelper } from './drag-and-drop.dom-helper';
import { IDragAndDropConfig, IDragAndDropView, INodeOffset } from './drag-and-drop.interface';

@Injectable()
export class DragAndDropComponentPluginFactory {

  constructor(
    private dragulaService: DragulaService,
    private domHelper: DragAndDropDomHelper
  ) {}

  attachTo(view: IDragAndDropView, config: IDragAndDropConfig): DragAndDropComponentPlugin {
    return new DragAndDropComponentPlugin(view, config, this.dragulaService, this.domHelper);
  }
}

export class DragAndDropComponentPlugin implements OnInit, OnDestroy {

  private static SWAPPED_NODES_COUNT = 2;
  private static MOVED_NODES_COUNT = 1;
  private static DND_SWAPPED_ACTIVE_CLS = 'dnd-swapped-active';
  private static DND_ACTIVE_CLS = 'dnd-active';

  private _draggedElementPosition: INodeOffset;
  private _isNodeAlreadyMovedOrRejected: boolean;
  private _clientX: number;
  private _clientY: number;
  private _dragNode: Element;
  private _dragMirror: Element;
  private _activeElements: Element[] = [];
  private _dragSubscription: Subscription;
  private _dropSubscription: Subscription;
  private _dragEndSubscription: Subscription;
  private _moveSubscription: Function;

  constructor(
    private view: IDragAndDropView,
    private config: IDragAndDropConfig,
    private dragulaService: DragulaService,
    private domHelper: DragAndDropDomHelper,
  ) {
  }

  get dragulaOptions(): any {
    return { copy: true };
  }

  private onMouseMove(event: MouseEvent): void {
    this._clientX = event.clientX;
    this._clientY = event.clientY;

    this.removeAllActiveElements();

    const intersectedByTargetElements = this.intersectedByTargetElements;
    const firstNode = intersectedByTargetElements[0];
    const secondNode = intersectedByTargetElements[1];

    if (this.canMove(intersectedByTargetElements)) {
      this._activeElements = [firstNode];
      this.renderer.addClass(firstNode, DragAndDropComponentPlugin.DND_ACTIVE_CLS);

    } else if (this.canSwap(intersectedByTargetElements)) {
      this._activeElements = [firstNode, secondNode];
      intersectedByTargetElements.forEach(value =>
        this.renderer.addClass(value, DragAndDropComponentPlugin.DND_SWAPPED_ACTIVE_CLS));
    }
  }

  ngOnInit(): void {
    this._dragSubscription = this.dragulaService.drag.subscribe((value: Element[]) => {
      this._isNodeAlreadyMovedOrRejected = false;
      this._dragNode = value[1];
      this.addMouseMoveListener();
    });

    this._dropSubscription = this.dragulaService.drop.subscribe((value: Element[]) => {
      this.removeMouseMoveListener();

      const sourceElement = value[1];
      const targetElement = value[2];
      if (sourceElement && targetElement
            && this._activeElements.length === DragAndDropComponentPlugin.MOVED_NODES_COUNT) {
        this.view.changeLocation({
          swap: false,
          sourceId: this.domHelper.extractNodeId(sourceElement),
          targetId: this.domHelper.extractNodeId(targetElement)
        });
        this._isNodeAlreadyMovedOrRejected = true;
      }
    });

    this._dragEndSubscription = this.dragulaService.dragend.subscribe((value: Element[]) => {
      const sourceElement = value[1];
      const sourceNodeId = this.domHelper.extractNodeId(sourceElement);
      this.renderer.removeChild(sourceElement.parentNode, sourceElement);

      if (!this._isNodeAlreadyMovedOrRejected
            && this._activeElements.length === DragAndDropComponentPlugin.SWAPPED_NODES_COUNT) {
          this.view.changeLocation({
            swap: true,
            targetId: this.domHelper.extractNodeId(this._activeElements[0]),
            sourceId: sourceNodeId
          });
      }

      this.removeAllActiveElements();
      this.clearCache();
    });
  }

  ngOnDestroy(): void {
    this._dragEndSubscription.unsubscribe();
    this._dropSubscription.unsubscribe();
    this._dragSubscription.unsubscribe();
    this.clearCache();
    this.removeMouseMoveListener();
  }

  private addMouseMoveListener(): void {
    this._moveSubscription =
      this.renderer.listen(document.body, 'mousemove', (event: MouseEvent) => this.onMouseMove(event));
  }

  private removeMouseMoveListener(): void {
    if (this._moveSubscription) {
      this._moveSubscription();
    }
  }

  private removeAllActiveElements(): void {
    this._activeElements.forEach(el => {
      this.renderer.removeClass(el, DragAndDropComponentPlugin.DND_ACTIVE_CLS);
      this.renderer.removeClass(el, DragAndDropComponentPlugin.DND_SWAPPED_ACTIVE_CLS);
    });
    this._activeElements.length = 0;
  }

  private get intersectedByTargetElements(): Element[] {
    return this.domHelper.getIntersectedByTargetElements(
      this._dragNode,
      this.draggedElementPosition,
      this.domHelper.queryElements(this.config.viewElementRef.nativeElement, this.config.draggableNodesSelector)
    );
  }

  private get renderer(): Renderer2 {
    return this.config.renderer;
  }

  private clearCache(): void {
    this._dragMirror = null;
    this._dragNode = null;
  }

  private canMove(intersectedByTargetElements: Element[]): boolean {
    const firstNode = intersectedByTargetElements[0];

    return intersectedByTargetElements.length === DragAndDropComponentPlugin.MOVED_NODES_COUNT
      && this._dragNode !== firstNode
      && this.domHelper.isCursorInsideElement(this._clientX, this._clientY, firstNode);
  }

  private canSwap(intersectedByTargetElements: Element[]): boolean {
    const firstNode = intersectedByTargetElements[0];
    const secondNode = intersectedByTargetElements[1];

    return intersectedByTargetElements.length === DragAndDropComponentPlugin.SWAPPED_NODES_COUNT
      && this._dragNode !== secondNode
      && this._dragNode !== firstNode;
  }

  private get draggedElementPosition(): INodeOffset {
    const mirrorEl = this._dragMirror = this._dragMirror || this.domHelper.queryDragulaMirrorElement();
    return mirrorEl
      ? this._draggedElementPosition = this.domHelper.getOffset(mirrorEl)
      : this._draggedElementPosition;
  }
}
