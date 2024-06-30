import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

// we can now use the fields of CreateUserDto as optional fields in UpdateUserDto
