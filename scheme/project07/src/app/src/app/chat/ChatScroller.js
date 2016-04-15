export class ChatScroller {

	static scrollDown() {
		let scroller = $("#imigo-chat-scroller");
		scroller.scrollTop(scroller.prop("scrollHeight"));
		scroller.perfectScrollbar('update');

		console.log('ChatScroller: scrollDown');
	}

	static bind($window) {
		console.log('ChatScroller: bind to window');

		angular.element($window).bind('resize', ChatScroller.scrollDown);
	}

	static unbind($window) {
		console.log('ChatScroller: unbind from window');

		angular.element($window).unbind('resize', ChatScroller.scrollDown);
	}
}