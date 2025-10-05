import { Router } from 'express';
import userMocks from '../mocks/user.mocks.js';
import petsMocks from '../mocks/pets.mocks.js';
import mocksController from '../controllers/mocks.controller.js';

const router = Router();

router.get('/mockingusers”',userMocks.createUsers);
router.get('/mockingpets', petsMocks.createPets);
router.post('/generateData', mocksController.generateData);

export default router;