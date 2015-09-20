var mainAppModuleName = 'attaphila';

var mainAppModule = angular.module(mainAppModuleName, ['ngRoute', 'example']);

mainAppModule.config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainAppModuleName]);
});