import { User } from 'src/types/user.type'
import { ResponseApi } from 'src/types/utils.type'

export type AuthResponse = ResponseApi<{
  access_token: string
  expires: string
  user: User
}>
