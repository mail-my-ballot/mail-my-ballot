import { State } from "./states"

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace Statuses {
  export interface Excuse { status: "Excuse" }  // Not all voters automatically qualify
  export interface NoExcuse { status: "NoExcuse" }  // VBM but don't know how
  export interface Automatic { status: "Automatic" }  // Voters automatically enrolled
  export interface Website { status: "Website", regUrl: string, infoUrl: string }  // Can apply via state website
  export interface Mail { status: "Mail", infoUrl: string }  // Must apply by mail
  export interface VbmApp { status: "VbmApp" }  // Works with our app
}

export type Status = (
  | Statuses.Excuse
  | Statuses.NoExcuse
  | Statuses.Automatic
  | Statuses.Website
  | Statuses.Mail
  | Statuses.VbmApp
)

export const vbmStatus = (state: State): Status => {
  switch (state) {
    case "Alabama": return { status: "Excuse" }
    case "Alaska": return { status: "NoExcuse" }
    case "Arizona": return {
      status: "Website",
      regUrl: "https://servicearizona.com/voterRegistration?popularclick",
      infoUrl: "https://www.azcleanelections.gov/how-to-vote/early-voting/ballot-by-mail",
    }
    case "Arkansas": return { status: "Excuse" }
    case "California": return { status: "NoExcuse" }
    case "Colorado": return { status: "Automatic" }
    case "Connecticut": return { status: "Excuse" }
    case "Delaware": return { status: "Excuse" }
    case "District of Columbia": return { status: "NoExcuse" }
    case "Florida": return { status: "VbmApp" }
    case "Georgia": return { status: "VbmApp" }
    case "Hawaii": return { status: "NoExcuse" }
    case "Idaho": return { status: "NoExcuse" }
    case "Illinois": return { status: "NoExcuse" }
    case "Indiana": return { status: "Excuse" }
    case "Iowa": return {
      status: "Mail",
      infoUrl: "https://sos.iowa.gov/elections/electioninfo/absenteemail.html",
    }
    case "Kansas": return { status: "NoExcuse" }
    case "Kentucky": return { status: "Excuse" }
    case "Louisiana": return { status: "Excuse" }
    case "Maine": return {
      status: "Website",
      regUrl: "https://www.maine.gov/cgi-bin/online/AbsenteeBallot/index.pl",
      infoUrl: "https://www.maine.gov/sos/cec/elec/voter-info/absenteeguide.html",
    }
    case "Maryland": return { status: "NoExcuse" }
    case "Massachusetts": return { status: "Excuse" }
    case "Michigan": return { status: "VbmApp" }
    case "Minnesota": return {
      status: "Website",
      regUrl: "https://mnvotes.sos.state.mn.us/ABRegistration/ABRegistrationStep1.aspx",
      infoUrl: "https://www.sos.state.mn.us/elections-voting/other-ways-to-vote/vote-early-by-mail/",
    }
    case "Mississippi": return { status: "Excuse" }
    case "Missouri": return { status: "Excuse" }
    case "Montana": return { status: "NoExcuse" }
    case "Nebraska": return { status: "VbmApp" }
    case "Nevada": return {
      status: "Mail",
      infoUrl: "https://www.nvsos.gov/sos/elections/voters/absentee-voting",
    }
    case "New Hampshire": return { status: "Excuse" }
    case "New Jersey": return { status: "NoExcuse" }
    case "New Mexico": return { status: "NoExcuse" }
    case "New York": return { status: "Excuse" }
    case "North Carolina": return {
      status: "Mail",
      infoUrl: "https://www.ncsbe.gov/Voting-Options/Absentee-Voting#RequestingAbsenteeBallot",
    }
    case "North Dakota": return { status: "NoExcuse" }
    case "Ohio": return {
      status: "Mail",
      infoUrl: "https://www.ohiosos.gov/elections/voters/absentee-voting/#byMail",
    }
    case "Oklahoma": return { status: "NoExcuse" }
    case "Oregon": return { status: "Automatic" }
    case "Pennsylvania": return {
      status: "Website",
      regUrl: "https://www.pavoterservices.pa.gov/OnlineAbsenteeApplication/#/OnlineAbsenteeBegin",
      infoUrl: "https://www.votespa.com/Voting-in-PA/Pages/Mail-and-Absentee-Ballot.aspx",
    }
    case "Rhode Island": return { status: "NoExcuse" }
    case "South Carolina": return { status: "Excuse" }
    case "South Dakota": return { status: "NoExcuse" }
    case "Tennessee": return { status: "Excuse" }
    case "Texas": return { status: "Excuse" }
    case "Utah": return { status: "Automatic" }
    case "Vermont": return { status: "NoExcuse" }
    case "Virginia": return { status: "Excuse" }
    case "Washington": return { status: "Automatic" }
    case "West Virginia": return { status: "Excuse" }
    case "Wisconsin": return { status: "VbmApp" }
    case "Wyoming": return { status: "NoExcuse" }
  }
}
