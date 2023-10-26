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

    const data = Object.entries<JobsProps>(jobs.val()).map(([key, value]) => {
      return {
        key,
        position: value.position,
        description: value.description,
        createdAt: value.createdAt,
        functions: value.functions,
        benefits: value.benefits,
        company: value.company,
        companyLocale: value.companyLocale,
        seniority: value.seniority,
        typeContract: value.typeContract,
        salary: value.salary
      }
    })

    return data
  } catch (error) {
    throw error
  }
}

export async function getJobDetails (jobid: string){
  try {
    const data = await get(ref(db, 'jobs/' + jobid))

    return data.val()
  } catch (error) {
    return error
  }
}

export async function createUserApply(jobId: string, userId: string){
  const applys:{ users: string[] } = await getUsersApply(jobId)
  
  if (applys !== null) {
    const applyAlreadyExists = applys.users.find(user => user === userId)
    if (applyAlreadyExists) throw 'Candidatura já Realizada'

    applys.users.push(userId)
    try {
      await update(ref(db, 'applys/' + jobId),{
        users: applys
      })
    } catch (error) {
      throw error
    }
  } else {
    try {
      await set(ref(db, 'applys/' + jobId),{
        users: [userId]
      })
    } catch (error) {
      throw error
    }
  }

}

export async function getUsersApply(jobId: string) {
  try {
    const data = await get(ref(db, 'applys/' + jobId))

    return data.val()
  } catch {
    return []
  }
}