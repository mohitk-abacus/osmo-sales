// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, LoginService, $cordovaSQLite, $ionicPopup, $ionicLoading, $state, $ionicHistory, $timeout) {
  $ionicPlatform.ready(function() {

     $rootScope.loginData = {};
     $ionicPlatform.registerBackButtonAction(function (event) {
        if ($ionicHistory.currentStateName() === 'login' || $ionicHistory.currentStateName() === 'tab.dash'){
          event.preventDefault();
          ionic.Platform.exitApp();
        } else {
          $ionicHistory.goBack();
        }
     }, 100);



    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    if (window.cordova) {
        db = $cordovaSQLite.openDB("my.app");
        console.log("Android");
    } else{
        db = window.openDatabase("my.app",'1','my',1024 * 1024 * 100); 
        console.log("browser");
    }
            
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS "+dbTableName+" (id integer primary key, telecaller_id int)");

    var query ="SELECT telecaller_id FROM "+dbTableName+" ORDER BY id DESC LIMIT 1";
            $cordovaSQLite.execute(db, query).then(function(res) {

              if(res.rows.length > 0) {

                $ionicLoading.show({
                 template: '<span class="icon spin ion-loading-d"></span> Loading...'
                });

                LoginService.sqliteloginUser(res.rows.item(0).telecaller_id)
                .then(function (result) {
                     telecaller_id = res.rows.item(0).telecaller_id; 
                     dbVersion = result.userData.app_upgrade_version;
                     $rootScope.loginData.on_duty = result.userData.on_duty;
                     $timeout(function () { $ionicLoading.hide(); }, 800);
                     $state.go('tab.dash');
                }, function (result) {
                   $ionicLoading.hide();
                   var alertPopup = $ionicPopup.alert({
                   title: 'Login failed!',
                   template: 'Please check your credentials!'
                  });
                });

              } else {
                $state.go('login');
              }
            }, function (err) {
               console.error(err);
            });
    });
 })


 .config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
   })


  .state('tab', {
    url: "/tab",
    cache: false,
    abstract: true,
    templateUrl: "templates/tabs.html",
    controller: 'DashCtrl'
   })



  .state('tab.dash', {
    url: '/dash',
    cache: false,
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  // setup an abstract state for the tabs directive

  // Each tab has its own nav history stack:
  // if none of the above states are matched, use this as the fallback
     // $urlRouterProvider.otherwise('/login');
  })

 .config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
  });