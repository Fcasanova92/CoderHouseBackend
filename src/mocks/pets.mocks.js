import logger from "../utils/logger.js";
import { petFactory } from "./helpers/petFactory.js";

const createPets = async (req, res, next) => {
  try {
    const { number = 50 } = req.body; 
    const pets = petFactory.generate(number);
    logger.info("pets generadas correctamente");
    res.send({ status: "success", payload: pets });

  } catch (error) {
    next(error);
  }
};

export default {createPets} 
