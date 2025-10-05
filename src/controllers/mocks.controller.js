import { petFactory } from "../mocks/helpers/petFactory.js";
import { userFactory } from "../mocks/helpers/userFactory.js";
import { petsService, usersService } from "../services/index.js";
import __dirname from "../utils/index.js";
import logger from "../utils/logger.js";

const generateData = async (req, res, next) => {
  try {
    const { users = 50, pets = 10 } = req.body;

    logger.info(`Iniciando generación de datos: ${users} usuarios, ${pets} mascotas`);

    const petsArray = petFactory.generate(pets);
    const userArray = userFactory(users);

    for (const pet of petsArray) {
      await petsService.create(pet);
    }

    for (const user of userArray) {
      await usersService.create(user);
    }

    logger.info(`Datos generados correctamente: ${userArray.length} usuarios y ${petsArray.length} mascotas`);

    res.json({ status: "success", message: "users and pets created" });
  } catch (error) {
    next(error);
  }
};

export default { generateData };
