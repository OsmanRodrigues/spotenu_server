enum ROLE{
  NORMAL = 'NORMAL',
  ADMIN = 'ADMIN'
};

interface AuthenticationData{
  id: string,
  name?: string,
  email?: string,
  role?: ROLE | string,
  device?: string,
};

interface createAdminInfosDTO{
  email: string,
  name: string,
  password: string,
  id?: string,
  nickname?: string
}

interface loginAdminInfosDTO{
  password: string,
  email?: string,
  nickname?: string
}

interface adminInfosDTO{
  id: string,
  email: string,
  name: string,
  nickname: string,
  password: string
}

export {ROLE, AuthenticationData, createAdminInfosDTO, loginAdminInfosDTO, adminInfosDTO}