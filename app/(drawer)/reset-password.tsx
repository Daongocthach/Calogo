import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { CustomText } from '@/components';

export default function ResetPasswordScreen() {
  return (
    <>
      <View style={styles.container}>
        <CustomText>ResetPassword</CustomText>
        <Link href="/" style={styles.link}>
          <CustomText >Go to home screen!</CustomText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
