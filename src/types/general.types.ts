export type NavbarItem = {
  path: any;
  name: string;
  icon: string;
  children?: NavbarItem[];
};

export interface GeneralOption {
  label: string;
  id: string | number;
}

export interface GeneralOptionsResponse {
  data: GeneralOption[];
}
