export interface LoginDTO {
    username: string;
    password: string;
  }


export interface SessionDTO {
    userSession: string;
  }

export interface AddressDTO {
    street: string;
    city: string;
    state: string;
    zip: string;
}

export interface RecommendationsDTO {
  id: number;
  name: string;
  price: number;
};

export interface ResetPasswordDTO {
  username: string;
  password: string;
}

