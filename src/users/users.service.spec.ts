import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const mockUserModel = {
    create: () => ({}),
    findByIdAndUpdate: () => ({}),
    find: () => ({}),
    findById: () => ({}),
    findOneAndDelete: () => ({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = {
      _id: '1',
      name: 'akos',
      email: 'akos',
    };

    const spy = jest.spyOn(mockUserModel, 'create').mockImplementation(async () => ({ _id: '1' }));

    const res: User = await service.create(dto);
    expect(spy).toHaveBeenCalled();
    expect(res._id).toBe('1');
  });

  it('should update a user', async () => {
    const dto: UpdateUserDto = {
      _id: '1',
      name: 'updated',
      email: 'akos',
    };

    const spy = jest.spyOn(mockUserModel, 'findByIdAndUpdate').mockImplementation(() => ({
      exec: jest.fn().mockImplementation(async () => ({
        name: 'updated',
      })),
    }));

    const res: User = await service.update(dto._id, dto);
    expect(spy).toHaveBeenCalled();
    expect(res.name).toBe('updated');
  });

  it('should get all users', async () => {
    const spy = jest.spyOn(mockUserModel, 'find').mockImplementation(() => ({
      exec: jest.fn().mockImplementation(async () => [{}, {}, {}]),
    }));

    const res: User[] = await service.findAll();
    expect(spy).toHaveBeenCalled();
    expect(res.length).toBe(3);
  });

  it('should get a specific user', async () => {
    const spy = jest.spyOn(mockUserModel, 'findById').mockImplementation(() => ({
      exec: jest.fn().mockImplementation(async () => ({ _id: '1' })),
    }));

    const res: User = await service.findOne('1');
    expect(spy).toHaveBeenCalled();
    expect(res._id).toBe('1');
  });

  it('should remove a specific user', async () => {
    const spy = jest.spyOn(mockUserModel, 'findOneAndDelete').mockImplementation(() => ({
      exec: jest.fn().mockImplementation(async () => ({ _id: '1' })),
    }));

    const res: User = await service.remove('1');
    expect(spy).toHaveBeenCalled();
    expect(res._id).toBe('1');
  });
});
