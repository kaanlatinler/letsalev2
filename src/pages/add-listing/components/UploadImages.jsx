
import { CarImages } from '../../../../configs/schema';
import { storage } from '../../../../configs/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { db } from '../../../../configs';
import { useNavigate } from 'react-router-dom';
import { eq } from 'drizzle-orm';

const UploadImages = ({triggerUploadImages, setLoader, carInfo, mode}) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [editCarImages, setEditCarImages] = useState([]);

    useEffect(() => {
        if(mode == 'edit'){
            setEditCarImages([]);
            carInfo?.images?.forEach(image => {
                setEditCarImages((prevImages) => [...prevImages, image?.imageUrl]);
            });
        }
    }, [carInfo])
    const navigate = useNavigate()


    useEffect(() => {
        if(triggerUploadImages){
            uploadImageToServer();
            navigate('/profile')
        }
    },[triggerUploadImages])

    const onFileSelected=(e)=>{
        const files = e.target.files;
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            setSelectedFiles((prevFiles) => [...prevFiles, file]);
        }
    }

    const onImageRemove = (file, index) => {
        const res = selectedFiles.filter((item) => item != file);
        setSelectedFiles(res);
    }

    const onImageRemoveFromDB = async (file, index) => {
        const res = await db.delete(CarImages).where(eq(CarImages.id, index));

        const imgList = editCarImages.filter((item) => item != file);
        setEditCarImages(imgList);
    }

    const uploadImageToServer = async () => {
        setLoader(true);
        await selectedFiles.forEach((file) => {
            const fileName = Date.now() + '.jpeg';
            const storageRef = ref(storage, 'LetsSale/' + fileName);
            const metaData = {
                contentType: 'image/jpeg',
            };
            
            uploadBytes(storageRef, file, metaData)
                .then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                    return getDownloadURL(storageRef);
                })
                .then(async(downloadUrl) => {
                    console.log(downloadUrl);
                    await db.insert(CarImages).values({
                        imageUrl: downloadUrl,
                        carListingId: triggerUploadImages
                    })
                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                });
                setLoader(false);
        });
    };
    

  return (
    <div>
        <h2 className='font-medium text-xl my-3'>Upload Car Images</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>
            {mode == 'edit' ? 
            editCarImages.map((file, index) => (
                <div key={index} className=''>
                    <IoCloseCircle className='absolute m-2 text-3xl text-white' onClick={()=>onImageRemoveFromDB(file, index)} />
                    <img src={file} alt="car" className='w-full h-[130px] object-cover rounded-xl' />
                </div>
            )) :
            selectedFiles.map((file, index) => (
                <div key={index} className=''>
                    <IoCloseCircle className='absolute m-2 text-3xl text-white' onClick={()=>onImageRemove(file, index)} />
                    <img src={URL.createObjectURL(file)} alt="car" className='w-full h-[130px] object-cover rounded-xl' />
                </div>
            ))}
            <label htmlFor="uploadImages">
                <div className='border rounded-xl border-dotted border-primary bg-slate-400 p-10 cursor-pointer hover:shadow-md flex justify-center items-center'>
                    <FaPlus className='text-primary text-xl' />
                </div>
            </label>
            <input type="file" id="uploadImages" onChange={onFileSelected} multiple={true} className='opacity-0' />
        </div>
    </div>
  )
}

export default UploadImages;
