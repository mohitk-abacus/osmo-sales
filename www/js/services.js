
 angular.module('starter.services', [])

  .service('LoginService', function($q, $http) {

    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http.post(server_url+"/get_telecaller.php", {

             'username':name,
             'password':pw })

                .then(function (response) {
                    if (response.data.error.code === "000") {
                        console.log("User login successful: " + JSON.stringify(response.data));
                        deferred.resolve(response.data);
                    } else {
                        console.log("User login failed: " + JSON.stringify(response.data.error));
                        deferred.reject(response.data);
                    }
                }, function (error) {
                    console.log("Server Error on login: " + JSON.stringify(error));
                    deferred.reject(error);
                });

            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function (fn) {
                promise.then(null, fn);
                return promise;
            };

            return promise; 
        },
        sqliteloginUser: function(id) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http.post(server_url+"/get_telecaller.php", {

             'telecaller_id':id})

                .then(function (response) {
                    if (response.data.error.code === "000") {
                        console.log("User login successful: " + JSON.stringify(response.data));
                        deferred.resolve(response.data);
                    } else {
                        console.log("User login failed: " + JSON.stringify(response.data.error));
                        deferred.reject(response.data);
                    }
                }, function (error) {
                    console.log("Server Error on login: " + JSON.stringify(error));
                    deferred.reject(error);
                });

            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function (fn) {
                promise.then(null, fn);
                return promise;
            };

            return promise; 
        }
    }
  })


  .service('DashService', function($q, $http) {

    
  })

   
 