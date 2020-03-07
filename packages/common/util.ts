export interface _Id {
  id?: string
}

export type WithoutId<T extends _Id> = Omit<T, 'id'>
export type WithId<T extends _Id> = WithoutId<T> & {id: string}
