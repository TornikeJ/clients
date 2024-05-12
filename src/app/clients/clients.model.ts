export interface ClientsList {
  id: string;
  clientNumber: number;
  clientId: number;
  name: string;
  surname: string;
  phoneNumber: number;
  legalCountry: string;
}

export interface Client {
  id: string;
  clientNumber: number;
  clientId: number;
  name: string;
  surname: string;
  gender?: string;
  phoneNumber: number | string;
  legalAddress: string;
  legalCountry: string;
  legalCity: string;
  factAddress: string;
  factCountry: string;
  factCity: string;
  photo?: string;
}

export interface ClientListResponse {
  data: ClientsList[];
  items: number
}

export interface ClientImage {
  id: string;
  imageUrl: string;
}
