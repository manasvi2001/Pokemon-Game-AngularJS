angular.module('PokemonApp.game', ['ngRoute', 'PokemonApp.signup'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/game', {
	    templateUrl: 'app/components/game/game.html',
	    controller: 'GameController'
		});
	}])
	.controller("GameController", ['$scope', '$log', '$location', 'UserService', function($scope, $log, $location, UserService) {
		$log.debug('Game controller initialized');
		$scope.username = UserService.getUsername();
		$scope.myScore = 0;
		UserService.fetchScore($scope.username)
			.then(function(data) {
				$scope.myScore = data.score;
			}, function(error) {
				$scope.myScore = 0;
			});
		$scope.$on('correct', function(event, difficulty) {
			//increase the score
			if(difficulty === 'easy')
				$scope.myScore += 1;
			else if(difficulty === 'medium')
				$scope.myScore += 2;
			else if(difficulty === 'hard')
				$scope.myScore += 4;
			UserService.updateScore($scope.username, $scope.myScore);
		})
		$scope.$on('wrong', function(event, difficulty) {
			//decrease the score
			if(difficulty === 'easy')
				$scope.myScore -= 0;
			else if(difficulty === 'medium')
				$scope.myScore -= 1;
			else if(difficulty === 'hard')
				$scope.myScore -= 2;
			UserService.updateScore($scope.username, $scope.myScore);
		})
		$scope.changeTab = function(difficulty) {
			// change our tab
			if(difficulty === 'easy')
			{
				document.getElementById('PokeMedium').style.display = "none";
				document.getElementById('PokeHard').style.display = "none";
				document.getElementById('PokeEasy').style.display = "block";
				document.getElementById('tabMedium').className = "";
				document.getElementById('tabHard').className = "";
				document.getElementById('tabEasy').className = "active";
			}
			else if(difficulty === 'medium')
			{
				document.getElementById('PokeEasy').style.display = "none";
				document.getElementById('PokeHard').style.display = "none";
				document.getElementById('PokeMedium').style.display = "block";
				document.getElementById('tabEasy').className = "";
				document.getElementById('tabHard').className = "";
				document.getElementById('tabMedium').className = "active";
			}
			else if(difficulty === 'hard')
			{
				document.getElementById('PokeEasy').style.display = "none";
				document.getElementById('PokeMedium').style.display = "none";
				document.getElementById('PokeHard').style.display = "block";
				document.getElementById('tabEasy').className = "";
				document.getElementById('tabMedium').className = "";
				document.getElementById('tabHard').className = "active";
			}
		}
		$scope.pokemonList = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu"];
	}])
	.controller("PokemonEasyController", ['$scope', '$log', '$timeout', function($scope, $log, $timeout) {
		var tempPokemonList = $scope.pokemonList;
		var correctAnswer = "";
		var loadNewPokemon = function() {	
			document.getElementById('easy-game-button1').style.backgroundColor="lightblue";
			document.getElementById('easy-game-button2').style.backgroundColor="lightblue";
			document.getElementById('easy-game-button3').style.backgroundColor="lightblue";
			document.getElementById('easy-game-button4').style.backgroundColor="lightblue";
			tempPokemonList = $scope.pokemonList;
			var correctPokeName = Math.floor(Math.random()*4);
			for(var i=0;i<4;i++) {
				var randomPokemon = randomPokemonFinder();
				if(i==0) {
					$scope.pokeName1 = randomPokemon.name;
				} else if(i==1) {
					$scope.pokeName2 = randomPokemon.name;
				} else if(i==2) {
					$scope.pokeName3 = randomPokemon.name;
				} else {
					$scope.pokeName4 = randomPokemon.name;
				}
				if(i==correctPokeName) {
					$scope.pokeImg = "./assets/img/"+randomPokemon.name+".png";
					correctAnswer = randomPokemon.name;
				}
				tempPokemonList.splice(randomPokemon.index,1);
			}
		}

		var randomPokemonFinder = function() {
			var pokemonListLen = tempPokemonList.length;
			var pokemonIndex = Math.floor(Math.random()*pokemonListLen);
			var pokemon = tempPokemonList[pokemonIndex];
			return {
				name: pokemon,
				index: pokemonIndex
			};
		};
		
		$scope.checkForAnswer = function(selection, index) {
			if(selection == correctAnswer) {
				document.getElementById('easy-game-button' + index).style.backgroundColor="green";
				$scope.$emit('correct', "easy");
			}
			else {
				document.getElementById('easy-game-button' + index).style.backgroundColor="red";
				$scope.$emit('wrong', "easy");
			}
			$timeout(function() {
				loadNewPokemon();
			}, 500);
		}
		loadNewPokemon();
	}])
	.directive("pokemonEasy", [function() {
		return {
			restrict: 'A',
			replace: true,
			template: '<div class="easy-game-container">\
			<div class="easy-game-image-container">\
			<img class="easy-game-image" ng-src="{{pokeImg}}">\
			</div>\
			<div class="easy-game-button-container">\
			<button id="easy-game-button1" ng-click="checkForAnswer(pokeName1, 1)">{{pokeName1}}</button>\
			<button id="easy-game-button2" ng-click="checkForAnswer(pokeName2, 2)">{{pokeName2}}</button>\
			<button id="easy-game-button3" ng-click="checkForAnswer(pokeName3, 3)">{{pokeName3}}</button>\
			<button id="easy-game-button4" ng-click="checkForAnswer(pokeName4, 4)">{{pokeName4}}</button>\
			</div>\
			</div>'
		};
	}])
	.controller("PokemonMediumController", ['$scope', '$log', function($scope, $log) {
		var pokemonListLen = $scope.pokemonList.length;
		var pokemonIndex = Math.floor(Math.random()*pokemonListLen);
		var pokemon = $scope.pokemonList[pokemonIndex];
		$log.info("The pokemon I got was :: " + pokemon);
		$scope.pokeImg = "abc";
		$scope.pokeName1 = "abc";
		$scope.pokeName2 = "abc";
		$scope.pokeName3 = "abc";
		$scope.pokeName4 = "abc";
	}])
	.directive("pokemonMedium", [function() {
		return {
			restrict: 'A',
			replace: true,
			template: '<div>Medium</div>'
		};
	}])
	.controller("PokemonHardController", ['$scope', '$log', function($scope, $log) {
		$scope.getNewPokemon = function() {
			var pokemonListLen = $scope.pokemonList.length;
			var pokemonIndex = Math.floor(Math.random()*pokemonListLen);
			$scope.pokemon = $scope.pokemonList[pokemonIndex];
			$log.info("The pokemon I got was :: " + $scope.pokemon);
		}
	}])
	.directive("pokemonHard", ['$compile', '$timeout', function($compile, $timeout) {
		return {
			restrict: 'A',
			replace: true,
			template: '<div class="hard-game-container">\
			<div class="hard-game-image-container">\
			<img class="hard-game-image" ng-src="{{pokeImg}}">\
			</div>\
			<div class="hard-game-input-container">\
			<input class="hard-game-input" ng-model="pokeAnswer" placeholder="Input you answer" ng-keydown="$event.which == 13 && checkForAnswer(pokeAnswer)">\
			</div>\
			</div>',
			link: function(scope, iElement, iAttr, controller) {
				var result;
				var newPokemon = function() {
					scope.getNewPokemon();
					scope.pokeImg = "./assets/img/"+scope.pokemon+".png";
				}
				var removeCorrect = function() {
					var elementToBeRemoved = angular.element(document.getElementById('hard-result'));
					elementToBeRemoved.remove();
				}
				scope.checkForAnswer = function(answer) {
					if(answer === scope.pokemon) {
						var result = angular.element('<span style="color: green;" id="hard-result">').text("Correct")
						$compile(result)(scope);
						iElement.append(result);
						scope.$emit('correct', "hard");
					}
					else {
						var result = angular.element('<span style="color: red;" id="hard-result">').text("Wrong")
						$compile(result)(scope);
						iElement.append(result);
						scope.$emit('wrong', "hard");
					}
					$timeout(function() {
						scope.pokeAnswer="";
						removeCorrect();
						newPokemon();
					}, 700);
				}
				newPokemon();
			}
		};
	}]);