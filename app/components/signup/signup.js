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
				$log.debug('User succesfully created');
				$location.path('/game');
			}
			else {
				$log.error('User creation failed. Password mismatch');
				alert('Password Mismatch. Try again!');
			}
		}
	}])
	.service("UserService", [function() {
		var user = []; // [{username: pikachu, password: pikapi},{username: bulbasaur, password: bulba}]
		var signupUser = function(username, password) {
			user.push({username: username, password: password});
		}
		var loginUser = function(username, password) {
			for(var i=0; i<user.length; i++) {
				if(username === user[i].username) {
					if(password === user[i].password) {
						return true;
					}
				}
			}
			return false;
		}
		return {
			signupUser: signupUser,
			loginUser: loginUser
		};
	}]);