export const validateOpeningHoursField = (value: string) => {
  const [hours, minutes] = value.split(':').map(Number)
  return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60
}
