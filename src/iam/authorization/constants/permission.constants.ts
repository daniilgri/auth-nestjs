import { PROJECTS_PERMISSION } from '../../../projects/projects.permission';

export const PERMISSION_KEY = 'permissions';

export const PERMISSION = {
  ...PROJECTS_PERMISSION,
};

export type PermissionType = PROJECTS_PERMISSION;
