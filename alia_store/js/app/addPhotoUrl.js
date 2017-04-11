var APP = (function(app){

	app.photoUrl = app.photoUrl || {};

	app.photoUrl.lastAdded = null;

	jQuery('.item_add')
		.click(function(){
			APP.photoUrl.lastAdded = jQuery(this)
										.closest('.simpleCart_shelfItem')
										.find('.product__photo')
											.data('src');
		});

	return app;
})(APP || {});