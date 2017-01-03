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
	}]);