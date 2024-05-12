export interface Account {
  clientNumber: string;
  accountNumber: string;
  type: string;
  currency: {
    GEL: true;
    USD: false;
    EUR: false;
  };
  currencies?: string[];
  status: string;
  id: string
}

export type Currencies = 'GEL' | 'USD' | 'EUR';
