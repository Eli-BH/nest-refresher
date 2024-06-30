import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { name: 'John Doe', role: 'INTERN', email: 'john.doe@example.com', id: 1 },
    {
      name: 'Jane Smith',
      role: 'ENGINEER',
      email: 'jane.smith@example.com',
      id: 2,
    },
    {
      id: 3,
      name: 'Michael Johnson',
      role: 'ENGINEER',
      email: 'michael.johnson@example.com',
    },
    {
      id: 4,
      name: 'Emily Davis',
      role: 'ADMIN',
      email: 'emily.davis@example.com',
    },
    {
      id: 5,
      name: 'David Wilson',
      role: 'INTERN',
      email: 'david.wilson@example.com',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArr = this.users.filter((user) => user.role === role);

      if (!rolesArr.length) {
        throw new NotFoundException(`Role not found`);
      }

      return rolesArr;
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException(`User not found`); // throw error if user not found
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id); // sort by highest id
    const newUser = {
      ...createUserDto,
      id: usersByHighestId[0].id + 1,
    };
    this.users.push(newUser); // add new user to users array
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }

      return user;
    });

    return this.findOne(id); // return updated user
  }

  delete(id: number) {
    const removedUser = this.findOne(id); // get user to be removed
    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
