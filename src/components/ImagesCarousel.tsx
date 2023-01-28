import { Box, Image, Text } from "native-base";
import * as React from "react";
import { Dimensions } from "react-native";
import { View } from "native-base";
import Carousel from "react-native-reanimated-carousel";
import { PhotoFileDTO } from "../dtos/PhotoFileDTO";
import { api } from "../services/api";

interface CarouselProps {
  images: PhotoFileDTO[];
  isActiveAd?: boolean;
}

export const ImagesCarousel = ({ images, isActiveAd }: CarouselProps) => {
  const { width } = Dimensions.get("window");
  console.log(images[0], "uri NO CAROUSEL");
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
          <Box
            flex={1}
            justifyContent="center"
            align-items="center"
            borderWidth={1}
            borderColor={"black"}
          >
            {isActiveAd || isActiveAd === undefined ? (
              <></>
            ) : (
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
            )}

            <Image
              w={"full"}
              h={"full"}
              bgColor="black"
              resizeMode="contain"
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
            {/* <Text style={{ textAlign: "center", fontSize: 30 }}>{}</Text> */}
          </Box>
        )}
      />
    </View>
  );
};
