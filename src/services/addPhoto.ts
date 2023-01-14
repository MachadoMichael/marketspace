import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import uuid from "react-native-uuid";
import { Alert } from "react-native";
import { PhotoFileDTO } from "../dtos/PhotoFileDTO";

interface AddPhotoProps {
  userAvatar?: PhotoFileDTO;
  setUserAvatar?: React.Dispatch<React.SetStateAction<PhotoFileDTO>>;
  adPhotosURI?: string[];
  setAdPhotosURI?: React.Dispatch<React.SetStateAction<string[]>>;
}

export async function AddPhoto({
  userAvatar,
  setUserAvatar,
  adPhotosURI,
  setAdPhotosURI,
}: AddPhotoProps) {
  const RandomID = uuid.v4();
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
      const newPhotoURI = selectedPhoto.assets[0].uri;
      console.log(selectedPhoto);

      if (userAvatar && setUserAvatar) {
        const fileExtension = selectedPhoto.assets[0].uri.split(".").pop();
        const photoFile = {
          name: `${RandomID}.${fileExtension}`,
          uri: selectedPhoto.assets[0].uri,
          type: `${selectedPhoto.assets[0].type}/${fileExtension}`,
        } as any;

        setUserAvatar(photoFile);
      } else {
        if (adPhotosURI && setAdPhotosURI) {
          const prevState = [...adPhotosURI];
          prevState.push(newPhotoURI);
          setAdPhotosURI(prevState);
        } else {
          console.log(
            "avatar, setAvatar, adPhotosURI and setAdPhotosURI are undefined"
          );
        }
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
