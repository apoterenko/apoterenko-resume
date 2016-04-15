AJS.$(document).ready(function () {
	var id, currentId = /current=([0-9]+)/.exec(window.location.href), wh = AJS.$(window).height();
	if (currentId && currentId.length > 1) {
		id = currentId[1];
		AJS.$('#wrapper-id-' + id).css({'background-color': '#d1f9e1'});
		AJS.$.scrollTo('#issue-id-' + id, 0, {offset: -Math.round(wh/2)});
	}
});