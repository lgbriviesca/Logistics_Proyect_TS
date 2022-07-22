/** Interfaz PutUserDto.
 *
 * Contiene lo mismo que la interfaz CreateUserDto, pero como el PUT es para
 * actualizar el objeto entero, necesitamos tener los campos opcionales obligatorios.*/
export interface PutDriverDto {
  id: string;
  firstname: string;
  lastName: string;
  secondLastName: string;
  drivingLicense: number;
  phoneNumber: number;
  daysOff: string;
  status: string;
}
