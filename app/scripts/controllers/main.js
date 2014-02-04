'use strict';

angular.module('cardFlipperApp', ["angular-underscore"])
	.controller('MainCtrl', function($scope, $timeout) {
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		$scope.admins = [{
			name: "Thomas",
			checked: false
		}, {
			name: "Nate",
			checked: false
		}, {
			name: "Bob",
			checked: false
		}];

		$scope.users = [{
			name: "Alex",
			checked: false,
		},{
			name: "Michael",
			checked: false,
		},{
			name: "Erik",
			checked: true,
		},{
			name: "Dave",
			checked: false,
		},{
			name: "Steve",
			checked: false,
		}]

		var filterSelected = function() {
			$scope.currentSelected = _.filter($scope.users.concat($scope.admins), function(current) {
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
			$scope.$watch("admins", usersChangeZone.bind(function(before, after) {
				if (before[0].checked == true) {
					before[0].checked = false; //never let first be checked!
				}
			}), true);

			$scope.$watch("users", usersChangeZone.bind(function(before, after) {
				//nothing here for users
			}), true);

			$scope.addUser = function(userName) {
				$scope.users.push({
					name: userName,
					checked: Math.random() > 0.5
				});
			}

			$scope.addAdmin = function(userName) {
				$scope.admins.push({
					name: userName,
					checked: true
				});
			}
		});
	});