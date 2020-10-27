const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { SECRET_KEY } = require("../config");
const { validateRegister, validateLogin } = require("../util/validation");

function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  registerUser: async ({ registerInput: { email, username, password } }) => {
    try {
      // Validation
      const { errors, validationPassed } = validateRegister({
        email,
        username,
        password,
      });
      console.log(errors, validationPassed);
      if (!validationPassed) throw new Error(Object.keys(errors)[0]);

      // Check if email exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("An user with this email already exists!");
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const user = await User.create({
        email,
        username,
        password: hashedPassword,
      });

      // Get token
      const token = generateToken(user);
      return { token, userId: user.id };
    } catch (error) {
      console.log(error);
    }
  },

  loginUser: async ({ loginInput: { email, password } }) => {
    try {
      // Input validation
      const { errors, validationPassed } = validateLogin({ email, password });
      if (!validationPassed) throw new Error(Object.keys(errors)[0]);
      console.log("1. validation passed");

      // Find user
      const user = await User.findOne({ email });
      if (!user) throw new Error("Wrong credentials");
      console.log("2. user found");

      // Check password
      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new Error("Wrong credentials");
      console.log("3. password checked");

      // Get token
      const token = generateToken(user);
      console.log("4. token generated");
      return { token, userId: user.id };
    } catch (error) {
      console.log(error);
    }
  },
};
