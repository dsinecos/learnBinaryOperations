function User(name, userType) {
    this.name = name;
    this.permissions = this.userType(userType); // 0b WRITE_PERMISSSION READ_PERMISSION
}

User.prototype.userType = function (userType) {
    switch (userType) {
        case 'ADMIN':
            return 0b11;
        case 'COMMON':
            return 0b01;
        default:
            return 0b00;
    }
}

User.prototype.readFile = function () {
    if (this.permissions & 0b01) {
        return 'Hello World !'
    } else {
        return `${this.name} is not authorized to read file`
    }
}

User.prototype.writeFile = function () {
    if (this.permissions & 0b10) {
        return 'Written to file';
    } else {
        return `${this.name} is not authorized to write to file`
    }
}

User.prototype.toggleAllPermissions = function () {
    this.permissions = this.permissions ^ 0b11
}

User.prototype.enableReadPermisson = function () {
    this.permissions = this.permissions | 0b01
}

User.prototype.enableWritePermission = function () {
    this.permissions = this.permissions | 0b10
}

User.prototype.disableReadPermission = function () {
    this.permissions = this.permissions & 0b10
}

User.prototype.disableWritePermission = function () {
    this.permissions = this.permissions & 0b01
}

const John = new User('John', 'COMMON');
console.log(John.name);
console.log(John.readFile());
console.log(John.writeFile());

John.enableWritePermission();
console.log(John.name);
console.log(John.writeFile());

John.disableWritePermission();
console.log(John.name);
console.log(John.writeFile());

const Jane = new User('Jane', 'ADMIN');
console.log(Jane.name);
console.log(Jane.readFile());
console.log(Jane.writeFile());

Jane.toggleAllPermissions();
console.log("After toggling permissions");
console.log(Jane.readFile());
console.log(Jane.writeFile());

const Stranger = new User('Stranger', '');
console.log(Stranger.name);
console.log(Stranger.readFile());
console.log(Stranger.writeFile());

Stranger.toggleAllPermissions();
console.log("After toggling permissions");
console.log(Stranger.readFile());
console.log(Stranger.writeFile());

Stranger.toggleAllPermissions();
console.log("After toggling permissions");
console.log(Stranger.readFile());
console.log(Stranger.writeFile());