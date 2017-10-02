angular.module('mainController', ['authServices'])
    .controller('mainCtrl', function ($http, $rootScope, $location, $timeout, Auth) {
        var app = this;

        $rootScope.$on('$routeChangeStart', function () {

            //IS USER LOGGED IN
            if (Auth.isLoggedIn()) {
                console.log('Success user is logged in');
                Auth.getUser().then(function (data) {
                    console.log(data.data.username);
                    app.username = data.data.username;
                });
            } else {
                console.log('Failure : user is Not logged in');
                app.username = "";
            }
        });


        //DO LOGIN
        this.doLogin = function (loginData) {
            app.loading = true;
            console.log('form submitted');
            //console.log(app.loginData);

            //FACTORY SERVICE
            Auth.login(app.loginData).then(function (data) {
                app.loading = false;
                if (data.data.success) {
                    //create success message
                    app.errorMsg = false;
                    app.successMsg = data.data.message + 'Redirecting...';
                    $timeout(function () {
                        $location.path('/about');
                        app.loginData = {};
                        app.successMsg = false;
                    }, 2000)
                } else {
                    //create Error message
                    app.successMsg = false;
                    app.errorMsg = data.data.message;
                }
            })
        }

        //DO LOGOUT
        this.logout = function () {
            Auth.logout();
            $location.path('/logout');
            $timeout(function () {
                $location.path('/');

            }, 2000);

            console.log('logging out')
        };


    })
