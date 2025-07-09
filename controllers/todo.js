app.controller("TodoController", function ($scope, $location, StorageService) {
    $scope.todos = [];
    $scope.newTodo = "";

    if (!StorageService.getSession()){
        $location.path("/login");
        return;
    }

    $scope.currentUser = StorageService.getSession();
    $scope.todos = StorageService.getTodos($scope.currentUser.username) || [];

    $scope.addTodo = function () {
        if($scope.newTodo.trim() === "") {
            alert("Please enter a todo item.");
            return;
        }

        $scope.todos.push({
            text: $scope.newTodo,
            completed: false,
            timeStamp: new Date().toISOString()
        });

        StorageService.setTodos($scope.currentUser.username, $scope.todos);
        $scope.newTodo = "";
    };

    $scope.editTodo = function (index) {
        if (index < 0 || index >= $scope.todos.length) {
            alert("Invalid todo item index.");
            return;
        }

        $scope.newTodo = $scope.todos[index].text;
        $scope.todos.splice(index, 1);
        StorageService.setTodos($scope.currentUser.username, $scope.todos);
    };

    $scope.removeTodo = function (index) {
        $scope.todos.splice(index, 1);
        StorageService.setTodos($scope.currentUser.username, $scope.todos);
    };

    $scope.logout = function() {
        StorageService.clearSession();
        $location.path("/login");
    };
});