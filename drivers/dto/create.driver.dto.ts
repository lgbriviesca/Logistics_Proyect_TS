export interface CreateDriverDto {
  id: string;
  firstname: string;
  lastName: string;
  secondLastName?: string;
  drivingLicense: number;
  phoneNumber: number;
  daysOff: string;
  status: string;
}
