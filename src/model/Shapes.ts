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

export {ROLE, AuthenticationData, createAdminInfosDTO}