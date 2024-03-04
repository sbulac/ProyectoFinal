const bcrypt = require("bcrypt");

const encryptPassword = async () => {
  const newPassword = await bcrypt.hash(password, 10);
  return newPassword;
};

const validPassword = async (password = "", hash) => {
  const compare = await bcrypt.compare(password, hash);
  return compare;
};

module.exports = {
  encryptPassword,
  validPassword,
};
