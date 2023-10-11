import { get, ref, set } from "firebase/database";
import { db } from "../firebase-config";
import { FormCandidateData } from "../../components/formCandidate";
import { FormCompanyData } from "../../components/formCompany";

export async function CreateCandidateOnDb(userId: string, data: FormCandidateData ) {
  await set(ref(db, 'users/' + userId), {
    role: 'candidate',
    name: data.name,
    lastName: data.lastName,
    email: data.email.toLowerCase(),
    cpf: data.cpf,
    phone: data.phone
  });
}

export async function CreateCompanyOnDb(userId: string, data: FormCompanyData ) {
  await set(ref(db, 'users/' + userId), {
    role: 'company',
    name: data.companyName,
    adress: data.companyAdress,
    adressNumber: data.companyNumber,
    adressComplement: data.companyComplement,
    adressNeighborhood: data.companyNeighborhood,
    adressState: data.companyAdressState,
    adressCity: data.companyCity,
    CNPJ: data.companyCNPJ,
    email: data.email.toLowerCase()
  });
}

export async function getUserData(userId: string) {
  await get(ref(db,'users/' + userId))
}