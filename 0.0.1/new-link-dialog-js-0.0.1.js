// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/ajMicroSync/docs/new-link-dialog-js-0.0.1 -->

(function($, AJ) {

	$.initNewLinkDialog = function(elem, client) {
		
		var nld =  {};
		
		nld.dialog = null;
		
		nld.show = function() {
			
			$(".insertLinkDialog-title", elem).val("");
			
			nld.dialog.show();
		};
		
		nld.hide = function() {
			
			nld.dialog.hide();
		};
		
		// init UI
		(function() {
			nld.dialog = $.wrapDialog($('.insertLinkDialog', elem));
			
			
			$(".insertLinkDialog-cancel", elem).click(function(evt) {
				evt.preventDefault();
				
				nld.dialog.hide();
			});
			
		})();
		
		return {
			show : nld.show,
			hide : nld.hide,
			setModal : nld.dialog.setModal
		};

	};
})(jQuery, AJ);

// <!-- one.end -->
