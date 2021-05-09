import {ColumnActionData, ColumnData, ColumnUpdateData} from '@lib/interfaces';
import {instance} from '@lib/utils/instance';

export async function fetchAllColumns(): Promise<ColumnData[]> {
  return await (await instance())
    .get('columns')
    .then(response => response.data)
    .catch(e => console.log(e));
}

export async function fetchCreateColumn(
  column: ColumnActionData,
): Promise<ColumnData> {
  return await (await instance())
    .post('/columns', column)
    .then(response => response.data)
    .catch(e => console.log(e));
}

export async function fetchDeleteColumn(id: number) {
  return await (await instance())
    .delete(`columns/${id}`)
    .catch(e => console.log(e));
}

export async function fetchUpdateColumn(column: ColumnUpdateData) {
  const {title, description} = column;

  return await (await instance())
    .put(`columns/${column.id}`, {title, description})
    .catch(e => console.log(e));
}
