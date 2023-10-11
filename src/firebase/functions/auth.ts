import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FormCandidateData } from "../../components/formCandidate";
import { FormCompanyData } from "../../components/formCompany";
import { FormLoginData } from "../../screens/login";
import { app } from "../firebase-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_ID } from "../AsyncStorage-Keys";

const auth = getAuth(app);

export async function CreateUser(email: string, password: string) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password)

    return user.user.uid
  } catch (error) {
    throw error
  } 
}

export async function LoginUser(data: FormLoginData){
  try {
    const userCredential = await signInWithEmailAndPassword(auth, data.user, data.password)
    const userId = userCredential.user.uid

    await AsyncStorage.setItem(USER_ID, userId)

    return userId
  } catch (error) {
    throw error
  }

}
