export const FIRST_YEAR = 2021;

export const LOGIN_URL = process.env.NODE_ENV === 'development'
  ? "/"
  : "https://bdit-test.isseducloud.com/userlogin/#/Login";

export const HIDE_ROUTES = process.env.NODE_ENV === 'development'
  ? ["/home"]
  : ["/home", "/layout"];