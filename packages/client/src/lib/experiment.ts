import { ExperimentGroup, ExperimentName, GroupType } from '../common'
import { sha1 } from './sha1'

export class Experiment<Name extends ExperimentName> {
  name: Name
  groups: [GroupType<Name>, number][]  // weights of individual groups
  cumGroups: [GroupType<Name>, number][]  // cumualtive weights of groups
  totalWeight: number

  constructor(name: Name, groups: [GroupType<Name>, number][]) {
    this.name = name
    this.groups = groups
    this.cumGroups = []
    let cumWeight = 0
    for (const [group, weight] of groups) {
      cumWeight += weight
      this.cumGroups.push([group, cumWeight])
    }
    this.totalWeight = cumWeight
  }
  
  group(input: string | number): ExperimentGroup<Name> {
    const hash = sha1(this.name + input.toString())
    const modHash = hash % this.totalWeight
    for (const [group, cumWeight] of this.cumGroups) {
      if (modHash < cumWeight) {
        return {name: this.name, group}
      }
    }
    throw Error("Bad Input")
  }
}

export const experiments = [
  new Experiment('AddressC2a', [
    ['FindOfficial', 1],
    ['RequestVBM', 1]
  ]),
  new Experiment('SignatureType', [
    ['Upload', 1],
    ['Both', 1]
  ])
]
