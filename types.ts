
export enum View {
  SPLASH = 'SPLASH',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  STUDENTS = 'STUDENTS',
  TRIP_STATUS = 'TRIP_STATUS',
  PROFILE = 'PROFILE'
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  boarded: boolean;
  boardedTime?: string;
  avatar: string;
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
