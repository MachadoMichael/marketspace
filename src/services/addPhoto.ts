import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

export async function AddPhoto(
  state: string[],
  setState: React.Dispatch<React.SetStateAction<string[]>>,
  avatar?: string
) {
  try {
    const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    });

    if (selectedPhoto.canceled) {
      return;
    }

    const photoIsValidated = await checkingPhotoSize(
      selectedPhoto.assets[0].uri
    );

    if (photoIsValidated) {
      const newPhotoURI = selectedPhoto.assets[0].uri;
      console.log(selectedPhoto, "PHOTOSOX");

      if (avatar) {
        setState([newPhotoURI]);
      } else {
        const prevState = [...state];
        prevState.push(newPhotoURI);
        setState(prevState);
      }

      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function checkingPhotoSize(selectedPhotoURI: string) {
  const photoInfo = await FileSystem.getInfoAsync(selectedPhotoURI);
  if (photoInfo.size) {
    const photoSizeInMb = photoInfo.size / 1024 / 1024;

    if (photoSizeInMb < 5) {
      return true;
    } else {
      Alert.alert(
        "A imagem selecionada é muito grande, por favor selecione uma imagem menor do que 5MB"
      );
      return false;
    }
  } else {
    return false;
  }
}
