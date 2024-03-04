export class Ticket {
  title: string = '';
  description: string = '';
  status_id!: number;
  location_id!: number;
  category_id!: number;
  user_id!: number;
  group_id!: number;
  assigned_tech_id?: number;
  id?: number;
}
