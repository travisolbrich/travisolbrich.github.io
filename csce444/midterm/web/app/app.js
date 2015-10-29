'use strict';

// Declare app level module which depends on views, and components

var content;

angular.module('myApp', [
    'ngRoute',
    'ngSanitize',
    'myApp.view',
    'ui.bootstrap'
]);

angular.module('myApp.view', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/:test', {
            controller: 'ViewCtrl'
        });

        $routeProvider.when('/:test/:saturation', {
            controller: 'ViewCtrl'
        });
    }])

    .controller('ViewCtrl', ['$scope', '$routeParams', '$location', '$http', '$filter', '$rootScope', function ($scope, $routeParams, $location, $http, $filter, $rootScope) {


        $rootScope.$on('$locationChangeSuccess', function (event) {
            $http.get('content.json').then(function (res) {
                content = res.data;

                var requested = $location.path().replace('/', '').split('/')[0];
                var sat = $location.path().replace('/', '').split('/')[1];

                var single = $filter('filter')(res.data, function (d) {
                    return d.id == requested;
                })[0];

                $scope.all = res.data;
                $scope.data = single;
                if(sat == 'full') {
                    $scope.sat = "-bg-full";
                } else {
                    $scope.sat = "-bg";
                }
            });
        });


    }]);
