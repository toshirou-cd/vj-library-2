export interface Group {
  id: string;
  name: string;
  description: string;
}

export type GroupCM = Omit<Group, 'id'>;
