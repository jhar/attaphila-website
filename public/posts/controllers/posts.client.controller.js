angular.module('posts').controller('PostsController',
	['$scope', '$routeParams', '$location', 'Authentication', 'FileUploader', 'Posts',
		function($scope, $routeParams, $location, Authentication, FileUploader, Posts) {

			$scope.authentication = Authentication;
			$scope.uploader = new FileUploader({
				url: "uploads/"
			});

			$scope.create = function() {

				var post = new Posts({
					title: this.title,
					category: this.category,
					content: this.content
				});

				post.$save(function(res) {
					$location.path('posts/' + res.category + "/" + res._id);
				}, function(errRes) {
					$scope.error = errRes.data.message;
				});

			};

			$scope.find = function() {
				$scope.posts = Posts.query();
			};

			$scope.findOne = function() {
				$scope.post = Posts.get({
					category: $routeParams.category,
					postId: $routeParams.postId
				});
			};

			$scope.findCategory = function() {
				$scope.posts = Posts.query({
					category: $routeParams.category
				});
			};

			$scope.update = function() {
				$scope.post.$update(function() {
					$location.path('posts/' + $scope.post.category + "/" + $scope.post._id);
				}, function(errRes) {
					$scope.error = errRes.data.message;
				});
			};

			$scope.delete = function(post) {
				if (post) {
					post.$remove(function() {
						for (var i in $scope.posts) {
							if ($scope.posts[i] === post) {
								$scope.posts.splice(i, 1);
							}
						}
					});
				} else {
					$scope.post.$remove(function() {
						$location.path('posts');
					});
				}
			};

		}
	]
);