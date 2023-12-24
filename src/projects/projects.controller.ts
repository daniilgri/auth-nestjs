import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';
import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { ActiveUser } from '../iam/decorators/active-user.decorator';
import type { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { ROLE } from '../users/interfaces/role.interface';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(@ActiveUser() user: ActiveUserData) {
    console.log('Active user', user);
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(ROLE.ADMIN)
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
