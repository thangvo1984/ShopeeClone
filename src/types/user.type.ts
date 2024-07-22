type Role = 'User' | 'Admin'

export interface User {
  roles: Role[]
  _id: string
  email: string
  name: string
  address: string
  phone: string
  date_of_birth: string
  createdAt: string
  updatedAt: string
  __v: 0
}
