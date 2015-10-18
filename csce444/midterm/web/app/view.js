'use strict';

angular.module('myApp.view', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/:test', {
            controller: 'ViewCtrl'
        });
    }])

    .controller('ViewCtrl', ['$scope', '$routeParams', '$location', '$http', '$filter', '$rootScope', function ($scope, $routeParams, $location, $http, $filter, $rootScope) {


        $rootScope.$on('$locationChangeSuccess', function(event){
            $http.get('content.json').then(function(res) {

                var requested = $location.path().replace('/','');
                var single = $filter('filter')(res.data, function (d) {return d.id == requested;})[0];
                $scope.all = res.data;
                console.log(single);
                $scope.data = single;
                console.log($scope.data);
            });
        });


    }]);