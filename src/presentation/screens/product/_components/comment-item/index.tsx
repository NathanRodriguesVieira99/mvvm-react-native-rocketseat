import { Ionicons } from '@expo/vector-icons';
import type { ProductComment } from '@shared/interfaces/product-comment';
import { useUserStore } from '@shared/store/user.store';
import { colors } from '@styles/colors';
import type { FC } from 'react';
import { Image, Text, View } from 'react-native';

interface CommentItemProps {
  comment: ProductComment;
}

export const CommentItem: FC<CommentItemProps> = ({ comment }) => {
  const user = useUserStore((s) => s.user);
  const isCurrentUser = user?.id === comment.user.id;

  return (
    <View className="mb-4 rounded-lg bg-white p-4 pl-12 shadow-sm">
      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-1 flex-row">
          <View className="mr-3 h-8 w-8 overflow-hidden rounded-md bg-gray-200">
            {comment.user.avatar.url && comment.user.avatar.url !== '' ? (
              <Image
                source={{ uri: comment.user.avatar.url }}
                className="h-full w-full"
                resizeMode="cover"
              />
            ) : (
              <View className="h-full w-full items-center justify-center">
                <Ionicons name="person" size={20} color={colors.gray[400]} />
              </View>
            )}
          </View>
          <View className="flex-row items-center justify-center gap-2">
            <Text className="text-base font-medium text-gray-800">
              {comment.user.name}
            </Text>
            {isCurrentUser && (
              <View className="rounded-full bg-blue-base px-4 py-2">
                <Text className="text-xs font-bold text-white">Você</Text>
              </View>
            )}
          </View>
        </View>

        <View className="flex-row gap-1">
          <Ionicons name="star" size={16} color={colors['purple-base']} />
          <Text className="text-sm font-bold text-gray-600">
            {comment.user.rating.value} /{' '}
            <Text className="text-[10px] text-gray-600">5</Text>
          </Text>
        </View>
      </View>
      <Text>{comment.content}</Text>
    </View>
  );
};
