import { Image } from "native-base";
import * as React from "react";
import { Dimensions, Text } from "react-native";
import { View } from "native-base";
import Carousel from "react-native-reanimated-carousel";

interface CarouselProps {
  data: string[];
}

export function ImagesCarousel({ data }: CarouselProps) {
  const { width } = Dimensions.get("window");
  return (
    <View>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay
        data={[...new Array(data.length).keys()]}
        scrollAnimationDuration={data.length > 1 ? 5000 : 0}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: "center",
            }}
          >
            <Image
              w={375}
              h={280}
              bgColor="black"
              resizeMode="contain"
              alignItems="center"
              justifyContent="center"
              source={{
                uri: data[index],
              }}
              alt="selected product details"
            />
            <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
          </View>
        )}
      />
    </View>
  );
}
