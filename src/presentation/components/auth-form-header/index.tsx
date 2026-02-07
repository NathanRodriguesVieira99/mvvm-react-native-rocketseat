import type { FC } from 'react';
import { Image, View } from 'react-native';
import { Title } from './components/title';
import { Subtitle } from './components/subtitle';

interface AuthFormHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthFormHeader: FC<AuthFormHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <View className="items-center mb-8">
      <Image
        source={require('../../../assets/images/Logo.png')}
        resizeMode="contain"
        className="w-[80px] h-[60px] mb-8"
      />
      <Title title={title} />
      <Subtitle subtitle={subtitle} />
    </View>
  );
};
