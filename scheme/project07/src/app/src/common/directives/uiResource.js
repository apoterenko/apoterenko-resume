import angular from 'angular';

import relationDrawing from './RelationDrawing';
import resource from './Resource';
import finishRender from './finishRender';

let uiResource = angular.module('ui.resource', [])
	.directive("relationdrawing", relationDrawing)
	.directive("resource", resource)
	.directive("onFinishRender", finishRender);

// Angular injection annotations
resource.$inject = ["$compile"];

export default uiResource;