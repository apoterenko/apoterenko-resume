import { Injectable } from '@angular/core';
import * as R from 'ramda';

import { INodeCoordinates, INodeOffset } from './drag-and-drop.interface';

@Injectable()
export class DragAndDropDomHelper {

  private static DND_ATTRIBUTE_NAME = 'nodeid';
  private static DND_MIRROR_CLS = 'gu-mirror';

  getOffset(el: Element): INodeOffset {
    // jQuery
    return Object.assign({ width: el.clientWidth, height: el.clientHeight }, $(el).offset());
  }

  getIntersectedByTargetElements(
    dragNode: Element, targetPosition: INodeOffset, elements: HTMLCollectionOf<Element>
  ): Element[] {
    return targetPosition
      ? R.filter(
        info => !!info,
        R.map((el: Element) => {
          const coord = this.getCoordinates(el);
          const x1Mirror = targetPosition.left;
          const x2Mirror = targetPosition.left + targetPosition.width;
          const y1Mirror = targetPosition.top;
          const y2Mirror = targetPosition.top + targetPosition.height;

          if ((coord.x1 <= x1Mirror && x1Mirror <= coord.x2 && coord.y1 <= y1Mirror && y1Mirror <= coord.y2) ||
            (coord.x1 <= x2Mirror && x2Mirror <= coord.x2 && coord.y1 <= y1Mirror && y1Mirror <= coord.y2) ||
            (coord.x1 <= x1Mirror && x1Mirror <= coord.x2 && coord.y1 <= y2Mirror && y2Mirror <= coord.y2) ||
            (coord.x1 <= x2Mirror && x2Mirror <= coord.x2 && coord.y1 <= y2Mirror && y2Mirror <= coord.y2)) {

            return el;
          }
          return null;
        }, Array.from(elements).filter(element => element !== dragNode))
      )
      : [];
  }

  isCursorInsideElement(x: number, y: number, el: Element): boolean {
    const coord = this.getCoordinates(el);
    // jQuery
    const doc = $(document);
    const x_ =  x + doc.scrollLeft();
    const y_ =  y + doc.scrollTop();
    return coord.x1 <= x_ && coord.x2 >= x_ && coord.y1 <= y_ && coord.y2 >= y_;
  }

  queryElements(el: Element, selector: string): HTMLCollectionOf<Element> {
    return el.querySelectorAll(selector) as HTMLCollectionOf<Element>;
  }

  queryDragulaMirrorElement(): Element {
    return R.find((el: Element) => el.classList.contains(DragAndDropDomHelper.DND_MIRROR_CLS),
      Array.from(document.body.children));
  }

  extractNodeId(element: Element): string {
    return element.getAttribute(DragAndDropDomHelper.DND_ATTRIBUTE_NAME);
  }

  private getCoordinates(element: Element): INodeCoordinates {
    const elPos = this.getOffset(element);
    return {
      x1: elPos.left,
      x2: elPos.left + elPos.width,
      y1: elPos.top,
      y2: elPos.top + elPos.height
    };
  }
}
