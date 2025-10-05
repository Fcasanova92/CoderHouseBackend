import { faker } from '@faker-js/faker';
import { Pet } from './Pet.js';

const speciesList = ['dog', 'cat', 'bird', 'hamster', 'rabbit', 'turtle', 'lizard', 'fish'];

const generatePetName = (specie) => {
  switch (specie) {
    case 'dog': return faker.animal.dog();
    case 'cat': return faker.animal.cat();
    case 'bird': return faker.animal.bird();
    case 'hamster': return faker.animal.hamster();
    case 'rabbit': return faker.animal.rabbit();
    case 'turtle': return faker.animal.turtle();
    case 'lizard': return faker.animal.lizard();
    case 'fish': return faker.animal.fish();
    default: return 'Unknown';
  }
};

export const petFactory = {
  generate: (count = 10) => {
    return Array.from({ length: count }, () => {
      const specie = faker.helpers.arrayElement(speciesList);
      const name = generatePetName(specie);

      return new Pet({
        name,
        specie,
        birthDate: faker.date.birthdate({ min: 1, max: 15, mode: 'age' }),
        adopted: faker.datatype.boolean(),
        image: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
      });
    });
  }
};