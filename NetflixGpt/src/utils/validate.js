export function dataValidation(email, password) {
  const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPassword = /^.{8,}$/.test(password);

  if (isEmail == false) return "Please enter correct email";
  if (isPassword == false) return "Password must be 8 characters long";

  return null;
}