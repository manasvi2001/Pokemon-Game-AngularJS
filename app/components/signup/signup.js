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
	.service("UserService", ['$http', '$log', '$location', function($http, $log, $location) {
		var signupUser = function(username, password) {
			var parameter = {
				username: username,
				password: password
			}
			$http.post('http://localhost:9000/signup', parameter)
				.success(function(data) {
					if(data.success == true) {
						$log.debug('User succesfully created');
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
						$location.path('/game');
					} else {
						$log.error('Login not successful. User not found or password incorrect');
					}
				})
				.error(function(error) {
					$log.error('Login not successful. User not found or password incorrect');
				})
		}
		var fetchScore = function(username) {
			var parameter = {
				username: username
			}
			$http.get('http://localhost:9000/fetchscore', {params: parameter})
				.success(function(data) {
					if(data.success == true) {
						$log.debug('Score fetch successful');
						// return the score.
					} else {
						$log.error('Login not successful. User not found or password incorrect');
					}
				})
				.error(function(error) {
					$log.error('Login not successful. User not found or password incorrect');
				})
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
			loginUser: loginUser
		};
	}]);