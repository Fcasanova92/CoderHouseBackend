import { petFactory } from "../mocks/helpers/petFactory.js";
import { userFactory } from "../mocks/helpers/userFactory.js";
import { petsService, usersService } from "../services/index.js";
import __dirname from "../utils/index.js";

const generateData = async (req, res, next) => {
  try {
    const {users = 50, pets = 10} = req.body;
    const petsArray = petFactory.generate(pets);
    const userArray = userFactory(users)
    petsArray.forEach(async (pet) => {
        await petsService.create(pet)
        
    });
    userArray.forEach(async (user) => {
      await usersService.create(user)
    })
    res.json({ status: "success", message: "users and pets created"});
  } catch (error) {
    next(error);
  }
};

export default {generateData};