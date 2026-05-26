import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const prisma = app.get(PrismaService);
    await prisma.ride.deleteMany({});
    await prisma.component.deleteMany({});
    await prisma.bike.deleteMany({});
    await prisma.user.deleteMany({});
  });

  it('should register a user', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
  });

  it('should return access token on login', async () => {
    await request(app.getHttpServer()).post('/auth/register').send({
      email: 'test@test.com',
      password: 'password',
    });
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(200)
      .then((response) => {
        expect(
          (response.body as { accessToken: string }).accessToken,
        ).toBeDefined();
      });
  });
});
