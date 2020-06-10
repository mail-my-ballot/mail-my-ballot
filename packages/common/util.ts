export interface _Id {
  id?: string
}

export type WithoutId<T extends {}> = Omit<T, 'id'>
export type WithId<T extends {}> = T & {id: string}

export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * A wrapper with backward compatibility for Object.fromEntries that works
 * as intended on older versions of TypeScript.
 *
 * @param entries The entries to be turned into an object, i.e. `[['key', 'value'], ...]`
 */
export const fromEntries = (
  entries: IterableIterator<[string, string]> | unknown[][],
): Record<string, unknown> => {
  // The reason we write Object['fromEntries'], and not Object.fromEntries,
  // is because machines without a recent version of TypeScript will fire
  // an error complaining about the lack of this method.
  if (Object['fromEntries']) {
    return Object['fromEntries'](entries)
  }

  return Array.from(entries).reduce(
    (accumulated, [ key, value ]) => {
      return {...accumulated, [key as (string | symbol | number)]: value}
    },
    {},
  )
}

/**
 * A wrapper with backward compatibility for Array.flatMap that works as
 * intended on older versions of TypeScript.
 *
 * @param array array to be flattened+mapped
 * @param callbackfn function called on each element of the array
 */
export const flatMap = <T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => U[],
): U[] => {
  return Array.prototype.concat(...array.map(callbackfn))
}
