import { AppointmentStatus } from '../types/appointment-status.type'

export const optionsStatusAppointmentConfirmedCancelled = new Set<string>([
  AppointmentStatus.CONFIRMED,
  AppointmentStatus.CANCELLED,
])

export const optionsStatusAppointmentConcludedCancelled = new Set<string>([
  AppointmentStatus.CONCLUDED,
  AppointmentStatus.CANCELLED,
])

export const statusAppointmentCancelled = new Set<string>([
  AppointmentStatus.CANCELLED,
])
