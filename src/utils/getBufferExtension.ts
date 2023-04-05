import sharp from 'sharp'

const getBufferExtension = async (
  imageBuffer: Buffer
): Promise<keyof sharp.FormatEnum | undefined> => {
  const imageInfo = await sharp(imageBuffer).metadata()
  let extension = imageInfo.format

  const extensionMap = {
    jpeg: 'jpeg',
    jpg: 'jpeg',
    png: 'png',
    gif: 'gif',
    svg: 'svg+xml'
  }

  if (extension !== undefined && extensionMap[extension] !== undefined) {
    extension = extensionMap[extension]
  }

  return extension
}

export default getBufferExtension
