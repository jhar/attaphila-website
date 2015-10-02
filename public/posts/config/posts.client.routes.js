angular.module('posts').config(['$routeProvider',
	function($routeProvider) {
    	$routeProvider
    	.when('/', {
    		templateUrl: 'posts/views/list-posts.client.view.html'
    	})
    	.when('/posts', {
			templateUrl: 'posts/views/list-posts.client.view.html'
		})
		.when('/posts/create', {
			templateUrl: 'posts/views/create-post.client.view.html'
		})
		.when('/posts/:postId', {
			templateUrl: 'posts/views/view-post.client.view.html'
		})
		.when('/posts/:postId/edit', {
			templateUrl: 'posts/views/edit-post.client.view.html'
		});
	}
]);