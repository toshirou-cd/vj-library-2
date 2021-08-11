export interface Info {
  name: string;
  label: string;
  content: string;
}

export interface Agenda {
  id: string | number;
  date: Date;
  time: string;
  status: number;
  infoList: Info[];
}
