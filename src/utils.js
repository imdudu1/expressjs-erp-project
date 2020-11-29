import jwt from "jsonwebtoken";

export const generateWebToken = id => jwt.sign({ id }, process.env.JWT_SECRET);

export const checkSqliWord = s => {
  if (s.length > 0) {
    let expText = /[%=><]/;
    if (expText.test(s) === true) {
      return false;
    }

    const sqlArray = [
      "OR",
      "SELECT",
      "INSERT",
      "DELETE",
      "UPDATE",
      "CREATE",
      "DROP",
      "EXEC",
      "UNION",
      "FETCH",
      "DECLARE",
      "TRUNCATE"
    ];

    let regex;
    for (let i = 0; i < sqlArray.length; i++) {
      regex = new RegExp(sqlArray[i], "gi");

      if (regex.test(s)) {
        return false;
      }
    }
  }
  return true;
};
