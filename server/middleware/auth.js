import jwt from "jsonwebtoken";

// Google auth verification and setting up middle ware
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    decodedData = jwt.decode(token);
    req.userId = decodedData?.sub;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
