import {
  type UploadFileData,
  type UploadFileResponse,
  uploadFileToR2,
} from './upload.service'

export const uploadFiles = async (
  file: File | null,
  { id, folder }: Pick<UploadFileData, 'id' | 'folder'>,
) => {
  let urlImage: UploadFileResponse | undefined

  if (file) {
    urlImage = await uploadFileToR2({ id, file, folder })
  }

  return urlImage?.key ?? null
}
