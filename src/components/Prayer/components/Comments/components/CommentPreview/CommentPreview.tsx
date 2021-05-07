import {CommentData} from 'lib/interfaces';
import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  Vibration,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Form, Field} from 'react-final-form';
import {Swipeable, TextInput} from 'react-native-gesture-handler';
import {deleteComment, updateComment} from '@store/sagas';
import {useAppDispatch} from '@lib/hooks';

const CommentPreview: React.FC<{comment: CommentData}> = ({comment}) => {
  const [isVisibleInput, setIsVisibleInput] = useState(false);
  const dispatch = useAppDispatch();

  const renderRightActions = () => {
    return (
      <TouchableOpacity onPress={() => onDelete(comment.id)}>
        <View style={styles.delete}>
          <Text style={styles.deleteText}>Delete</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onChangeComment = (body: string) => {
    if (body.trim()) {
      dispatch(updateComment({id: comment.id, body: body}));
    }
  };

  const onDelete = (id: number) => {
    dispatch(deleteComment(id));
    Vibration.vibrate([0, 50]);
  };

  const onLongPress = () => {
    setIsVisibleInput(!isVisibleInput);
    Vibration.vibrate([0, 50]);
  };

  return (
    <>
      {isVisibleInput ? (
        <Form
          onSubmit={value => onChangeComment(value.body)}
          initialValues={{body: comment.body}}
          render={({form}) => (
            <Field name="body">
              {({input}) => (
                <TextInput
                  style={styles.commentInput}
                  placeholder="Comment..."
                  onSubmitEditing={() => form.submit()}
                  onBlur={() => setIsVisibleInput(!isVisibleInput)}
                  onChangeText={input.onChange}
                  value={input.value}
                  placeholderTextColor="#9C9C9C"
                  selectionColor="#72A8BC"
                  autoFocus
                />
              )}
            </Field>
          )}
        />
      ) : (
        <Swipeable renderRightActions={renderRightActions}>
          <Pressable onLongPress={onLongPress}>
            <View style={styles.wrap}>
              <View style={styles.comment}>
                <View style={styles.commentItemsWrap}>
                  <Text numberOfLines={1} style={styles.commentText}>
                    {comment.body}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        </Swipeable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    backgroundColor: 'white',
  },
  comment: {
    flex: 1,
    paddingVertical: 24,
    borderBottomWidth: 1,
    marginHorizontal: 15,
    borderBottomColor: '#E5E5E5',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentItemsWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentIconsWrap: {
    flexDirection: 'row',
  },
  commentText: {
    width: '70%',
    fontSize: 17,
    fontFamily: 'SFUIText-Regular',
    marginLeft: 15,
  },
  commentTextLine: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  commentCheckbox: {
    borderColor: '#514D47',
    borderRadius: 4,
    marginLeft: 15,
  },
  commentInput: {
    fontSize: 17,
    fontFamily: 'SFUIText-Regular',
    paddingVertical: 24,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#72A8BC',
  },
  delete: {
    height: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(172, 82, 83)',
  },
  deleteText: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'SFUIText-Regular',
  },
});

export default CommentPreview;
