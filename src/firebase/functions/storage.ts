import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage()

// 'file' comes from the Blob or File API


export async function UploadToStorage(file: any, userId: string, fileName: string) {
  const storageRef = ref(storage, 'usersCV/' + userId + "/" + fileName);
  await uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
}

export async function getDownloadUrl(userId: string, fileName: string) {
  const storageRef = ref(storage, 'usersCV/' + userId + "/" + fileName);
  const url = getDownloadURL(storageRef)

  return url
}