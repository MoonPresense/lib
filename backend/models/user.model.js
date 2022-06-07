module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      name: {
        type: Sequelize.STRING,
        required: true
      },
      surname: {
        type: Sequelize.STRING,
        required: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        required: true
      },
      login: {
        type: Sequelize.STRING,
        // unique: true,
        required: true
      },
      password: {
        type: Sequelize.STRING,
        required: true
      },
      isActivated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  
    return User;
  };