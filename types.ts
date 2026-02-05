
export enum View {
  SPLASH = 'SPLASH',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  STUDENTS = 'STUDENTS',
  TRIP_STATUS = 'TRIP_STATUS',
  PROFILE = 'PROFILE',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  ADMIN_BUSES = 'ADMIN_BUSES',
  ADMIN_STUDENTS = 'ADMIN_STUDENTS'
}

export enum UserRole {
  STUDENT = 'student',
  INSTITUTION = 'institution',
  DRIVER = 'driver'
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  rollNumber: string;
  boarded: boolean;
  boardedTime?: string;
  dropped?: boolean;
  droppedTime?: string;
  parentPhone?: string;
  avatar: string;
  institution_id?: string;
  assignedBus?: string;
}

export interface Bus {
  id: string;
  busNumber: string;
  route: string;
  institution_id: string;
  status: 'active' | 'inactive';
  currentLat?: number;
  currentLng?: number;
}

export interface TripState {
  isActive: boolean;
  busNumber: string;
  route: string;
  startTime?: Date;
  nextStop: string;
  nextStopEta: string;
  distance: string;
  speed: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface StudentLocation extends Student {
  pickupLocation?: Location;
  pickupAddress?: string;
}

export interface BusRoute {
  id: string;
  busNumber: string;
  routeName: string;
  institutionId: string;
  startLocation?: Location;
  endLocation?: Location;
  stops: BusStop[];
}

export interface BusStop {
  id: string;
  routeId: string;
  stopName: string;
  location: Location;
  stopOrder: number;
  estimatedTime?: string;
  students: Student[];
}

export interface BusLocation {
  id: string;
  busNumber: string;
  institutionId: string;
  location: Location;
  heading?: number;
  speed?: number;
  updatedAt: Date;
}

