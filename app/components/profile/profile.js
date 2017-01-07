angular.module('PokemonApp.profile', ['ngRoute', 'ngAnimate'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/profile', {
	    templateUrl: 'app/components/profile/profile.html',
	    controller: 'ProfileController'
		});
	}])
	.controller("ProfileController", ['$scope', '$log', '$location', 'UserService', '$cacheFactory',
	 function($scope, $log, $location, UserService, $cacheFactory) {
		$log.debug('Profile controller initialized');
		var userData = UserService.getUserdata();
		$scope.username = userData.username;
		$scope.worldUsers = [];
		$scope.Friends = userData.friends;
		$scope.myScore = userData.score;
		$scope.myRank = userData.rank;
		$scope.canEdit = false;
		$scope.toggleEdit = function() {
			$scope.canEdit = !$scope.canEdit;
		}
		$scope.goToGamePage = function() {
			$location.path('/game');
		}
		$scope.addFriend = function(username, friendUsername, friendScore) {
			if(username === friendUsername) {
				return;
			}
			for(var i=0;i<$scope.Friends.length;i++) {
				if($scope.Friends[i].username == friendUsername) {
					return;
				}
			}
			$scope.Friends.push({username: friendUsername, score: friendScore});
			UserService.addFriend(username, friendUsername, friendScore);
		}
		$scope.removeFriend = function(username, friendUsername) {
			for(var i=0;i<$scope.Friends.length;i++) {
				if($scope.Friends[i].username == friendUsername) {
					$scope.Friends.splice(i,1);
					UserService.removeFriend(username, friendUsername);
					return;
				}
			}
		}
		$scope.logout = function() {
			$location.path('/login');
		}
		$scope.forceRefresh = function() {
			if(worldDataCache.get('http://localhost:9000/fetchworld')) {
				worldDataCache.remove('http://localhost:9000/fetchworld')
			}
			UserService.fetchWorldData()
				.then(function(data) {
					$scope.worldUsers = data.users;
				}, function(error) {
					$log.error("No users found");
				})
		}
		var worldDataCache = $cacheFactory.get('$http');
		if(worldDataCache.get('http://localhost:9000/fetchworld')) {
			var cachedData = JSON.parse(worldDataCache.get('http://localhost:9000/fetchworld')[1]);
			$scope.worldUsers = cachedData.users;
			$log.info("Cached Data");
		}
		else {
			$log.info("Fetched Data");
			UserService.fetchWorldData()
				.then(function(data) {
					$scope.worldUsers = data.users;
				}, function(error) {
					$log.error("No users found");
				})
		}
	}])