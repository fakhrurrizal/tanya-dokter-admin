export interface GlobalIDName {
  id: number;
  name: string;
}

export interface ResponseMe {
  data: {
    id: number;
    fullname: string;
    email: string;
    phone: string;
    address: string;
    village: string;
    district: string;
    city: string;
    province: string;
    country: string;
    zip_code: string;
    existing_package: GlobalIDName;
    status: number;
    role: GlobalIDName;
    role_id: number;
    email_verified: boolean;
    created_at: string;
  };
  message: string;
  status: number;
}

export interface ResponseLogin {
  data?: {
    access_token: string;
    expiration: string;
    user: ResponseMe["data"];
  };
}

export interface CategorySpecsialistResponse {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  error: string;
  status: number;
  message: string;
  data: {
    id: number;
    code: string;
    description: string;
    name: string;
    image: string;
    status: number;
  };
  search: string;
  next: boolean;
  back: boolean;
  limit: number;
  offset: number;
  total_page: number;
  current_page: number;
  sort: string;
  order: string;
  last_updated: Date;
}

export interface DataDrugsResponse {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  error: string;
  status: number;
  message: string;
  data: {
    id: number;
    code: string;
    description: string;
    name: string;
    usage: string;
    image: string;
  };
  search: string;
  next: boolean;
  back: boolean;
  limit: number;
  offset: number;
  total_page: number;
  current_page: number;
  sort: string;
  order: string;
  last_updated: Date;
}

export interface ResponseUploadFile {
  data: {
    id: string;
    created_at: string;
    updated_at: string;
    token: string;
    user_id: number;
    filename: string;
    full_url: string;
  };
  message: string;
  status: number;
}
