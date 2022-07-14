import { body } from 'express-validator';

export class LoginResponseDTO {
  id!: number
  full_name!: string
  username!: string
  token!: string | null
}

