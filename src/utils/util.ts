import axios, { AxiosError, HttpStatusCode } from 'axios'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return axios.isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatNumberCurrency(value: number = 0) {
  return new Intl.NumberFormat('de-DE').format(value)
}

export function formatNumberToSocialStyle(value: number = 0) {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export const rateSale = (original: number, sale: number) => Math.round((original - sale) / original) / 100 + '%'

export const removeSpecialCharacter = (str: string) => {
  return str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
}

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '') + `-i,${id}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i,')
  return arr[arr.length - 1]
}
