export interface MenuStruct {
	key: string;
	label: string;
	sort: string;
	permission_type: string;
	parent_id: string;
	level: number;
	icon: string;
	route: string;
	route_file: string;
	path: string;
	method: string;
	created_at: string;
	updated_at: string;
	deleted_at?: unknown;
  children: MenuStruct[]
}