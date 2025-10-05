import logger from "../utils/logger.js";
import { userFactory } from "./helpers/userFactory.js";

const createUsers = async (req, res, next) => {
  try {
    const { number = 50 } = req.body; 
    const users = userFactory(number);
    logger.info("users generadas correctamente");
    res.send({ status: "success", payload: users });

  } catch (error) {
    next(error);
  }
};

export default {createUsers} 
