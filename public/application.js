var mainAppModuleName = 'attaphila';

var mainAppModule = angular.module(mainAppModuleName, ['ngResource', 'ngRoute', 'angularFileUpload', 'users', 'example', 'posts']);

mainAppModule.config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

mainAppModule.config(function($sceDelegateProvider) {
   $sceDelegateProvider.resourceUrlWhitelist([
     'self',
     '*://www.youtube.com/**'
   ]);
 });

if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainAppModuleName]);
});

/* Stick title bar to top - not necessary if no hero element

$(window).scroll(function () {
	var scrollTop = $(window).scrollTop();
    var top = $('.navbar').offset().top;
    var bottom = 450;

    if (scrollTop > top) {
        //when the header reaches the top of the window change position to fixed
        $('.navbar').css('position', 'fixed');
        $('.navbar').css('top', 0);
    }

    if (scrollTop < bottom) {
    	$('.navbar').css('position', 'absolute');
    	$('.navbar').css('top', 450);
    }

});

*/