export default interface ICreateDoctorDTO {
  name: string;

  crm: string;

  landline?: string;

  cellPhone: string;

  cep: string;

  specialties: string[];
}
