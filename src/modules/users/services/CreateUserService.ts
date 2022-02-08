import { AppError } from '@shared/errors/App.Error';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<User | undefined> {
    const userRespository = getCustomRepository(UserRepository);
    const emailExistis = await userRespository.findByEmail(email);

    if (emailExistis) {
      throw new AppError('This email already exists');
    }

    const user = userRespository.create({
      name,
      email,
      password,
    });

    await userRespository.save(user);

    return user;
  }
}
