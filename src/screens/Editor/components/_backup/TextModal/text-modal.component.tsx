import React, { useState } from 'react';
import { Modal, View, TextInput, Button } from 'react-native';

const TextModal = ({ visible, onSubmit, onCancel }: { visible: boolean; onSubmit: (text: string) => void; onCancel: () => void }) => {
  const [input, setInput] = useState('');

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel} >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8 }}>
          <TextInput
            placeholder="Enter text"
            value={input}
            onChangeText={setInput}
            style={{ borderBottomWidth: 1, marginBottom: 16, minWidth: 200 }}
          />
          <Button
            title="Add Text"
            onPress={() => {
              onSubmit(input);
              setInput('');
            }}
          />
          <Button title="Cancel" onPress={onCancel} />
        </View>
      </View>
    </Modal>
  );
};

export default TextModal;
