export class User {
  id!: number;
  username: string = '';
  email: string = '';
  f_name: string = '';
  l_name: string = '';
  active: boolean = true;
  is_admin: boolean = false;
  is_tech: boolean = false;
  token?: string;
}
