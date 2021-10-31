import { compare, hash } from 'bcrypt'

export const encrypt = async (value: string) => {
  const salt = Number(process.env.SALT) || 12
  return hash(value, salt)
}

export const compare_hash = async (data: string, hashed_data: string) => compare(data, hashed_data)
