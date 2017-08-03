
   var db = null;
   angular.module('starter.controllers', ["ionic", "ion-datetime-picker"])

  .controller('LoginCtrl', function($scope, $rootScope, LoginService, $ionicPopup, $ionicLoading, $state, $cordovaSQLite, $timeout) {

      $scope.data = {};

      $scope.login = function () {

        $ionicLoading.show({
              template: '<span class="icon spin ion-loading-d"></span> Loading...'
        });

        LoginService.loginUser($scope.data.username, $scope.data.password)
        .then(function (result) {

            var query = "INSERT INTO "+dbTableName+" (telecaller_id) VALUES (?)";
            $cordovaSQLite.execute(db, query, [result.userData.id]).then(function(resultData) {
               telecaller_id = result.userData.id;
               dbVersion = result.userData.app_upgrade_version;
               $rootScope.loginData.on_duty = result.userData.on_duty;
               $timeout(function () { $ionicLoading.hide(); }, 800);
               $state.go('tab.dash');
            }, function (err) {
               $ionicLoading.hide();
               console.error(err);
            });
        }, function (resultData) {
             $ionicLoading.hide();
             var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
     };
  })


  .controller('DashCtrl', function($scope, $rootScope, DashService, $state, $ionicPopup, $ionicLoading, $timeout,$ionicPlatform, $window,$cordovaAppVersion, $cordovaToast) { 

      /*$cordovaAppVersion.getVersionNumber()
        .then(function (version) {

              if(!appVersion) {
                appVersion = version;
                
                if(dbVersion!==appVersion)
                {
                    versionerr(dbVersion,appVersion);
                    $ionicPlatform.registerBackButtonAction(function(e) {
                        //This will restrict the user to close the popup by pressing back key
                         e.preventDefault();
                    },401);
                };
              }
      }); 

     versionerr = function(newv,oldv) {

      var myPopup = $ionicPopup.show({
        title: "Update Available",
        template: "A newer version("+newv+") of this app is available for download. Please update it from PlayStore ! ",
        subTitle: 'current version : '+oldv,
        buttons: [{ 
            text: 'Exit',
            type: 'button-dark',
            onTap: function(e) {     
                ionic.Platform.exitApp();
            }
        }, {
            text: '<b>Update</b>',
            type: 'button-positive',
            onTap: function(e) {

              $window.open("https://play.google.com/store/apps/details?id=com.osmo.telecaller", '_system');
              ionic.Platform.exitApp();
            }  
          }]
        });
      }
   */
  })


  