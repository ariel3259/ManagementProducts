import { Controller, Get, Query, Res, UseInterceptors } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Response } from 'express';
import { Page } from 'src/types/page';
import { Permissions } from './permissions.model';
import { MapInterceptor } from '@automapper/nestjs';
import { PermissionsResponse } from './dto/permissions.response';
import { ApiTags, ApiOkResponse, ApiQuery } from '@nestjs/swagger'

@ApiTags('Permissions')
@Controller('api/permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @UseInterceptors(
    MapInterceptor(Permissions, PermissionsResponse, { isArray: true }),
  )
  @ApiQuery({ name: 'offset', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiOkResponse({
    type: [PermissionsResponse],
    description: 'get all permissions',
  })
  async getAll(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Permissions[]> {
    const permissionsPage: Page<Permissions> =
      await this.permissionsService.getAll(offset, limit);
    res.set('x-total-count', permissionsPage.getTotalNumbers().toString());
    return permissionsPage.getElements();
  }
}
