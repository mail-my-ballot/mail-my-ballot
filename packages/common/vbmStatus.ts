import { State } from "./states"
import { isImplementedState } from './stateInfo'

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace Statuses {
  export interface Automatic { status: 'Automatic' }
  export interface Mail { status: "Mail", infoUrl: string }  // Must apply by mail
  export interface VbmApp { status: "VbmApp" }  // Works with our app
  export interface VoteOrg { status: 'Vote.org' }
  export interface Website { status: "Website", regUrl: string, infoUrl: string }  // Can apply via state website
}

export type Status = (
  | Statuses.Automatic
  | Statuses.Mail
  | Statuses.VbmApp
  | Statuses.VoteOrg
  | Statuses.Website
)

export const vbmStatus = (state: State): Status => {
  if (isImplementedState(state)) {
    return { status: "VbmApp" }
  }

  switch (state) {
    case "Arizona": return {
      status: "Website",
      regUrl: "https://servicearizona.com/voterRegistration?popularclick",
      infoUrl: "https://www.azcleanelections.gov/how-to-vote/early-voting/ballot-by-mail",
    }
    case "Iowa": return {
      status: "Mail",
      infoUrl: "https://sos.iowa.gov/elections/electioninfo/absenteemail.html",
    }
    case "North Carolina": return {
      status: "Mail",
      infoUrl: "https://www.ncsbe.gov/Voting-Options/Absentee-Voting#RequestingAbsenteeBallot",
    }
    case "Ohio": return {
      status: "Mail",
      infoUrl: "https://www.ohiosos.gov/elections/voters/absentee-voting/#byMail",
    }
    case "Pennsylvania": return {
      status: "Website",
      regUrl: "https://www.pavoterservices.pa.gov/OnlineAbsenteeApplication/#/OnlineAbsenteeBegin",
      infoUrl: "https://www.votespa.com/Voting-in-PA/Pages/Mail-and-Absentee-Ballot.aspx",
    }
    case "Hawaii": return { status: "Automatic" }
    case "Colorado": return { status: "Automatic" }
    case "Utah": return { status: "Automatic" }
    case "Oregon": return { status: "Automatic" }
    case "Washington": return { status: "Automatic" }
  }

  return { status: 'Vote.org' }
}
