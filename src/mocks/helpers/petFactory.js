import { faker } from '@faker-js/faker';
import { PetMock } from '../models/Pet.mock.js';

const speciesList = ['dog', 'cat', 'bird', 'cow', 'rabbit', 'snake', 'fish'];

const generatePetName = (specie) => {
  switch (specie) {
    case 'dog': return faker.animal.dog();
    case 'cat': return faker.animal.cat();
    case 'bird': return faker.animal.bird();
    case 'cow': return faker.animal.cow();
    case 'rabbit': return faker.animal.rabbit();
    case 'snake': return faker.animal.snake();
    case 'fish': return faker.animal.fish();
    default: return 'Unknown';
  }
};

export const petFactory = {
  generate: (count = 10) => {
    return Array.from({ length: count }, () => {
      const specie = faker.helpers.arrayElement(speciesList);
      const name = generatePetName(specie);

      return new PetMock({
        name,
        specie,
        birthDate: faker.date.birthdate({ min: 1, max: 15, mode: 'age' }),
        adopted: faker.datatype.boolean(),
        image: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
      });
    });
  }
};