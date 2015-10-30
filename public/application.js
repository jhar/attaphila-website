var mainAppModuleName = 'attaphila';

var mainAppModule = angular.module(mainAppModuleName, ['ngResource', 'ngRoute', 'angularFileUpload', 'users', 'posts']);

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