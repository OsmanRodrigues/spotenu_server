import { LoginInfosDTO, SignupInfosDTO } from "./Shapes";

export abstract class InfosChecker{
  constructor(
    public infos: LoginInfosDTO | SignupInfosDTO
  ){}

  protected generalCheck(): void{}
}