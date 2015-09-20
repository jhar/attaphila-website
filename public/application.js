var mainAppModuleName = 'attaphila';

var mainAppModule = angular.module(mainAppModuleName, ['ngRoute', 'example']);

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainAppModuleName]);
});