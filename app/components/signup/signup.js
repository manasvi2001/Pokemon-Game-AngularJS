angular.module('PokemonApp.signup', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/signup', {
	    templateUrl: 'app/components/signup/signup.html',
	    controller: 'SignupController'
		});
	}])
	.controller("SignupController", ['$scope', '$log', '$location', 'UserService', function($scope, $log, $location, UserService) {
		$log.debug('Signup controller initialized');
		$scope.input = {
			username: '',
			password: '',
			confirmPassword: ''
		}
		$scope.signup = function() {
			if($scope.input.password === $scope.input.confirmPassword) {
				UserService.signupUser($scope.input.username, $scope.input.password);
			}
			else {
				$log.error('User creation failed. Password mismatch');
			}
		}
	}])
	.service("UserService", ['$http', '$log', '$location', '$q', function($http, $log, $location, $q) {
		var username = "";
		var setUsername = function(Username) {
			username = Username;
		}
		var getUsername = function() {
			return username;
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
						setUsername(username);
						$location.path('/game');
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
						setUsername(username);
						$location.path('/game');
					} else {
						$log.error('Login not successful. User not found or password incorrect');
					}
				})
				.error(function(error) {
					$log.error('Login not successful. User not found or password incorrect');
				});
		}
		var fetchScore = function(username) {
			var parameter = {
				username: username
			}
			var defer = $q.defer();
			// resolve
			// reject
			// notify
			$http.get('http://localhost:9000/fetchscore', {params: parameter})
				.success(function(data) {
					if(data.success == true) {
						$log.debug('Score fetch successful');
						defer.resolve(data);
						// return the score.
					} else {
						$log.error('Login not successful. User not found or password incorrect');
						defer.reject(data);
					}
				})
				.error(function(error) {
					$log.error('Login not successful. User not found or password incorrect');
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
		return {
			signupUser: signupUser,
			loginUser: loginUser,
			fetchScore: fetchScore,
			updateScore: updateScore,
			setUsername: setUsername,
			getUsername: getUsername
		};
	}]);