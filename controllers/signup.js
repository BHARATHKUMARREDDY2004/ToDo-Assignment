app.controller("SignupController", function($scope, $location, StorageService) {

    $scope.user = {
        name: "",
        username: "",
        password: "",
        session : false,
        todos: [],
    }

    if(StorageService.getSession()) {
        $location.path("/todo");
    }

    $scope.signup = function() {
        console.log("Signup attempt for user:", $scope.user.username);
        success = StorageService.setUser($scope.user);

        if(success) {
            $location.path("/login");
        }
        else {
            alert("User already exists. Please try a different username.");
        }
    }
});