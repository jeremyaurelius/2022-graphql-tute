// export interface Dictionary<V> {
//   [K2: string]: V;
// }


/**
 * Defines a dictionary with keys of type K, and values of type V.
 * 
 * K is optional. If not specified, K defaults to string.
 * 
 * @example
 * // value V is of type number; key K is of type string
 * // the dictionary maps names to numbers
 * const ageDictionary: Dictionary<number> = {
 *   jeremy: 25,
 *   callum: 27,
 * }
 * 
 * @example
 * // value V is of type Country, key K is of type City
 * // the dictionary maps cities to countries
 * const cityDictionary: Dictionary<Country, City> = {
 *   'Melbourne': 'AUS',
 *   'Sydney': 'AUS',
 *   'Seattle': 'USA',
 * }
 */
export type Dictionary<V, K extends string | number | symbol =  string> = {
  // has to be type and not interface for this syntax to work
  [K2 in K]: V;
}
