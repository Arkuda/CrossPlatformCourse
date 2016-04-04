angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller('profileCtrl',function($scope) {
  var userId;
  var myFirebaseRef = new Firebase("https://cropdevtestapp.firebaseio.com/");
  $scope.getUser = function(age){
    myFirebaseRef.child("Users/").on("value", function(snapshot) {
      var avalibleAges;
      if(age != '' || age != undefined){
      for (var i = 0; i < snapshot.val().length; i++) {
        avalibleAges += " " + snapshot.val()[i].age;

          if(snapshot.val()[i].age == age.toString())
          {
            userId = i;
            $scope.user = snapshot.val()[i];
            console.log($scope.user);
            $scope.$apply();
          }
      }
      }
      if( $scope.user == undefined)
      {
        alert('Слушай, с таким возрастом нет. Но есть с таким:' + avalibleAges);
      }
    });
  }
  $scope.setAge = function(needAge){
      if(userId == undefined){
        alert('Set user first');
      }
      else {
        myFirebaseRef.child('Users/' + userId + '/age').set(needAge);
      }
  }


})

.controller('PlaylistsCtrl', function($scope) {
  var myFirebaseRef = new Firebase("https://cropdevtestapp.firebaseio.com/");

  myFirebaseRef.child("/").on("value", function(snapshot) {
    $scope.playlists = snapshot.val();  // Alerts "San Francisco"
    $scope.$apply();
  });

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
  var playlistId = $stateParams.playlistId;
});
