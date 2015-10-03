angular.module('posts').factory('Posts', ['$resource',
	function($resource) {
		return $resource('api/posts/:category/:postId', {
			category: '@category',
			postId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);