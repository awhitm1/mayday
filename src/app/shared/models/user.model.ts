export class User {
  email!: string;
  f_name!: string;
  l_name!: string;
  id?: number;
  active?: boolean = true;
  is_admin?: boolean = false;
  is_tech?: boolean = false;
  token?: string;
  password?: string = '';
  password_confirmation?: string = '';

}
