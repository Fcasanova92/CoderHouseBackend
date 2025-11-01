import request from 'supertest';
import chai from 'chai';
import app from '../../src/app.js';
import { config } from '../../src/config/config.js';
import { after, before } from 'mocha';
import mongoose from 'mongoose';
const { expect } = chai;

describe('Adoptions API', function () {

  before(async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.disconnect();
  });

  describe('GET /api/adoptions', function () {
    it('debe devolver todas las adopciones', async function () {
      const res = await request(app).get('/api/adoptions');
      expect(res.status).to.be.oneOf([200, 404]); // depende si hay adopciones
      if (res.status === 200) {
        expect(res.body.status).to.equal('success');
        expect(res.body.payload).to.be.an('array');
      } else {
        expect(res.body.status).to.equal('error');
      }
    });
  });

  describe('GET /api/adoptions/:aid', function () {
    it('debe devolver 200 si existe la adopción', async function () {
      const res = await request(app).get('/api/adoptions/69061ebda8cddc7ee2de9d93');
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
    });
    it('debe devolver 404 si no existe la adopción', async function () {
      const res = await request(app).get('/api/adoptions/000000000000000000000000');
      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal('error');
      expect(res.body.error).to.equal('Adoption not found');
    });
  });

  describe('POST /api/adoptions/:uid/:pid', function () {
    const nonExistingUserId = new mongoose.Types.ObjectId();
    const nonExistingPetId = new mongoose.Types.ObjectId();
    it('debe devolver 404 si el usuario no existe', async function () {
      const res = await request(app).post(`/api/adoptions/${nonExistingUserId}/68e2b3abd3f9a246a451aa72`);
      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal('error');
      expect(res.body.error).to.equal('user Not found');
    });
    
    it('debe devolver 404 si la mascota no existe', async function () {
      const res = await request(app).post(`/api/adoptions/68e2b3abd3f9a246a451aa76/${nonExistingPetId}`);
      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal('error');
      expect(res.body.error).to.equal('Pet not found');
    });

    it('debe devolver 400 si la mascota ya está adoptada', async function () {
      const res = await request(app).post('/api/adoptions/68e2b3abd3f9a246a451aa76/68e2b3abd3f9a246a451aa72');
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error).to.equal('Pet is already adopted');
    });
  });
});
