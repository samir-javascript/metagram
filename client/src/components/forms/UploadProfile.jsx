/* eslint-disable react/prop-types */
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
 import profile from "../../assets/profile.png"

const UploadProfile = ({ fieldChange, setImage, mediaUrl, }) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFileUrl(reader.result);
          setImage(reader.result); // Set image state
          fieldChange(acceptedFiles);
        };
        reader.readAsDataURL(acceptedFiles[0]);
       
      }
  }, [fieldChange, setImage]);
   
  const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: 'image/*', // Accept image and video files
  });

  return (
      <div  {...getRootProps()}>
          <input  {...getInputProps()} />
         <div className="flex items-center gap-4 cursor-pointer">
            <img className='rounded-full w-[75px] h-[75px] object-top object-contain ' src={fileUrl || profile} alt="profile" />
            <p className='font-medium text-black dark:text-white text-[15px] leading-[140%] '>Change profile picture</p>
         </div>
      </div>
  ); 

};
export default UploadProfile
