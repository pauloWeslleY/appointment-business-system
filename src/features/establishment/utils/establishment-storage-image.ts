export const getEstablishmentStorageImageKey = (imageUrl?: string | null) => {
  if (!imageUrl) {
    return null
  }
  return imageUrl.startsWith('establishment/') ? imageUrl : null
}
