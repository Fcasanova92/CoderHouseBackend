import { petFactory } from "./helpers/petFactory.js";

const createPets = async (req, res, next) => {
  try {
    const { number = 50 } = req.body; 
    const pets = petFactory.generate(number);
    res.send({ status: "success", payload: pets });

  } catch (error) {
    next(error);
  }
};

export default {createPets} 
