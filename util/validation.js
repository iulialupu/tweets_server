module.exports.validateRegister = ({ email, username, password }) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }

  if (password === "") errors.password = "Password must not empty";
  else if (password.length < 6)
    errors.password = "Password must be at least 6 characters long!";

  //    else if (password !== confirmPassword) {
  //     errors.confirmPassword = 'Passwords must match';

  return { errors, validationPassed: !Object.keys(errors).length };
};

module.exports.validateLogin = ({ email, password }) => {
  const errors = {};

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }

  if (password === "") errors.password = "Password must not empty";
  else if (password.length < 6)
    errors.password = "Password must be at least 6 characters long!";

  return { errors, validationPassed: !Object.keys(errors).length };
};
