import {useAppDispatch} from '@lib/hooks';
import {PrayerData} from '@lib/interfaces';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {Form, Field} from 'react-final-form';
import {createComment} from '@store/sagas';
import {CommentIcon} from '@assets/images/svg/CommentIcon';

const Comments: React.FC<{prayer: PrayerData}> = ({prayer}) => {
  const dispatch = useAppDispatch();

  const onCreateComment = (body: string) => {
    if (body.trim()) {
      dispatch(createComment({prayerId: prayer.id, body: body}));
    }
  };

  return (
    <Form
      onSubmit={value => onCreateComment(value.body)}
      initialValues={{body: ''}}
      render={({form}) => (
        <View style={styles.commentForm}>
          <TouchableOpacity
            style={styles.inputButton}
            onPress={() => {
              form.submit();
              form.reset();
            }}>
            <CommentIcon />
          </TouchableOpacity>

          <Field name="body">
            {({input}) => (
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                onChangeText={input.onChange}
                onSubmitEditing={() => {
                  form.submit();
                  form.reset();
                }}
                value={input.value}
                placeholderTextColor="#9C9C9C"
                selectionColor="#72A8BC"
              />
            )}
          </Field>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  commentInput: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'SFUIText-Regular',
  },
  commentForm: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  inputButton: {
    paddingHorizontal: 14,
  },
});

export default Comments;
