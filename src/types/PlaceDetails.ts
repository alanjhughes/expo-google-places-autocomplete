import type { Coordinate } from './Coordinate';

/**
 * Represents the details of a place after it has been selected from the list of results
 */
export interface PlaceDetails {
  name: string;
  placeId: string;
  coordinate: Coordinate;
  formattedAddress: string;
}
