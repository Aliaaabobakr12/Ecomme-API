const CustomError = require("../errors");
const { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role }; // if there is an error it should be userType not role
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnautherizedError(
        "Unautherized to access this route"
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermission,
};
