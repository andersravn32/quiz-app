const jwt = require("jsonwebtoken");

module.exports = {
  auth: async (req, res, next) => {
    // Get token from request headers or request query
    const token = req.headers.authorization || req.query.token;

    if (!token) {
      return res.json({
        error: "Missing access token",
      });
    }

    try {
      // Extract user data from jwt
      const tokenData = jwt.verify(token, process.env.JWT_AUTH);
      delete tokenData.iat;
      delete tokenData.exp;
      delete tokenData.type;

      // Assign req.user to data extracted from token
      req.user = tokenData;

      // Complete middleware
      next();
    } catch (error) {
      return res.json({
        error: "Provided access token has either expired or is invalid",
        ...error,
      });
    }
  },
  role: (role) => {
    return (req, res, next) => {
      if (!(req.user.role >= role)) {
        return res.json({
          error: "Insufficient permissions",
        });
      }

      return next();
    };
  },
  api: async (req, res, next) => {
    // Get token from request headers or request query
    const token = req.headers.authorization || req.query.token;

    if (!token) {
      return res.json({
        error: "Missing access token",
      });
    }

    try {
      // Extract token data from jwt
      const tokenData = jwt.verify(token, process.env.JWT_API);

      // Set api token data on request object
      req.api = {
        token: token,
        data: tokenData,
      };

      // Next middleware
      next();
    } catch (error) {
      return res.json({
        error: "Provided access token has either expired or is invalid",
        ...error,
      });
    }
  },
};
