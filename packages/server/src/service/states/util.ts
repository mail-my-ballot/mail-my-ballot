import { RegistrationInfo } from "../../common";
import { EmailData } from "../mg";

export interface State {
  toEmailData: (info: RegistrationInfo) => EmailData
  name: string
}
