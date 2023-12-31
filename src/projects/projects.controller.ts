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
// TODO: Uncomment if you want to test Permissions
// import { PERMISSION } from '../iam/authorization/constants/permission.constants';
// import { Permissions } from '../iam/authorization/decorators/permissions.decorator';
// TODO: Uncomment if you want to test Roles
// import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { Policies } from '../iam/authorization/decorators/policies.decorator';
import { FrameworkContributorPolicy } from '../iam/authorization/policies/framework-contributor.policy';
import { AUTH_TYPE } from '../iam/constants/auth-type.constant';
import { ActiveUser } from '../iam/decorators/active-user.decorator';
import { Auth } from '../iam/decorators/auth.decorator';
import type { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
// TODO: Uncomment if you want to test Roles
// import { ROLE } from '../users/interfaces/role.interface';

@Auth(AUTH_TYPE.API_KEY, AUTH_TYPE.BEARER)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Policies(new FrameworkContributorPolicy())
  // TODO: Uncomment if you want to test Permissions
  // @Permissions(PERMISSION.CREATE_PROJECT)
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @Policies(new FrameworkContributorPolicy())
  findAll(@ActiveUser() user: ActiveUserData) {
    console.log('Active user', user);
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  // TODO: Uncomment if you want to test Permissions
  // @Permissions(PERMISSION.UPDATE_PROJECT)
  // TODO: Uncomment if you want to test Roles
  // @Roles(ROLE.ADMIN)
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  // TODO: Uncomment if you want to test Permissions
  // @Permissions(PERMISSION.DELETE_PROJECT)
  // TODO: Uncomment if you want to test Roles
  // @Roles(ROLE.ADMIN)
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
