import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<AuthService>;

  beforeEach(async () => {

    const fakeUsersService = {
      find: () => Promise.resolve([]),
      signup: (usernmae: string, password: string) => Promise.resolve({
        id: 1, 
        usernmae, 
        password
      }),
      login: (username: string, password: string) => Promise.resolve({
        id: 1, 
        username, 
        password
      })
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, 
        {
          provide: AuthService,
          useValue: fakeUsersService
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a user with email and password', async () => {
    await service.signup({username:"shawn@shawn", password:"shawn"})
  });

  it('logs a user in with email and password', async () => {
    await service.login({username:"shawn2", password:"shawn"})
  })
  it('throw an error if username is not in use', async()=>{
    await service.signup({username: "shawn@shawn", password:"shawn"})
  })
  it('throw an error if username is not in use', async()=>{
    await service.login({username: "shawn@shawn", password:"shawn"})
  })


});
