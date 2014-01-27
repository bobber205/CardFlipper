'use strict';

angular.module('cardFlipperApp', ["angular-underscore"])
	.controller('MainCtrl', function($scope, $timeout) {
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		$scope.users = [{
			name: "Thomas (not checkable, will get reset)",
			checked: false
		}, {
			name: "Nate",
			checked: false
		}, {
			name: "Dave",
			checked: true
		}];

		var filterSelected = function() {
			$scope.currentSelected = _.filter($scope.users, function(current) {
				//	console.log(current);
				return current.checked;
			})
		}

		var usersChangeZone = zone.fork({
			onZoneEnter: function() {
				console.log("Users Change Zone!");
			},
			onZoneLeave: function() {
				filterSelected();
			}
		});

		usersChangeZone.run(function() {
			$scope.$watch("users", usersChangeZone.bind(function(before, after) {
				if (before[0].checked == true) {
					before[0].checked = false; //never let first be checked!
				}
			}), true);
			$timeout(function() {
				console.log("changing first to be true");
				$scope.users[1].checked = true;
			}, 2500)
		});
	});