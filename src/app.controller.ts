import { AppService } from './app.service';
import { Controller, Request, UseGuards, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/users/:id')
  getUser(@Param('id') id: string): any {
    return this.appService.getUser(+id);
  }
}
