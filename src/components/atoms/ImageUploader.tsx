import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import {
  EditStudentRequest,
  NewStudentRequest
} from '@/types/interfaces/Student'

interface Props {
  setStudentData: Dispatch<
  SetStateAction<NewStudentRequest | EditStudentRequest>
  >
}

const ImageUploader: React.FC<Props> = ({ setStudentData }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files != null) {
      const imageFile = event.target.files[0]
      setSelectedImage(imageFile)

      const fr = new FileReader()
      fr.readAsArrayBuffer(imageFile)
      fr.onload = () => {
        const blob = new Blob([fr.result] as BlobPart[], {
          type: imageFile.type
        })
        setStudentData((prev) => ({
          ...prev,
          profileImage: blob
        }))
      }
    }
  }

  return (
    <Grid item display='flex' alignItems='end' gap={3}>
      <Box>
        <Typography variant='h6' mb={2}>
          Profile pic:
        </Typography>
        {selectedImage != null
          ? (
            <Paper sx={{ p: 2 }}>
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt='Selected image to upload'
                width={100}
                height={100}
              />
            </Paper>
            )
          : (
            <Alert severity='info'>No image selected</Alert>
            )}
      </Box>
      <input
        accept='image/*'
        id='contained-button-file'
        type='file'
        name='profilepic'
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <label htmlFor='contained-button-file'>
        <Button
          variant='outlined'
          component='span'
          startIcon={<CloudUploadIcon />}
        >
          {selectedImage != null ? 'Change' : 'Upload'}
        </Button>
      </label>
    </Grid>
  )
}

export default ImageUploader
