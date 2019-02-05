import { View, StyleSheet, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
  },
  input: {
    width: '100%',
    textAlign: 'left',
  },
});

interface props {
  ph: string;
  onChangeText: (t: string) => any;
}
export default (props: props) => {
  return (
    <View style={styles.inputContainer}>
      <Input inputStyle={styles.input} placeholder={props.ph} onChangeText={props.onChangeText} />
    </View>
  );
};
