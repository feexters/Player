import {
  CommentActionData,
  CommentData,
  CommentUpdateData,
} from '@lib/interfaces';
import {instance} from '@lib/utils/instance';

export async function fetchCreateComment(
  comment: CommentActionData,
): Promise<CommentData> {
  return await (await instance())
    .post(`prayers/${comment.prayerId}/comments`, {body: comment.body})
    .then(response => response.data)
    .catch(e => console.log(e));
}

export async function fetchDeleteComment(id: number) {
  return await (await instance())
    .delete(`comments/${id}`)
    .catch(e => console.log(e));
}

export async function fetchAllComments(): Promise<CommentData[]> {
  return await (await instance())
    .get('comments')
    .then(response => response.data)
    .catch(e => console.log(e));
}

export async function fetchUpdateComment(comment: CommentUpdateData) {
  return await (await instance())
    .put(`comments/${comment.id}`, {body: comment.body})
    .catch(e => console.log(e));
}
