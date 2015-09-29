angular.module('posts').controller('PostsController',
	['$scope', '$routeParams', '$location', 'Authentication', 'Posts',
		function($scope, $routeParams, $location, Authentication, Posts) {

			$scope.Authentication = Authentication;

			$scope.create = function() {

				var post = new Posts({
					title: this.title,
					content: this.content
				});

				post.$save(function(res) {
					$location.path('posts/' + res._id);
				}, function(errRes) {
					$scope.error = errRes.data.message;
				});

			};

		}
	]
);