import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Res,
  Body,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Response } from 'express';
import { Page } from 'src/types/page';
import { Roles } from './roles.model';
import { MapInterceptor, MapPipe } from '@automapper/nestjs';
import { RolesResponse } from './dto/roles.response';
import { RolesRequest } from './dto/roles.request';

@ApiTags('Roles')
@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiQuery({ name: 'offset', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @UseInterceptors(MapInterceptor(Roles, RolesResponse, { isArray: true }))
  async getAll(
    @Query('offset') offset: string,
    @Query('limit') limit: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Roles[]> {
    const rolesPaginated: Page<Roles> = await this.rolesService.getAll(
      parseInt(offset),
      parseInt(limit),
    );
    res.set('x-total-count', rolesPaginated.getTotalNumbers().toString());
    return rolesPaginated.getElements();
  }

  @Post()
  async save(@Body(MapPipe(RolesRequest, Roles)) rol: Roles): Promise<Roles> {
    return await this.rolesService.save(rol);
  }

  @Put(':rolId')
  async update(
    @Body(MapPipe(RolesRequest, Roles)) rol: Roles,
    @Param('rolId') rolId: number,
  ): Promise<Roles> {
    return await this.rolesService.update(rol, rolId);
  }

  @Delete(':rolId')
  async delete(@Param('rolId') rolId: number): Promise<void> {
    await this.rolesService.delete(rolId);
  }
}
