var APP = (function(app){

	app.askSize = app.askSize || {};

	app.askSize.show = function(){
		this.el.addClass('in');
	};
	app.askSize.close = function(){
		this.el
			.removeClass('in')
			[0].reset();
		this.currentItem = null;
		this.currentSize = null;
	};
	app.askSize.ask = function( item ){
		this.currentSize = null;
		this.currentItem = item;
		this.show();
	};

	app.askSize.el = jQuery('.size-chooser');
	app.askSize.el.submit(function(e){
		e.preventDefault();

		APP.askSize.currentItem.set('size', this.elements.size.value);
		simpleCart.add({
			name: APP.askSize.currentItem.get('name'),
			price: APP.askSize.currentItem.get('price'),
			quantity: APP.askSize.currentItem.get('quantity'),
			size: APP.askSize.currentItem.get('size')
		});

		APP.askSize.close();
	});

	return app;
})(APP || {});