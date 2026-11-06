import type { CustomerFormData } from '../types/customer-form-data.type'
import type { CustomerApiResponse } from '../types/customer-response.api.type'

// Telefone fixo tem DDD + 8 dígitos; os demais números são tratados como celular.
const TELEPHONE_DIGITS_LENGTH = 10

type CustomerPhoneType = CustomerFormData['phones'][number]['type']

function toCustomerPhoneType(phone: string): CustomerPhoneType {
  const isTelephone = phone.length === TELEPHONE_DIGITS_LENGTH

  if (isTelephone) {
    return 'telephone'
  }

  return 'cellphone'
}

export function toCustomerFormValues(
  customer: CustomerApiResponse,
): CustomerFormData {
  let gender: CustomerFormData['gender'] = []
  if (
    customer.gender === 'male' ||
    customer.gender === 'female' ||
    customer.gender === 'other'
  ) {
    gender = [customer.gender]
  }
  return {
    name: customer.name,
    email: customer.email,
    phones: customer.phones.map((phone) => ({
      phone,
      type: toCustomerPhoneType(phone),
    })),
    notes: customer.notes ?? '',
    birthDate: customer.birthDate?.slice(0, 10) ?? '',
    gender,
  }
}

export function toCustomerRequestValues(data: CustomerFormData) {
  return {
    ...data,
    phones: data.phones.map(({ phone }) => phone),
    gender: data.gender?.[0] ?? null,
    notes: data.notes || null,
    birthDate: data.birthDate || null,
  }
}
