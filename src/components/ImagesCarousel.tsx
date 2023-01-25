import { Box, Image, Text } from "native-base";
import * as React from "react";
import { Dimensions } from "react-native";
import { View } from "native-base";
import Carousel from "react-native-reanimated-carousel";
import { PhotoFileDTO } from "../dtos/PhotoFileDTO";

interface CarouselProps {
  images: PhotoFileDTO[];
  isActiveAd: boolean;
}

export const ImagesCarousel = ({ images, isActiveAd }: CarouselProps) => {
  const { width } = Dimensions.get("window");

  console.warn("ïmages", images);
  return (
    <View>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay
        data={images}
        scrollAnimationDuration={images.length > 1 ? 5000 : 0}
        renderItem={({ index }) => (
          <Box flex={1} justifyContent="center">
            {!isActiveAd ? (
              <Box
                w="full"
                h="full"
                position="absolute"
                bgColor="gray.100"
                opacity={0.9}
                zIndex={1}
                justifyContent="center"
                alignItems="center"
              >
                <Text color="gray.500" fontFamily="heading">
                  ANÚNCIO DESATIVADO
                </Text>
              </Box>
            ) : (
              false
            )}

            <Image
              w={375}
              h={280}
              bgColor="black"
              resizeMode="contain"
              alignItems="center"
              justifyContent="center"
              source={{
                uri: images[index].path,
              }}
              alt="selected product details"
            />
            <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
          </Box>
        )}
      />
    </View>
  );
};
