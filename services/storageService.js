app.service("StorageService", function() {

    this.users = [];
    this.loggedInUser = null;

    this.setAllUsers = function() {
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
            this.users = JSON.parse(storedUsers);
        } else {
            this.users = [];
            localStorage.setItem("users", JSON.stringify([]));
        }
    };

    // this.getAllUsers = function() {
    //     return localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
    // };

    this.getUser = function(username) {
        if(!this.users.length) {
            this.setAllUsers();
        }

        return this.users.find(user => user.username === username) || null;

    }

    this.setUser = function(user) {
        if(!this.users.length) {
            this.setAllUsers();
        }

        const existingUserIndex = this.users.findIndex(u => u.username === user.username);
        if (existingUserIndex !== -1) {
            alert("User already exists with this username.");
            return false;
        } else {
            this.users.push(user);
        }
        
        localStorage.setItem("users", JSON.stringify(this.users));
        alert("User saved successfully.");
        return true;
    };

    this.setTodos = function(username, todos) {

        if(!this.loggedInUser || this.loggedInUser.username !== username) {
            console.error("No user is logged in to set todos.");
            return;
        }

        if(!this.users.length) {
            this.setAllUsers();
        }

        const userIndex = this.users.findIndex(u => u.username === username);
        if (userIndex !== -1) {
            this.users[userIndex].todos = todos;
            localStorage.setItem("users", JSON.stringify(this.users));
        } else {
            console.error("User not found to set todos.");
        }
    }

    this.getTodos = function(username) {
        if(!this.loggedInUser || this.loggedInUser.username !== username) {
            console.error("No user is logged in to get todos.");
            return;
        }

        if(!this.users.length) {
            this.setAllUsers();
        }

        const user = this.users.find(u => u.username === username);
        return user ? user.todos || [] : [];
    };


    this.setSession = function(username) {
        if(!this.users.length) {
            this.setAllUsers();
        }

        const user = this.users.find(u => u.username === username);
        if (user) {
            this.loggedInUser = user;
            localStorage.setItem("loggedInUser", JSON.stringify(user));
        } else {
            console.error("User not found to set session.");
        }
    };

    this.getSession = function() {
        if(!this.loggedInUser) {
            const storedUser = localStorage.getItem("loggedInUser");
            this.loggedInUser = storedUser ? JSON.parse(storedUser) : null;
        }
        return this.loggedInUser;
    };

    this.clearSession = function() {
        this.loggedInUser = null;
        localStorage.removeItem("loggedInUser");
    };

});