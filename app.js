var app = angular.module("ToDo", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "index.html",
            controller: "MainController"
        })
        .when("/signup", {
            templateUrl: "views/signup.html",
            controller: "SignupController"
        })
        .when("/login", {
            templateUrl: "views/login.html",
            controller: "LoginController"
        })
        .when("/todo", {
            templateUrl: "views/todo.html",
            controller: "TodoController",
        })
        .otherwise({
            redirectTo: "/"
        });
});

app.controller("MainController", function ($scope, $location, StorageService) {
    var session = StorageService.getSession();
    $scope.name = StorageService.getName();

    if (session) {
        $location.path("/todo");
    } else {
        $location.path("/login");
    }
});