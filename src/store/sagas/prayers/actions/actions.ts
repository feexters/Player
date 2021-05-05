import {PrayerActionData} from '@lib/interfaces';
import {PrayerUpdateData} from '@lib/interfaces';

export const PRAYERS_GET_ALL = 'prayers/get-all';
export const PRAYERS_GET_BY_ID = 'prayers/get-by-id';
export const PRAYERS_UPDATE = 'prayers/update';
export const PRAYERS_CREATE = 'prayers/create';
export const PRAYERS_DELETE = 'prayers/delete-Prayer';

export const getAllPrayers = () => {
  return {type: PRAYERS_GET_ALL};
};

export const getPrayerById = (payload: number) => {
  return {type: PRAYERS_GET_BY_ID, payload: payload};
};

export const createPrayer = (payload: PrayerActionData) => {
  return {type: PRAYERS_CREATE, payload: payload};
};

export const deletePrayer = (payload: number) => {
  return {type: PRAYERS_DELETE, payload: payload};
};

export const updatePrayer = (payload: PrayerUpdateData) => {
  return {type: PRAYERS_UPDATE, payload: payload};
};
