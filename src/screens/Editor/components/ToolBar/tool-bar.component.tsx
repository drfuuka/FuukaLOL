import {Text, View} from 'react-native';
import styles from './tool-bar.style';
import {TItemProps} from './tool-bar.type';
import {Picture, Typography} from '@/assets/icons';
import Button from '@/components/base/Button/button.component';

const ToolBar = ({
  onImportImage,
  onAddText,
}: {
  onImportImage?: () => void;
  onAddText?: () => void;
}) => {
  return (
    <View style={styles.container}>
        <Item title="Picture" icon={<Picture />} onPress={onImportImage} />
        <Item title="Text" icon={<Typography />} onPress={onAddText} />
    </View>
  );
};

const Item = ({title, icon, onPress}: TItemProps) => {
  return (
    <View style={styles.itemWrapper}>
      <Button style={styles.item} onPress={onPress}>
        {icon}
        <Text style={styles.itemText}>{title}</Text>
      </Button>
    </View>
  );
};

export default ToolBar;
