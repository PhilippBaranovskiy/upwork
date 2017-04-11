var APP = (function(app){

	app.gallery = app.gallery || {};

	app.gallery.product = new Swiper('.product-gallery', {
		preloadImages: true,
		lazyLoading: true,
		updateOnImagesReady: true,
		lazyLoadingInPrevNext: true,

		nextButton: '.product-gallery__arrow--right',
		prevButton: '.product-gallery__arrow--left'
	});

	return app;
})(APP || {});