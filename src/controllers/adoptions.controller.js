import { adoptionsService, petsService, usersService } from "../services/index.js";
import logger from "../utils/logger.js";

const getAllAdoptions = async (req, res, next) => {
    try {
        const result = await adoptionsService.getAll();
        logger.info(`Se obtuvieron ${result.length} adopciones`);
        res.send({ status: "success", payload: result });
    } catch (error) {
        next(error);
    }
};

const getAdoption = async (req, res, next) => {
    try {
        const adoptionId = req.params.aid;
        const adoption = await adoptionsService.getBy({ _id: adoptionId });
        if (!adoption) return res.status(404).send({ status: "error", error: "Adoption not found" });
        logger.info(`Adopción consultada: ${adoption._id}`);
        res.send({ status: "success", payload: adoption });
    } catch (error) {
        next(error);
    }
};

const createAdoption = async (req, res, next) => {
    try {
        const { uid, pid } = req.params;
        const user = await usersService.getUserById(uid);
        if (!user) return res.status(404).send({ status: "error", error: "user Not found" });
        const pet = await petsService.getBy({ _id: pid });
        if (!pet) return res.status(404).send({ status: "error", error: "Pet not found" });
        if (pet.adopted) return res.status(400).send({ status: "error", error: "Pet is already adopted" });

        user.pets.push(pet._id);
        await usersService.update(user._id, { pets: user.pets });
        await petsService.update(pet._id, { adopted: true, owner: user._id });
        const adoption = await adoptionsService.create({ owner: user._id, pet: pet._id });

        logger.info(`Mascota adoptada: ${pet._id} por usuario: ${user._id}`);
        res.send({ status: "success", message: "Pet adopted" });
    } catch (error) {
        next(error);
    }
};

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
};
