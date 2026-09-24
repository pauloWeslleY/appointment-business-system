import { FileUpload, Flex, Image } from '@chakra-ui/react'
import { FileText, TrashIcon } from 'lucide-react'

import { Tooltip } from './ui/tooltip'

interface FileUploadCardItemProps {
  file: File
}

const FileUploadCardItem = ({ file }: FileUploadCardItemProps) => {
  const imageType = new Set(['image/jpeg', 'image/png', 'image/gif'])
  const isImage = imageType.has(file.type)
  const urlFileImage = isImage ? URL.createObjectURL(file) : null

  return (
    <FileUpload.Item
      file={file}
      px="4"
      py="3"
      rounded="lg"
      borderWidth="1px"
      borderColor={{ base: 'gray.300', _dark: 'secondary.500/20' }}
      bg={{ base: 'secondary.200', _dark: 'gray.900' }}
      color={{ base: 'gray.900', _dark: 'white' }}
      display="flex"
      alignItems="center"
    >
      <Flex alignItems="center" gap="3" flex="1">
        {urlFileImage && (
          <Image
            src={urlFileImage}
            alt={file.name}
            boxSize="12"
            objectFit="cover"
            rounded="md"
          />
        )}

        {!urlFileImage && <FileText size={18} />}

        <FileUpload.ItemName
          flex="1"
          minW="0"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        />
      </Flex>

      <Tooltip
        content={`Remover ${file.name}`}
        showArrow
        positioning={{ placement: 'top-end' }}
      >
        <FileUpload.ItemDeleteTrigger
          aria-label={`Remover ${file.name}`}
          alignSelf="center"
          color="gray.400"
          _hover={{ color: 'red.400' }}
        >
          <TrashIcon size={16} />
        </FileUpload.ItemDeleteTrigger>
      </Tooltip>
    </FileUpload.Item>
  )
}

export default FileUploadCardItem
