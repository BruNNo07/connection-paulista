import { get, ref, set, push, update } from "firebase/database";
import { db } from "../firebase-config";
import { FormCandidateData } from "../../components/formCandidate";
import { FormCompanyData } from "../../components/formCompany";
import { NewJobProps } from "../../screens/newJob";
import { UserProps } from "../../context/UserContext";
import { JobsProps } from "../../screens/jobs";

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
    companyName: data.companyName,
    companyAdress: data.companyAdress,
    companyNumber: data.companyNumber,
    companyComplement: data.companyComplement,
    companyNeighborhood: data.companyNeighborhood,
    companyAdressState: data.companyAdressState,
    companyCity: data.companyCity,
    companyCNPJ: data.companyCNPJ,
    email: data.email.toLowerCase()
  });
}

export async function getUserData(userId: string) {
  try {
    const user = await get(ref(db,'users/' + userId))
    return user.val()
  } catch (error) {
    throw error
  }
}

export async function updateUserData(userId: string,role: 'candidate' | 'company', data:UserProps) {
  if(role ==='company'){
    update(ref(db, 'users/' + userId),{
      companyNumber: data.companyNumber,
      companyAdress: data.companyAdress,
      companyAdressState: data.companyAdressState,
      companyComplement: data.companyComplement,
      companyNeighborhood: data.companyNeighborhood,
      companyCity: data.companyCity,
      companyName: data.companyName
    })
  } else {
    update(ref(db, 'users/' + userId),{
      name: data.name,
      lastName: data.lastName,
      phone: data.phone,
    })
  }
  
}

export async function createJobOportunity(data: NewJobProps, userData: UserProps){
  try {
    await push(ref(db, 'jobs/'),{
      position: data.position,
      description: data.description,
      functions: data.functions,
      benefits: data.benefits,
      salary: data.salary,
      seniority: data.seniority,
      typeContract: data.typeContract,
      company: userData.companyName,
      companyLocale: `${userData.companyAdress}, ${userData.companyNumber} - ${userData.companyNeighborhood} - ${userData.companyCity} - ${userData.companyAdressState}`,
      createdAt: String(new Date())
    })
  } catch (error) {
    throw error
  }
}

export async function getAllJobs() {
  try {
    const jobs = await get(ref(db,'jobs/'))
    const data = Object.values<JobsProps>(jobs.val())

    return data
  } catch (error) {
    throw error
  }
}