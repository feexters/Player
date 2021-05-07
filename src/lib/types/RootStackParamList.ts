import {ColumnData} from '@lib/interfaces/ColumnData';
import {PrayerData} from '@lib/interfaces';

export type RootStackParamList = {
  Desk: undefined;
  Column: {column: ColumnData};
  Prayer: {prayer: PrayerData};
};
