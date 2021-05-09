import {PrayerActionData, PrayerData, PrayerUpdateData} from '@lib/interfaces';
import {instance} from '@lib/utils/instance';

export async function fetchCreatePrayer(
  prayer: PrayerActionData,
): Promise<PrayerData> {
  const postPrayer = {
    title: prayer.title,
    description: prayer.description,
    checked: prayer.checked,
  };
  return await (await instance())
    .post(`columns/${prayer.columnId}/prayers`, postPrayer)
    .then(response => response.data)
    .catch(e => console.log(e));
}

export async function fetchDeletePrayer(id: number) {
  return await (await instance())
    .delete(`prayers/${id}`)
    .catch(e => console.log(e));
}

export async function fetchAllPrayers(): Promise<PrayerData[]> {
  return await (await instance())
    .get('prayers')
    .then(response => response.data)
    .catch(e => console.log(e));
}

export async function fetchPrayer(id: number): Promise<string> {
  return await (await instance())
    .get(`prayers/${id}`)
    .then(response => response.headers.date)
    .catch(e => console.log(e));
}

export async function fetchUpdatePrayer(prayer: PrayerUpdateData) {
  const {title, description, checked} = prayer;
  return await (await instance())
    .put(`prayers/${prayer.id}`, {title, description, checked})
    .catch(e => console.log(e));
}
