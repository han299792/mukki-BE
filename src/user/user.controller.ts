import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserPreference } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 400, description: 'Invalid request payload.' })
  @ApiBody({ type: CreateUserDto })
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user information' })
  @ApiResponse({ status: 200, description: 'User successfully updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    return this.userService.updateUser(userId, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deleteUser(@Param('id', ParseIntPipe) userId: number): Promise<void> {
    return this.userService.deleteUser(userId);
  }

  @Get('info/:id')
  @ApiOperation({ summary: 'Get user information with preferences' })
  @ApiResponse({
    status: 200,
    description: 'User information retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUserInfo(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.getUserInfo(userId);
  }

  @Post('preference/:id')
  @ApiOperation({ summary: 'Save or update user preferences' })
  @ApiResponse({
    status: 201,
    description: 'User preferences saved successfully.',
    schema: {
      example: {
        user_id: 1,
        is_user_halal: true,
        is_user_vegan: false,
        is_user_peanut: true,
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid request payload.' })
  @ApiBody({
    schema: {
      example: {
        is_user_halal: true,
        is_user_vegan: false,
        is_user_peanut: true,
      },
    },
  })
  async saveUserPreference(
    @Param('id', ParseIntPipe) userId: number,
    @Body() data: Partial<UserPreference>,
  ) {
    return this.userService.saveUserPreference(userId, data);
  }
}
