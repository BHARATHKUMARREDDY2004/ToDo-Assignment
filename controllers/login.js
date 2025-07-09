app.controller("LoginController", function($scope, $location, StorageService) {

    $scope.user = {
        username: "",
        password: ""
    };

    if(StorageService.getSession()) {
        $location.path("/todo");
    }

    $scope.login = function(){
        console.log("Login attempt for user:", $scope.user.username);
        var user = StorageService.getUser($scope.user.username);
        if (user && user.password === $scope.user.password) {
            StorageService.setSession(user.username);
            StorageService.getTodos(user.username);
            $location.path("/todo");
        } else {
            alert("Invalid username or password. or User not found.");
        }
    }

    $scope.goToSignup = function() {
        $location.path("/signup");
    }
});