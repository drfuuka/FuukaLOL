import React from 'react';
import {Image, Pressable, ScrollView} from 'react-native';
import {memeTemplates} from '../../data/memeTemplates';

const Gallery = () => {
  const onSelectTemplate = (url: string) => {
    console.log(url);
  };

  return (
    <ScrollView horizontal>
      {memeTemplates.map(template => (
        <Pressable
          key={template.id}
          onPress={() => onSelectTemplate(template.url)}>
          <Image
            source={{uri: template.url}}
            style={{width: 100, height: 100, margin: 8}}
          />
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default Gallery;