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
import {UserIcon} from '@assets/images/svg/UserIcon';

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
            <View style={styles.comment}>
              <View style={styles.commentImage}>
                <UserIcon color="white" />
              </View>
              <View style={styles.commentItemsWrap}>
                <View style={styles.commentInfo}>
                  <Text style={[styles.commentText, styles.commentUserName]}>
                    Anna Barber
                  </Text>
                  <Text style={[styles.commentText, styles.commentDate]}>
                    2 days ago
                  </Text>
                </View>
                <Text numberOfLines={1} style={styles.commentText}>
                  {comment.body}
                </Text>
              </View>
            </View>
          </Pressable>
        </Swipeable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  comment: {
    flex: 1,
    paddingVertical: 24,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    borderBottomColor: '#E5E5E5',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentItemsWrap: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 9,
  },
  commentText: {
    fontSize: 17,
    fontFamily: 'SFUIText-Light',
    lineHeight: 20,
  },
  commentUserName: {
    fontFamily: 'SFUIText-Bold',
    marginRight: 6,
    marginBottom: 2,
  },
  commentDate: {
    fontSize: 13,
    color: '#9C9C9C',
  },
  commentInput: {
    fontSize: 17,
    fontFamily: 'SFUIText-Regular',
    paddingVertical: 24,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#72A8BC',
  },
  commentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentImage: {
    backgroundColor: '#BFB393',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
