export interface _Id {
  id?: string
}

export type WithoutId<T> = T  extends _Id ? & Omit<T, 'id'> : never
export type WithId<T> = T  extends _Id ? T & {id: string} : never
