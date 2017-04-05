export * from './loader.service';
export * from './user.service';
export * from './dialog.service';
export * from './navigator.service';
export * from './menu.service';
export * from './app.service';
/// exports
import { UserService } from './user.service';
import { DialogService } from './dialog.service';
import { LoaderService } from './loader.service';
import { NavigatorService } from './navigator.service';
import { MenuService } from './menu.service';
import { AppService } from './app.service';
/// imports
export const LIB_SERVICES: any[] = [
  UserService,
  DialogService,
  LoaderService,
  NavigatorService,
  MenuService,
  AppService,
/// services
];