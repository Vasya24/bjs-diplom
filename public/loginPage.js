class Profile {
    constructor({ username, name: { firstName, lastName }, password }) {
        this.username = username;
        this.name = { firstName, lastName };
        this.password = password;
    }
}

addUser(callback); {
    console.log(`Adding user ${this.username}`);
    return ApiConnector.create.user({
            username: this.username,
            name: this.name,
            password: this.password
        },
        (err, data) => callback(err, data)
    );
}

authorization(callback); {
    console.log(`Authorizating user ${this.username}`);
    return ApiConnector.performLogin({
            username: this.username,
            password: this.password
        },
        (err, data) => callback(err, data)
    );
}