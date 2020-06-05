export interface _ExperimentGroup<Name extends string, Group extends string> {
  name: Name
  group: Group
}

export type ExperimentType = (
  | _ExperimentGroup<'AddressC2a', 'FindOfficial' | 'RequestVBM'>
)

export type ExperimentName = ExperimentType extends { name: infer Name } ? Name : never
export type GroupType<Name extends ExperimentName, ET=ExperimentType> = ET extends { name: Name, group: infer Group } ? Group : never
export type ExperimentGroup<Name extends ExperimentName> = _ExperimentGroup<Name, GroupType<Name>>
