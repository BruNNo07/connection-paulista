import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FormCandidateData } from "../../components/formCandidate";
import { FormCompanyData } from "../../components/formCompany";
import { FormLoginData } from "../../screens/login";
import { app } from "../firebase-config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const auth = getAuth(app);

export async function CreateUser(email: string, password: string) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    console.log('conta criada')
    return user.user.uid
  } catch (error) {
    throw error
  } 
}

export async function LoginUser(data: FormLoginData){
  console.log(data.user, data.password)
  await signInWithEmailAndPassword(auth, data.user, data.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const userId = JSON.stringify(user.uid)
    AsyncStorage.setItem('userId', userId)
    return user
  })
  .catch((error) => {
    throw error
  });
}
