module.exports = (sequelize, Sequelize) => {
    const Token = sequelize.define("tokens", {
      user: {
        type: Sequelize.STRING,
        required: true
      },
      refreshToken: {
        type: Sequelize.STRING,
        required: true
      },
    });
  
    return Token;
  };