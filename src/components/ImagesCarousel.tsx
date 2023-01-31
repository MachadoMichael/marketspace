import { Box, Image, Text } from "native-base";
import * as React from "react";
import { Dimensions } from "react-native";
import { View } from "native-base";
import Carousel from "react-native-reanimated-carousel";
import { PhotoFileDTO } from "../dtos/PhotoFileDTO";
import { api } from "../services/api";
import { Loading } from "./Loading";

interface CarouselProps {
  images: PhotoFileDTO[];
  isActiveAd?: boolean;
}

export const ImagesCarousel = ({ images, isActiveAd }: CarouselProps) => {
  const { width } = Dimensions.get("window");
  return (
    <View>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay
        data={images}
        scrollAnimationDuration={images.length > 1 ? 5000 : 1}
        renderItem={({ index }) => (
          <Box flex={1} justifyContent="center" align-items="center">
            {isActiveAd || isActiveAd === undefined ? (
              <></>
            ) : (
              <Box
                w="full"
                h="full"
                position="absolute"
                opacity={0.9}
                zIndex={1}
                justifyContent="center"
                alignItems="center"
              >
                <Text color="gray.500" fontFamily="heading">
                  ANÚNCIO DESATIVADO
                </Text>
              </Box>
            )}

            {images ? (
              <Image
                w={"full"}
                h={"full"}
                resizeMode="cover"
                alignItems="center"
                justifyContent="center"
                source={{
                  uri:
                    images[index].uri !== undefined
                      ? images[index].uri
                      : `${api.defaults.baseURL}/images/${images[index].path}`,
                }}
                alt="product images"
              />
            ) : (
              <Loading />
            )}
          </Box>
        )}
      />
    </View>
  );
};
