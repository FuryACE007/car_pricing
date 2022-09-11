import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
// import { create } from 'domain';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    console.log('User Created:', user.id, user.email, user.password);

    return this.repo.save(user);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.repo.findOneBy({ id }); //new syntax
    user ? console.log('User Found', user) : console.log('No User Found!!');

    return user;
  }

  find(email: string) {
    return this.repo.findBy({ email });
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error(`User ${id} not found`);
    }
    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error(`User ${id} does not exist`);
    }

    return this.repo.remove(user);
  }
}
