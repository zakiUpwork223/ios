import React from 'react';
import {Text, Linking, StyleSheet} from 'react-native';

class OpenURLButton extends React.Component<{url: any; children: any}> {
  render() {
    let {url, children} = this.props;
    const handlePress = async () => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log(`Don't know how to open this URL: ${url}`);
      }
    };

    return (
      <Text onPress={handlePress} style={styles.linkText}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  linkText: {
    color: '#0072ff',
    textDecorationLine: 'underline',
  },
});

export default OpenURLButton;
