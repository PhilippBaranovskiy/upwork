var APP = (function(app){

	app.afterAdd = app.afterAdd || {};

	app.afterAdd.el = jQuery('.alert--add-to-cart');

	app.afterAdd.show = function(){
		this.el.addClass('in');
		setTimeout(function(){
			APP.afterAdd.el.removeClass('in');
		}, 2500);
	};

	return app;
})(APP || {});