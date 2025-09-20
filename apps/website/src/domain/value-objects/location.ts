export interface LocationData {
  readonly name: string;
  readonly address?: string;
  readonly city: string;
  readonly country: string;
  readonly isOnline: boolean;
  readonly coordinates?: {
    readonly latitude: number;
    readonly longitude: number;
  };
}

export class Location {
  private constructor(private readonly data: LocationData) {
    this.validate(data);
  }

  public static create(data: LocationData): Location {
    return new Location(data);
  }

  public static online(name: string = 'Online'): Location {
    return new Location({
      name,
      city: 'Virtual',
      country: 'Online',
      isOnline: true,
    });
  }

  public static physical(params: {
    name: string;
    address?: string;
    city: string;
    country: string;
    coordinates?: { latitude: number; longitude: number };
  }): Location {
    return new Location({
      ...params,
      isOnline: false,
    });
  }

  public getName(): string {
    return this.data.name;
  }

  public getAddress(): string | undefined {
    return this.data.address;
  }

  public getCity(): string {
    return this.data.city;
  }

  public getCountry(): string {
    return this.data.country;
  }

  public isOnline(): boolean {
    return this.data.isOnline;
  }

  public isPhysical(): boolean {
    return !this.data.isOnline;
  }

  public getCoordinates(): { latitude: number; longitude: number } | undefined {
    return this.data.coordinates;
  }

  public getFullAddress(): string {
    if (this.data.isOnline) {
      return this.data.name;
    }

    const parts = [this.data.name];
    if (this.data.address) {
      parts.push(this.data.address);
    }
    parts.push(this.data.city, this.data.country);

    return parts.join(', ');
  }

  public hasCoordinates(): boolean {
    return this.data.coordinates !== undefined;
  }

  public equals(other: Location): boolean {
    return (
      this.data.name === other.data.name &&
      this.data.address === other.data.address &&
      this.data.city === other.data.city &&
      this.data.country === other.data.country &&
      this.data.isOnline === other.data.isOnline &&
      this.coordinatesEqual(this.data.coordinates, other.data.coordinates)
    );
  }

  public toPersistence(): LocationData {
    return { ...this.data };
  }

  private validate(data: LocationData): void {
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('Location name cannot be empty');
    }

    if (data.name.length > 100) {
      throw new Error('Location name cannot exceed 100 characters');
    }

    if (!data.city || data.city.trim().length === 0) {
      throw new Error('Location city cannot be empty');
    }

    if (!data.country || data.country.trim().length === 0) {
      throw new Error('Location country cannot be empty');
    }

    if (data.coordinates) {
      this.validateCoordinates(data.coordinates);
    }

    if (!data.isOnline && !data.address) {
      throw new Error('Physical location must have an address');
    }
  }

  private validateCoordinates(coordinates: { latitude: number; longitude: number }): void {
    if (coordinates.latitude < -90 || coordinates.latitude > 90) {
      throw new Error('Latitude must be between -90 and 90 degrees');
    }

    if (coordinates.longitude < -180 || coordinates.longitude > 180) {
      throw new Error('Longitude must be between -180 and 180 degrees');
    }
  }

  private coordinatesEqual(
    a: { latitude: number; longitude: number } | undefined,
    b: { latitude: number; longitude: number } | undefined
  ): boolean {
    if (a === undefined && b === undefined) {
      return true;
    }
    if (a === undefined || b === undefined) {
      return false;
    }
    return a.latitude === b.latitude && a.longitude === b.longitude;
  }
}