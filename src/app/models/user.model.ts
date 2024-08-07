// src/app/models/user.model.ts
export interface User {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
    email: string;
  }
 export interface UserResponse {
    data: User;
  }
  