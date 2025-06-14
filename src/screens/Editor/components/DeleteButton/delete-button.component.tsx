import {Pressable, View} from 'react-native';
import styles from './delete-button.style';
import { Trash } from '@/assets/icons';

const DeleteButton = ({onDelete}: {onDelete: () => void}) => {
  return (
    <View style={styles.deleteButtonContainer}>
      <Pressable onPress={onDelete} style={styles.deleteButton}>
        <Trash width={20} height={20} />
      </Pressable>
    </View>
  );
};

export default DeleteButton;
