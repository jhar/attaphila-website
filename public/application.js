var mainAppModuleName = 'attaphila';

var mainAppModule = angular.module(mainAppModuleName, ['ngResource', 'ngRoute', 'users', 'example']);

mainAppModule.config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainAppModuleName]);
});