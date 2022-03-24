import React, { useState, useCallback, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { getOrientation } from 'get-orientation/browser'
import Button from '@material-ui/core/Button'

import ImgDialog from './ImgDialog'
import { getRotatedImage, getCroppedImg } from './canvasUtils'
import { styles } from './styles'
import Icon from '../utilities/Icon'
import "../../styles/addCatalog/easyCrop.css"

const ORIENTATION_TO_ANGLE = {
  '3': 180,
  '6': 90,
  '8': -90,
};

const Demo = (props) => {
  const { setImageSrc, imageSrc, classes, setImageAfterChange, setcloseCropModal, triggerClick, settriggerClick, disapearSave } = props
  // const [imageSrc, setImageSrc] = React.useState(defaultImg)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)


  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {

    try {
      const croppedImage =
        await getCroppedImg(
          imageSrc,
          croppedAreaPixels,
          rotation
        )
      setCroppedImage(croppedImage)
      setImageAfterChange(croppedImage)
      setCroppedImage(null)
      if (settriggerClick)
        settriggerClick(false)
      if (setcloseCropModal)
        setcloseCropModal(false)
    } catch (e) {
      console.error(e)
      alert("catch")

    }
    // eslint-disable-next-line
  }, [imageSrc, croppedAreaPixels, rotation])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])

  const onFileChange = async (e) => {

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)

      // apply rotation if needed
      const orientation = await getOrientation(file)
      const rotation = ORIENTATION_TO_ANGLE[orientation]
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
      }
      setImageSrc(imageDataUrl)
    }
  }
  // eslint-disable-next-line
  useEffect(async () => {
    if (triggerClick) {
      alert("useEffect")
      await showCroppedImage();
    }// eslint-disable-next-line
  }, [triggerClick])

  return (
    <div>
      <React.Fragment>
        <div className={classes.cropContainer}>
          <Cropper
            image={imageSrc}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className={classes.controls}>
          <div className={classes.sliderContainer}>
            <Typography
              variant="overline"
              classes={{ root: classes.sliderLabel }}
            >
              <Icon name="scale" />
            </Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              classes={{ root: classes.slider }}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </div>
          <div className={classes.sliderContainer}>
            <Typography
              variant="overline"
              classes={{ root: classes.sliderLabel }}
            >
              {/* Rotation */}
              <Icon name="rotation" />
            </Typography>
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              classes={{ root: classes.slider }}
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </div>
          <div className="uploadWrapper" onClick={() => { document.getElementById("inputFileImg").click() }} >
            <Icon name="upload" />
          </div>
          <Button
            id="saveBtnCrop"
            className={disapearSave ? 'd-none' : ""}
            onClick={showCroppedImage}
            variant="contained"
            color="primary"
            classes={{ root: classes.cropButton }}
          >
            save
          </Button>

          <input className='d-none' id="inputFileImg" type="file" onChange={onFileChange} accept="image/*" />
        </div>
        <ImgDialog img={croppedImage} onClose={onClose} />
      </React.Fragment>

    </div>
  )
}

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

export const StyledDemo = withStyles(styles)(Demo)