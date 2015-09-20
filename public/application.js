var mainAppModuleName = 'attaphila';

var mainAppModule = angular.module(mainAppModuleName, ['example']);

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainAppModuleName]);
});