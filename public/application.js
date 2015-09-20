var mainAppModuleName = 'attaphila';

var mainAppModule = angular.module(mainAppModuleName, []);

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainAppModuleName]);
});