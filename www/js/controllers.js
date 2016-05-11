angular.module('starter.controllers', [])

  .controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $window) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login and tutorial creator modal
    $scope.loginData  = {};
    $scope.editData   = {};
    $scope.createData = {};
    $scope.signupData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalLogin = modal;
    });

    // Create the edit modal that will be used later
    $ionicModal.fromTemplateUrl('templates/edit_user.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalEdit = modal;
    });

    // Create the tutorial creator modal that we will use later
    $ionicModal.fromTemplateUrl('templates/create_tutorial.html', {
      scope: $scope
    }).then(function(modal){
      $scope.modalCreate = modal;
    });

    // Create the sign up modal that we will use later
    $ionicModal.fromTemplateUrl('templates/sign_up.html', {
      scope: $scope
    }).then(function(modal){
      $scope.modalSignup = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modalLogin.hide();
    };

    // Triggered in the edit modal to close it
    $scope.closeEdit = function() {
      $scope.modalEdit.hide();
    };

    // Triggered in the tutorial creator modal to close it
    $scope.closeCreate = function() {
      $scope.modalCreate.hide();
    };

    // Triggered in the sign up modal to close it
    $scope.closeSignup = function() {
      $scope.modalSignup.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modalLogin.show();
    };

    // Open the edit modal
    $scope.edit = function(value, title, id) {
      $scope.editor = {value:value, title:title, id:id};
      $scope.modalEdit.show();
    };

    // Open the tutorial creator modal
    $scope.create = function() {
      //$http.get('http://163.5.245.92/api/categories').then(function(results) {
        //$scope.categories = results.data;
        //$scope.modalCreate.show();
      //}, function(err) {
       // console.log('ERR', err);
      //});
    };

    // Open the login modal
    $scope.signup = function() {
      $scope.modalSignup.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $scope.closeLogin();
    };

    // Perform the edit action when the user submits the edit form
    $scope.doEdit = function() {
      console.log('title : ', $scope.editor.title);
      console.log('value : ', $scope.editor.value);
      console.log('userId : ', $scope.editor.id);
      console.log('Doing edit : ', $scope.editData);
      //

      // Simulate a edit delay. Remove this and replace with the new infos
      $timeout(function() {
        $scope.closeEdit();
      }, 1000);
    };

    // Perform the login action when the user submits the login form
    $scope.doCreate = function() {
      // console.log('Doing create', $scope.createData);
      //
      // $scope.createData.author = "56e969c621c1c3050c00f94f";
      // $scope.createData.status = 1;
      // console.log('Doing create', $scope.createData);
      // $http({
      //   method: 'POST',
      //   url: 'http://163.5.245.92/api/tutorials/new',
      //   data: JSON.stringify($scope.createData),
      //   headers: {
      //     'Content-Type': 'application/json; charset=UTF-8'
      //   }
      // }).success(function(result) {
      //   console.log('after creation', result);
      //
      // }).error(function (err) {
      //   console.log('POST ERROR',err);
      // });
      // // Simulate a login delay. Remove this and replace with your login
      // // code if using a login system
      // $scope.closeCreate();
    };

    // Perform the login action when the user submits the login form
    $scope.doSignup = function() {
      // console.log('Doing Sign up', $scope.signupData);
      //
      // $http({
      //   method: 'POST',
      //   url: 'http://163.5.245.92/api/users/signup',
      //   data: JSON.stringify($scope.signupData),
      //   headers: {
      //     'Content-Type': 'application/json; charset=UTF-8'
      //   }
      // }).success(function () {
      //
      // }).error(function (err) {
      //   console.log(err);
      // });
      // // Simulate a login delay. Remove this and replace with your login
      // // code if using a login system
      // $timeout(function() {
      //   $scope.closeSignup();
      // }, 1000);
    };
  })

  .controller('TutorialsCtrl', function($scope, $http) {

    // $http.get('http://163.5.245.92/api/tutorials').then(function(results) {
    //   console.log(results);
    //   $scope.tutorials = results.data;
    // }, function(err) {
    //   console.error('ERR', err);
    // });

    // EN COURS (ne fonctionne pas)
    // $scope.doRefresh = function() {
    //   $http.get('http://163.5.245.92/api/tutorials').then(function(results) {
    //     console.log(results);
    //     $scope.tutorials = results.data;
    //   }, function(err) {
    //     console.error('ERR', err);
    //   }).finally(function(){
    //     $scope.$broadcast('scroll.refreshComplete');
    //   });
    // };
    // $scope.delete = function(id){
    //   $http.delete('http://163.5.245.92/api/tutorials/' + id).success(function(){
    //     console.log('delete of tuto ', id);
    //     $scope.doRefresh();
    //   }).error(function(){
    //       console.log('Error de delete');
    //     }
    //   );
    //
    // }
  })

  .controller('ProfileCtrl', function($scope){

    $scope.user = {
      name: "Anatole Musclé",
      email : "aze@hotmail.fr",
      password : "azeaeae",
      sex : 0,
      birthday : new Date(),
      signupDate: new Date(),
      lastOperation: new Date()
    };

    $scope.getSex = function(){ return ($scope.user.sex == 0)? 'Male': 'Female'; };
  })

  .controller('TutorialCreateCtrl', function($scope) {

    $scope.tutorial = {};

  })

  .controller('EditUserCtrl', function($scope) {

    $scope.field = {};

  });


