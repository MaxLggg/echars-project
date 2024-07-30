

const testBaseUrl = "/";
export const baseUrl = process.env.NODE_ENV === 'development'
  // ? "http://10.28.114.225:9099"  //程鹏
  // ? "http://10.28.117.193:9099"  //王燎
  // ? "http://10.28.117.181:9099"  //亚雷
  // ? "http://10.28.114.81:9099"  //会淳
  ? testBaseUrl
  : '/';


