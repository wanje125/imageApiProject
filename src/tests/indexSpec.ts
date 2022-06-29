import app from '../index';
import supertest from 'supertest';
import fs from 'fs';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api/images');
    expect(response.text).toBe(
      'There is a wrong image name. So please check urls.'
    );
  });
});

describe('Test query string', () => {
  it('if there is a correct query string', async () => {
    const response = await request.get('/api/images?image=image');
    expect(response.status).toBe(200);
    expect(response.header['content-type']).toBe('image/jpeg');
  });
  it('if there is a wrong query string', async () => {
    const nothing = 'nothing';
    const response = await fs.existsSync(`resources/thumbs/${nothing}.jpg`);
    expect(response).toBeFalsy();
  });
});
