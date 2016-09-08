var app = angular.module('app', ['ngRoute','ngResource']);
app.config(function($routeProvider){
    $routeProvider
        .when('/gallery',{
            templateUrl: 'resources/views/gallery.html',
            controller: 'galleryController'
        })
        .when('/contactus',{
            templateUrl: 'resources/views/contactus.html',
            controller: 'contactusController'
        })
        .when('/default',{
            templateUrl: 'resources/views/default.html',
            controller: 'contactusController'
        })
        .otherwise(
            { redirectTo: '/default'}
        );
});

