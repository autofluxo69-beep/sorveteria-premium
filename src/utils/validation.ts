import type { CustomerDetails, FormErrors } from '../types/Order';

const PHONE_REGEX = /^(\+244)?\s?9\d{2}\s?\d{3}\s?\d{3}$/;

export function validateCustomerDetails(
  customer: CustomerDetails
): FormErrors {
  const errors: FormErrors = {};

  if (!customer.name.trim() || customer.name.trim().length < 3) {
    errors.name = 'Indique o seu nome completo.';
  }

  if (!PHONE_REGEX.test(customer.phone.trim())) {
    errors.phone = 'Indique um número válido, ex: 9XX XXX XXX.';
  }

  if (!customer.address.trim() || customer.address.trim().length < 5) {
    errors.address = 'Indique a rua/avenida para a entrega.';
  }

  if (!customer.neighborhood.trim()) {
    errors.neighborhood = 'Indique o bairro.';
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
