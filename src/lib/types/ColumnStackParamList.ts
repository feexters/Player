import {ColumnData} from '@lib/interfaces/ColumnData';
import {PrayerData} from 'lib/interfaces';

export type ColumnStackParamList = {
  SubscribePrayers: undefined;
  MyPrayers: {column: ColumnData; onNavigate(prayer: PrayerData): void};
};
