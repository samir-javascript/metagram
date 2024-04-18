/* eslint-disable react/prop-types */
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
 import { Button } from '../ui/button';
import FileUploadIcon from "../../assets/file-upload.svg"
const UploadFile = ({ fieldChange, setImage, mediaUrl, isLoading}) => {
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
      accept: 'image/*',
      disabled: isLoading
      // Accept image and video files
  });

  return (
      <div className="flex flex-col items-center rounded-xl bg-secondary-100 dark:bg-[#151821] cursor-pointer" {...getRootProps()}>
          <input disabled={isLoading} {...getInputProps()} />
          {fileUrl ? (
             
                  <div className="relative w-full flex justify-center p-4 lg:p-10">
                      <img  src={fileUrl} alt="media" className="file_uploader-img" />
                  </div>
              
          ) : (
              <div className="file_uploader-box">
                  <img src={FileUploadIcon} alt='upload img' width={96} height={76} />
          <h3 className='mb-2 mt-6 base-medium dark:text-white text-black/50'>Add Or Drag Photo Here</h3>
          <p className='text-black dark:text-white mb-6 small-regular'>SVG, png, jpeg, svg</p>
          <Button  type='button' className='!shad-button_secondary'>
            Select from computer
          </Button>
              </div>
          )}
      </div>
  );

};
export default UploadFile

