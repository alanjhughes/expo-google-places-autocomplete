/**
 * Represents a result item in list of results
 */
export interface Place {
  primaryText: string;
  secondaryText: string;
  fullText: string;
  description: string;
  placeId: string;
  distance: number | null;
  types: string[];
}
