import React from 'react';
import {View, Button} from 'react-native';

const TextControls = ({onBold, onItalic, onAlign}: any) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Button title="B" onPress={onBold} />
      <Button title="I" onPress={onItalic} />
      <Button title="C" onPress={() => onAlign('center')} />
    </View>
  );
};

export default TextControls;
