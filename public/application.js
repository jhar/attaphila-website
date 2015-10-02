var mainAppModuleName = 'attaphila';

var mainAppModule = angular.module(mainAppModuleName, ['ngResource', 'ngRoute', 'users', 'example', 'posts']);

mainAppModule.config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainAppModuleName]);
});

// Stick title bar to top

$(window).scroll(function () {
	var scrollTop = $(window).scrollTop();
    var top = $('.navigation').offset().top;
    var bottom = 450;
    console.log(scrollTop + " " + top);

    if (scrollTop > top) {
    	console.log("here");
        //when the header reaches the top of the window change position to fixed
        $('.navigation').css('position', 'fixed');
        $('.navigation').css('top', 0);
    }

    if (scrollTop < bottom) {
    	$('.navigation').css('position', 'absolute');
    	$('.navigation').css('top', 450);
    }

});