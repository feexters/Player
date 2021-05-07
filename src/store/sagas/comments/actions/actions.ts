import {CommentActionData} from '@lib/interfaces';
import {CommentUpdateData} from '@lib/interfaces';

export const COMMENTS_GET_ALL = 'comments/get-all';
export const COMMENTS_GET_BY_ID = 'comments/get-by-id';
export const COMMENTS_UPDATE = 'comments/update';
export const COMMENTS_CREATE = 'comments/create';
export const COMMENTS_DELETE = 'comments/delete';

export const getAllComments = () => {
  return {type: COMMENTS_GET_ALL};
};

export const getCommentById = (payload: number) => {
  return {type: COMMENTS_GET_BY_ID, payload: payload};
};

export const createComment = (payload: CommentActionData) => {
  return {type: COMMENTS_CREATE, payload: payload};
};

export const deleteComment = (payload: number) => {
  return {type: COMMENTS_DELETE, payload: payload};
};

export const updateComment = (payload: CommentUpdateData) => {
  return {type: COMMENTS_UPDATE, payload: payload};
};
