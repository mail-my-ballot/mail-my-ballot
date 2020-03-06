import { RegistrationInfo } from "../../common";
import { EmailData } from "../mg";

export interface State {
  toEmail: (info: RegistrationInfo) => EmailData
  name: string
}
