import bcrypt from 'bcryptjs'

export async function validateCredentials(username: string, password: string): Promise<boolean> {
  const expectedUser = process.env.ADMIN_USER
  const expectedHash = process.env.ADMIN_PASSWORD_HASH

  if (!expectedUser || !expectedHash) return false
  if (username !== expectedUser) return false

  return bcrypt.compare(password, expectedHash)
}

export async function generateHash(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}
