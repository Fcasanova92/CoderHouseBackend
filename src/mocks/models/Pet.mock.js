export class PetMock {
  constructor({
    name,
    specie,
    birthDate = null,
    adopted = false,
    owner = null,
    image = null
  }) { 
    this.name = name;     
    this.specie = specie;     
    this.birthDate = birthDate; 
    this.adopted = adopted;   
    this.owner = owner;       
    this.image = image;      
  }
}