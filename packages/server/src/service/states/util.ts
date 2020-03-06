import { RegistrationInfo } from "../../common";
import { MdEmailData } from "../mg";

export interface State {
  toEmail: (info: RegistrationInfo) => MdEmailData
  name: string
}
