import {useAppDispatch, useAppSelector} from '@lib/hooks';
import {PrayerData} from '@lib/interfaces';
import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {CommentPreview} from './components/CommentPreview';
import {Form, Field} from 'react-final-form';
import {createComment} from '@store/sagas';
import {CommentIcon} from '@assets/images/svg/CommentIcon';

const Comments: React.FC<{prayer: PrayerData}> = ({prayer}) => {
  const {comments} = useAppSelector(state => state);

  const dispatch = useAppDispatch();

  const prayerComments = useMemo(
    () => comments.list.filter(item => prayer.id === item.prayerId),
    [comments.list, prayer.id],
  );

  const onCreateComment = (body: string) => {
    console.log(body);
    if (body.trim()) {
      dispatch(createComment({prayerId: prayer.id, body: body}));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.commentList}>
        <FlatList
          data={prayerComments}
          removeClippedSubviews={false}
          renderItem={({item}) => (
            <CommentPreview key={item.id} comment={item} />
          )}
        />
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  commentList: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  commentInput: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'SFUIText-Regular',
  },
  commentForm: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  inputButton: {
    paddingHorizontal: 14,
  },
});

export default Comments;
