export enum WeekDayLabel {
  MON = 'Thứ 2',
  TUE = 'Thứ 3',
  WED = 'Thứ 4',
  THU = 'Thứ 5',
  FRI = 'Thứ 6',
  SAT = 'Thứ 7',
  SUN = 'Chủ Nhật',
}

export interface WeekDay {
  dayOfWeekLabel: WeekDayLabel;
  dayOfMonth: string;
  fullDate: Date;
}

export const getWeekDayLabel = (
  i: number, // moment day of week value
): WeekDayLabel => {
  switch (i) {
    case 1:
      return WeekDayLabel.MON;
    case 2:
      return WeekDayLabel.TUE;
    case 3:
      return WeekDayLabel.WED;
    case 4:
      return WeekDayLabel.THU;
    case 5:
      return WeekDayLabel.FRI;
    case 6:
      return WeekDayLabel.SAT;
    case 0:
    default:
      return WeekDayLabel.SUN;
  }
};
