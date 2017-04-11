var APP = (function(app){

	app.cart = app.cart || {};

	app.cart.decrement = function(id){
		var item = simpleCart.find(id);
		if ( !!item.length && item.length !== undefined ) { return; }
		item.decrement();
		simpleCart.update();
	};
	app.cart.increment = function(id){
		var item = simpleCart.find(id);
		if ( !!item.length && item.length !== undefined ) { return; }
		item.increment();
		simpleCart.update();
	};

	app.cart.getAll = function(){
		var items = [];

		simpleCart.each(function(item){
			items.push({
				id: item.id(),
				name: item.get('name'),
				size: item.get('size'),
				price: item.get('price'),
				quantity: item.get('quantity'),
				amount: item.get('total'),
				photo: item.get('photo')
			});
		});

		return items;
	};

	app.cart.display = function(){

		if ( APP.pageType !== 'cart' ) { return; }

		var templateEL = jQuery('#cart-template');
		var templateHTML = templateEL.html();
		var template = Handlebars.compile( templateHTML );
		var table = jQuery('.shopping-cart__table');

		var html = template( { items: this.getAll() } );
		table
			.find('tbody')
			.html( html );
	};

	hyperform(window);

	jQuery('.shopping-cart__checkout-form')
		.submit(function(e){
			e.preventDefault();
			var order = {};

			[].forEach.call( jQuery(this).serializeArray(), function(obj){
				order[obj.name] = obj.value;
			} );

			try {
				order['items'] = JSON.stringify( APP.cart.getAll() );
			} catch (err) {
				console.log(err);
			}
			order['total'] = simpleCart.total();

			jQuery.post(this.action, order)
				.done(function(data) {
					APP.cart.showPopup(data);
					simpleCart.empty();
				})
				.fail(function(data) {
					APP.cart.showPopup(data);
				});
				// .always(function() {});
		});

	app.cart.delivery = jQuery('#delivery-address');
	app.cart.deliveryInput = jQuery('#delivery-address-input');

	app.cart.deliveryInput.keyup(function(){
		app.cart.delivery.text( this.value );
	});

	app.cart.showPopup = function(obj){

		try {
			obj = JSON.parse( obj );
			status = obj.status;
		} catch (err) {
			console.error(err);
		}

		obj.status = obj.status === 'error' ? false : true;

		var templateHTML = jQuery('#popup-template').html();
		var template = Handlebars.compile( templateHTML );
		var html = template( obj );
		
		jQuery('.modal')
			.filter('#order-info')
				.remove();

		jQuery('.shopping-cart')
			.append( html );

		jQuery('#order-info').modal();
	};

	jQuery('.show-form')
		.click(function(){
			jQuery('.shopping-cart__checkout-form')
				.addClass('active');

			jQuery('.show-form').remove();

			jQuery(window).scrollTop(9999);
		});

	simpleCart
		.bind('ready', function(){
			APP.cart.display();
			// console.log( "simpleCart total: " + simpleCart.toCurrency( simpleCart.total() ) ); 
		})
		.bind('update' , function(){
			APP.cart.display();
			jQuery('#shopping-cart__total').text(simpleCart.total());
		})
		.bind('beforeAdd', function( item ){
			if ( item.get('size') ) {
				item.set('photo', APP.photoUrl.lastAdded);
				return true;
			} else {
				APP.askSize.ask( item );
				return false;
			}
		})
		.bind('afterAdd', function(){
			APP.afterAdd.show();
		});

	return app;
})(APP || {});