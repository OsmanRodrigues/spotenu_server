enum ROLE{
  NORMAL='NORMAL',
  ADMIN='ADMIN',
  BAND='BAND'
};

enum GETBY_FIELDNAME{
  ID='id',
  EMAIL='email',
  NICKNAME='nickname'
}

interface AuthenticationData{
  id: string,
  name?: string,
  email?: string,
  role?: string,
  device?: string
};

interface CreateUserInfosDTO{
  id: string,
  email: string,
  name: string,
  password: string,
  role: string,
  nickname?: string
}

interface ConvertToBandInfosDTO{
  id: string,
  description: string,
  membersQuantity?: number
}

interface SignupInfosDTO{
  email: string,
  name: string,
  password: string,
  id?: string,
  nickname?: string,
  description?: string,
  subscriber?: boolean,
  blocked?: boolean,
  approved?: boolean,
  members_quantity?: number
}

interface LoginInfosDTO{
  password: string,
  email?: string,
  nickname?: string
}

interface UserInfosDTO{
  id: string,
  email: string,
  name: string,
  nickname: string,
  password: string,
  role: string,
  subscriber: number,
  blocked: number,
  description?: string,
  membersQuantity?: number,
  approved?: number 
}

interface CheckPasswordInput{
  hashedPassword: string,
  plainPassword: string
}

interface GetBandsOutput{
  name: string,
  email: string,
  nickname: string,
  approved: boolean 
}

export {
  ROLE, AuthenticationData, LoginInfosDTO, 
  SignupInfosDTO, CheckPasswordInput, CreateUserInfosDTO,
  UserInfosDTO, GETBY_FIELDNAME, ConvertToBandInfosDTO,
  GetBandsOutput
}