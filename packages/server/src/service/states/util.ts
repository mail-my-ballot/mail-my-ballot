import { StateInfo } from "../../common";
import { EmailData } from "../mg";

export interface State {
  toEmailData: (info: StateInfo) => EmailData
  name: string
}
