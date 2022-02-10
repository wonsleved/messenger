module.exports = class UserDto {
  username;
  name;
  id;

  constructor(model) {
    this.username = model.username;
    this.name = model.name;
    this.id = model.id;
  }
};
