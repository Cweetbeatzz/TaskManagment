const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  const saltRounds = 12;

  return bcrypt.hashSync(password, saltRounds);
};

const comparePasswords = (hashedPassword, plainPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

// ####################################################################

module.exports = { hashPassword, comparePasswords };
