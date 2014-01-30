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



/*


var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
  console.log("zone!---------------------", zone);
  console.log("     ");

  var cxdClient = new CovalentXDClient();
  cxdClient["CUSTOM"] = "DATA";
  

  var myZone = (function() {
    return {

      _currentCount: 0,
      _myClient: cxdClient,
      _ogSend: cxdClient._send,
      testFunction: function() {
        alert("TEST");
      },
      run: function() {
        console.log("my client", this);
        
        this._myClient["TEST"] = "TEST2!";
        return zone.run.apply(this, arguments);
      },
      onZoneEnter: function() {
        console.error("entering");
      }
    };
  }());
  
  console.log("myZone", myZone);

  zone.fork(myZone).run(function() {
  })
  
  console.log("end", cxdClient);
});


*/