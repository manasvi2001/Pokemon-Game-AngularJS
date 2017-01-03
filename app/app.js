var app = angular.module('PokemonApp', ['ngRoute', 'PokemonApp.login', 'PokemonApp.signup', 'PokemonApp.game', 'PokemonApp.profile']);

app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/login'});
	}])
	.service("UserService", ['$http', '$log', '$location', '$q', function($http, $log, $location, $q) {
		var userData = {
			username: "",
			score: 0,
			rank: 1,
			friends: []
		}
		var setUserdata = function(Userdata) {
			userData = Userdata;
		}
		var getUserdata = function() {
			return userData;
		}
		var signupUser = function(username, password) {
			var parameter = {
				username: username,
				password: password
			}
			$http.post('http://localhost:9000/signup', parameter)
				.success(function(data) {
					if(data.success == true) {
						$log.debug('User succesfully created');
						fetchUser(username)
							.then(function(data) {
								setUserdata({username: username, score: data.score, rank: data.rank, friends: data.friends});
								$location.path('/game');
							}, function(error) {
								setUserdata({username: username, score: 0, rank: -1, friends: []});		
								$location.path('/game');
							});
					} else {
						$log.error("User already exists");
					}
				})
				.error(function(error) {
					$log.error(JSON.stringify(error));
				})
		}
		var loginUser = function(username, password) {
			var parameter = {
				username: username,
				password: password
			}
			$http.get('http://localhost:9000/login', {params: parameter})
				.success(function(data) {
					if(data.success == true) {
						$log.debug('Login Successful');
						fetchUser(username)
							.then(function(data) {
								setUserdata({username: username, score: data.score, rank: data.rank, friends: data.friends});
								$location.path('/game');
							}, function(error) {
								setUserdata({username: username, score: 0, rank: -1, friends: []});		
								$location.path('/game');
							});
					} else {
						$log.error('Login not successful. User not found or password incorrect');
					}
				})
				.error(function(error) {
					$log.error('Login not successful. User not found or password incorrect');
				});
		}
		var fetchUser = function(username) {
			var parameter = {
				username: username
			}
			var defer = $q.defer();
			// resolve
			// reject
			// notify
			$http.get('http://localhost:9000/fetchuser', {params: parameter})
				.success(function(data) {
					if(data.success == true) {
						$log.debug('User Data fetch successful');
						setUserdata({username: username, score: data.myScore, rank: data.myRank, friends: data.myFriends});
						defer.resolve(data);
						// return the score.
					} else {
						$log.error('Error fetching data');
						defer.reject(data);
					}
				})
				.error(function(error) {
					$log.error('Error fetching data');
					defer.reject(error);
				})
			return defer.promise;
		}
		var updateScore = function(username, score) {
			var parameter = {
				username: username,
				score: score
			}
			$http.post('http://localhost:9000/updatescore', parameter)
				.success(function(data) {
					if(data.success == true) {
						$log.debug('Score Updated');
					} else {
						$log.error("Score not Updated");
					}
				})
				.error(function(error) {
					$log.error(JSON.stringify(error));
				})
		}
		var fetchWorldData = function() {
			var defer = $q.defer();
			$http.get('http://localhost:9000/fetchworld', {cache: true})
				.success(function(data) {
					if(data.success == true) {
						defer.resolve(data);
					} else {
						defer.reject(data);
					}
				})
				.error(function(error) {
					defer.reject(error);
				});
			return defer.promise;
		}
		var addFriend = function(username, friendUsername, friendScore) {
			var parameters = {
				username: username,
				friendUsername: friendUsername,
				friendScore: friendScore
			}
			$http.post('http://localhost:9000/addfriend', parameters)
				.success(function(data) {
					if(data.success == true) {
						$log.debug("Friend Added")
					} else {
						$log.error("Friend Addition failed")
					}
				})
				.error(function(error) {
					$log.error("Friend Addition failed")
				});
		}
		var removeFriend = function(username, friendUsername) {
			var parameters = {
				username: username,
				friendUsername: friendUsername
			}
			$http.post('http://localhost:9000/removefriend', parameters)
				.success(function(data) {
					if(data.success == true) {
						$log.debug("Friend Removed")
					} else {
						$log.error("Friend Revomal failed")
					}
				})
				.error(function(error) {
					$log.error("Friend Removal failed")
				});
		}
		return {
			signupUser: signupUser,
			loginUser: loginUser,
			fetchUser: fetchUser,
			updateScore: updateScore,
			setUserdata: setUserdata,
			getUserdata: getUserdata,
			fetchWorldData: fetchWorldData,
			addFriend: addFriend,
			removeFriend: removeFriend
		};
	}]);