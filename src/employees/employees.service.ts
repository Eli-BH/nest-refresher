import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class EmployeesService {
  constructor(private databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({ data: createEmployeeDto });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.databaseService.employee.findMany({ where: { role } });
  }

  async findOne(id: number) {
    const user = await this.databaseService.employee.findUnique({
      where: { id },
    }); // find employee by id

    if (!user) throw new NotFoundException(`Employee not found`); // throw error if employee not found

    return user;
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({ where: { id } });
  }
}
