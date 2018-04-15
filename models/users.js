const uuid = require('uuid');


const UserProfile = {
    create: function(username, password) {
        console.log('creating new user profile');
        const user = {
            username: username,
            password: password,
            id: uuid.v4()
        }
        this.users[user.id] = user;
        return user;
    },
    get: function() {
        console.log('retrieving user profile list');
        return Object.keys(this.users).map(key => this.users[key]);
    },
    delete: function(id) {
        console.log(`Deleting user profile\`${id}\``);
        delete this.users[id];
    },
    update: function(updatedUser){
        const {id} = updatedUser;
        if(!(id in this.users)){
            throw StorageException(
                `Can't update item \`${id}\` because doesn't exist.`)
        }
        this.users[updatedUser.id] = updatedUser;
        return updatedUser;
    }
}