import React, { useRef, useState } from 'react'
import styled from 'styled-components'

import ImageIcon from '../../../assets/icons/image.svg';
import Title from './Title';
import { gray1 } from '../../../assets/styles/palettes';
import CameraIcon from '../../../assets/icons/camera.svg';
import XIcon from '../../../assets/icons/x.svg'

type imageFile= {
  file : File;
  id : number;
}

type imagePath={
  path : string;
  id : number;
}

const Wrapper = styled.div`
    width: 100%;
    height: 135px;
`

const ImageWrapper = styled.div`
  width : 100%;
  height: auto;
  margin-top : 3%;

  display : flex;
  flex-direction: row;

  overflow-x: scroll;
  white-space: nowrap;
  
  scrollbar-width: none;
  -webkit-overflow-scrolling: none;
`

const ButtonDiv = styled.div`
  background-color: ${gray1};
  width: 100px;
  height: 100px;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  display: none;
`

const ImageDiv = styled.div`
  position : relative;
  margin-left : 3%;
`

const StyledImage = styled.img`
  border-radius: 10px;
  min-width: 100px;
  width: 100px;
  height: 100px;
  object-fit: cover;
`

const XImage = styled.img`
  width: 15%;
  position : absolute;
  top : 3%;
  right: 3%;
`

export default function ImageContainer() {
  const [size , setSize] = useState(0);
  const [imgFile, setImgFile] = useState<imageFile[]>([]);
  const [imgPath, setImgPath] = useState<imagePath[]>([]);
  const imgRef = useRef<HTMLInputElement>(null);

  const onUploadImage = () => {
    if(imgRef.current && imgRef.current.files){
      const img = imgRef.current.files[0];

      if(!img) return;
      
      setImgFile([{file : img, id : size} , ...imgFile]);

      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        setImgPath([{path : reader.result as string, id : size}, ...imgPath])
      }

      setSize(size+1);
    }
  }

  const onDeleteImage = (key : number) => {
    setImgFile(imgFile.filter(x => x.id !== key));
    setImgPath(imgPath.filter(x => x.id!==key));
  }

  
  return (
    <Wrapper>
      <Title icon = {ImageIcon} name = "사진"/>
      <ImageWrapper>
        <label htmlFor='file_upload'>
          <ButtonDiv>
            <img src = {CameraIcon}/>
          </ButtonDiv>
        </label>
        <Input
          type="file"
          id="file_upload"
          accept="image/jpg, image/png, image/jpeg"
          onChange={onUploadImage}
          ref = {imgRef}
        />
        {
          imgPath && imgPath.map((image)=>(
            <ImageDiv  key = {image.id}>
              <StyledImage 
                src = {image.path}
              />
              <XImage src = {XIcon} onClick={() => onDeleteImage(image.id)}/>
            </ImageDiv>
          ))
        }
      </ImageWrapper>
    </Wrapper>
  )
}
