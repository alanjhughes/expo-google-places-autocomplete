import type { CountryCode } from "./CountryCode";
import type { TypeFilter } from "./TypeFilter";

/**
 * Filter your request results
 *
 */
export interface RequestConfig {
  /**
   * An array of country codes that restricts results to those countries
   */
  countries: CountryCode[];
}
