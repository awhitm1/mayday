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
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  comments: any[] = [];

  // constructor(title: string, description: string, status_id: number, location_id: number, category_id: number, user_id: number, group_id: number){
  //   this.title = title;
  //   this.description = description;
  //   this.status_id = status_id;
  //   this.location_id = location_id;
  //   this.category_id = category_id;
  //   this.user_id = user_id;
  //   this.group_id = group_id;
  // }
}
