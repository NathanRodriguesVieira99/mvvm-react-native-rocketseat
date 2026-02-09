import type { FC } from 'react';
import { Image, View } from 'react-native';
import { Title } from './_components/title';
import { Subtitle } from './_components/subtitle';

interface AuthFormHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthFormHeader: FC<AuthFormHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <View className="mb-8 items-center">
      <Image
        source={require('../../../assets/images/Logo.png')}
        resizeMode="contain"
        className="mb-8 h-[60px] w-[80px]"
      />
      <Title title={title} />
      <Subtitle subtitle={subtitle} />
    </View>
  );
};
