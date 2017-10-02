angular.module('userController', ['userServices'])
    .controller('regCtrl', function ($http, $location, $timeout, User) {
        var app = this;
        /* console.log('this');
         console.log(app);*/

        //CREATE USER
        this.regUser = function (regData) {
            app.loading = true;
            console.log('form submitted');
            //console.log(app.regData);

            //FACTORY SERVICE
            User.create(app.regData).then(function (data) {
                app.loading = false;
                if (data.data.success) {
                    //create success message
                    app.errorMsg = false;
                    app.successMsg = data.data.message + 'Redirecting...';
                    /* $timeout(function () {
                     $location.path('/');
                     }, 2000)*/
                } else {
                    //create Error message
                    app.successMsg = false;
                    app.errorMsg = data.data.message;
                }
            })
        }
    })