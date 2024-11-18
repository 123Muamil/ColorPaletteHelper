"use client"
import { RootState } from '@/store/store';
import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';

type ModalProps = {
    isModalOpen: boolean; // Indicates whether the modal is open
    closeModal: () => void; 
    id:string;// Function to close the modal
  };
  
const Modal:React.FC<ModalProps> = ({isModalOpen,closeModal,id}) => {
    const themes=useSelector((state:RootState)=>state.theme.data)
    const currentTheme=themes.find((currentTheme)=>currentTheme.id===id)
  return (
    <>
       {isModalOpen && (
        <div
          id="modelConfirm"
          className="fixed z-50 inset-0 bg-[#7F7F7F]  bg-opacity-60 overflow-y-auto h-full w-full px-4"
         
        >
          <div className="relative top-10 mx-auto shadow-xl rounded-md bg-white max-w-md"  style={{backgroundColor:currentTheme?.backgroundColor}}>
            <div className="flex justify-end p-2">
              <button
                onClick={closeModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
               <IoCloseOutline size={24} />
              </button>
            </div>

            <div className="p-6 pt-0 text-center">
  {/* <!-- Title --> */}
  <h3 className="text-xl font-semibold  mb-4 sm:text-2xl md:text-3xl lg:text-4xl"
  style={{color:currentTheme?.textColor}}
  >
    {currentTheme?.themeName}
  </h3>
  
  {/* <!-- Description --> */}
  <p className="text-gray-500 text-sm sm:text-base md:text-lg mb-4 mx-auto max-w-xl"
  style={{color:currentTheme?.descriptionColor,textAlign:'justify'}}
  >
  {currentTheme?.themeDescription}
  </p>
  
  {/* <!-- Link --> */}
  <a
    href={currentTheme?.link}
    className=" hover:text-blue-800 px-3 text-sm sm:text-base md:text-lg mb-4 inline-block"
   style={{color:currentTheme?.linkColor}}
  >
    Visit Our Website
  </a>
  
  {/* <!-- Button --> */}
  <button
    className="mt-4 px-6 py-3 rounded-[10px] text-white hover:bg-blue-700 transition duration-300 text-sm sm:text-base md:text-lg"
    style={{backgroundColor:currentTheme?.buttonBackgroundColor,color:currentTheme?.buttonTextColor}}
  >
    Click Here
  </button>
</div>

          </div>
        </div>
      )}
    </>
  )
}

export default Modal
