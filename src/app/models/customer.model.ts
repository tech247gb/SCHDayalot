import { clubModel } from "./club.model";
import { CustomerClubModel } from "./customerClub.model";

export class customerModel {
  id?: number;
  FirstName: string = "";
  LastName: string = "";
  emailaddress: string;
  TelephoneNumber: string;
  TelephonePrefix: string;
  Gender: string;
  Birthdate: Date;
  Contact_id: string = "";
  ContactType: number;
  ProfessionCode: number;
  dayelet_id: number;
  Supervisor_id: number;
  AddressPostalcode: number;
  City: string;
  ShiftId: number;
  // Club: Array<clubModel>;
  // Club: string;
  Club: Array<object>;
  customerClub = new CustomerClubModel();
}
