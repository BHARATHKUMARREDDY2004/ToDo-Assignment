var app = angular.module("ToDo", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            template: "<div></div>",
            controller: "HomeController"
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


app.controller("HomeController", function ($scope, $location, StorageService) {
    var session = StorageService.getSession();

    if (session) {
        $location.path("/todo");
    } else {
        $location.path("/login");
    }
});