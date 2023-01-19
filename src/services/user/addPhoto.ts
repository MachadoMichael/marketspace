import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import uuid from "uuid";
import { PhotoFileDTO } from "../../dtos/PhotoFileDTO";

export const AddPhoto = async () => {
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
    const photoIsValid = await checkingPhotoSize(selectedPhoto.assets[0].uri);

    if (photoIsValid) {
      const photoFile: PhotoFileDTO = await photoFileConstructor(selectedPhoto);
      return photoFile;
    }
  } catch (error) {
    console.log(error);
  }
};

const checkingPhotoSize = async (selectedPhotoURI: string) => {
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
};

const photoFileConstructor = async (
  selectedPhoto: ImagePicker.ImagePickerResult
) => {
  if (selectedPhoto.assets) {
    const imageRandomName = uuid.v4();
    const fileExtension = selectedPhoto.assets[0].uri.split(".").pop();
    const photoFile = {
      name: `${imageRandomName}.${fileExtension}`,
      uri: selectedPhoto.assets[0].uri,
      type: `${selectedPhoto.assets[0].type}/${fileExtension}`,
    } as any;

    return photoFile;
  } else {
    return {
      name: "",
      uri: "",
      type: "",
    };
  }
};
