import type { AddressFormData } from '../types/address-form.type'
import type { AddressSummaryApiResponse } from '../types/address-response.api.type'

export const toAddressFormValues = (
  address: AddressSummaryApiResponse,
): AddressFormData => ({
  countryCode: address.countryCode,
  postalCode: address.postalCode,
  state: address.state,
  city: address.city,
  neighborhood: address.neighborhood,
  street: address.street,
  number: address.number,
  complement: address.complement ?? '',
  latitude: address.latitude,
  longitude: address.longitude,
})
