angular.module('appRoutes', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        //$locationProvider.hashPrefix('');
        $routeProvider
            .otherwise({redirectTo: '/'})

            .when('/', {
                templateUrl: 'app/views/pages/home.html'
            })

            .when('/about', {
                templateUrl: 'app/views/pages/about.html'
            })

            .when('/profile', {
                templateUrl: 'app/views/pages/profile.html'
            })

            .when('/register', {
                templateUrl: 'app/views/pages/users/register.html',
                controller: 'regCtrl',
                controllerAs: 'register'
            })

            .when('/login', {
                templateUrl: 'app/views/pages/users/login.html'

            })
            .when('/logout', {
                templateUrl: 'app/views/pages/users/logout.html'

            })


        //$locationProvider.html5Mode({enable: true, requireBase : false})
    })

