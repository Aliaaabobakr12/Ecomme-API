const createTokenUser = (user) => {
  return { name: user.name, userId: user._id, role: user.userType };
};

module.exports = { createTokenUser };
