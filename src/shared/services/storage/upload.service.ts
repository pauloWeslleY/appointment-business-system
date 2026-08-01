import axios from 'axios'

if (!import.meta.env.VITE_API_URL) {
  throw new Error('VITE_API_URL is not defined in the environment variables.')
}

export const UploadFolder = {
  SERVICES: 'services',
  ESTABLISHMENT: 'establishment',
  USERS: 'users',
  OWNERS: 'owners',
  COLLABORATORS: 'collaborators',
} as const

export interface UploadFileResponse {
  key: string
  uploadUrl: string
  publicUrl: string
}

export type UploadFolderType = (typeof UploadFolder)[keyof typeof UploadFolder]

export interface UploadFileData {
  id: string
  file: File
  folder: UploadFolderType
}

export const uploadFileToR2 = async (
  params: UploadFileData,
): Promise<UploadFileResponse> => {
  const url = `${import.meta.env.VITE_API_URL}/storage/upload`

  const createUrlResponse = await axios.post<UploadFileResponse>(
    url,
    {
      id: params.id,
      filename: params.file.name,
      contentType: params.file.type,
      folder: params.folder,
    },
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  if (!createUrlResponse.status || createUrlResponse.status !== 200) {
    throw new Error('Não foi possível gerar a URL de upload')
  }

  const uploadData = createUrlResponse.data

  const uploadResponse = await axios.put(uploadData.uploadUrl, params.file, {
    headers: {
      'Content-Type': params.file.type,
    },
  })

  if (uploadResponse.status !== 200) {
    throw new Error('Não foi possível enviar o arquivo ao R2')
  }

  return uploadData
}
