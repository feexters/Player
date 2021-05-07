import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CommentData} from '@lib/interfaces';

export const comments = createSlice({
  name: 'comments',
  initialState: {list: [] as CommentData[]},
  reducers: {
    setComment(state, action: PayloadAction<CommentData[]>) {
      state.list = action.payload;
    },
    addComment: (state, action: PayloadAction<CommentData>) => {
      state.list.push(action.payload);
    },
  },
});

export const {setComment, addComment} = comments.actions;
