import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
@UseGuards()
export class jwtAuthGuard extends AuthGuard('jwt') {}
