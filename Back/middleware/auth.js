const jwt = require("jsonwebtoken");
const config = process.env;

const Auth = (token, access) => {
  
  if (!token) {
    return {
    	code: 403,
    	message: "No token provided."
    }
  }
  
  if(jwt.verify(token, config.TOKEN_KEY) == access){
  	return {
  		code: 200,
  		message: "Acces garanted."
  	}
  }

  return {
  	code: 401,
  	message: "Unauthorized"
  }
};

module.exports = Auth;