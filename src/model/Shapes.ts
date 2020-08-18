enum ROLE{
  NORMAL='NORMAL',
  ADMIN='ADMIN',
  BAND='BAND'
};

interface AuthenticationData{
  id: string,
  name?: string,
  email?: string,
  role?: string,
  device?: string
};

interface CreateAdminInfosDTO{
  email: string,
  name: string,
  password: string,
  id?: string,
  nickname?: string
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

interface AdminInfosDTO{
  id: string,
  email: string,
  name: string,
  nickname: string,
  password: string
}

interface CheckPasswordInput{
  hashedPassword: string,
  plainPassword: string
}

export {
  ROLE, AuthenticationData, CreateAdminInfosDTO, LoginInfosDTO, 
  SignupInfosDTO, AdminInfosDTO, CheckPasswordInput
}