// import { RootState } from "@/store/store";
import React, {  useEffect, useState } from "react";
import Cards from "./Cards";
import { FaUser, FaPalette, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setComponent } from "@/reducers/componentSlice";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Modal from "./Modal";
import { FaTrash } from 'react-icons/fa';
import { deleteById } from "@/reducers/themeSlice";
interface SearchDataItem {
  id: string;
  themeName: string;
  themeDescription:string,
  textColor:string,
  descriptionColor:string,
  backgroundColor: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
  linkColor: string;
  font: string;
}
interface ViewThemeProps {
  searchData: SearchDataItem[];  // Assuming searchData is an array of SearchDataItem objects
}
interface cardData {
  id:string;
  title: string;
  amount: number;
  icon: React.ReactNode;
}

const ViewTheme: React.FC<ViewThemeProps> = ({ searchData }) => {
  const [cardData, setCardData] = useState<cardData[]>([]);
  const [id,setId]=useState<string>('')
  const [modalId,setModalId]=useState<string>('')
  const themes=useSelector((state:RootState)=>state.theme.data)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentTheme=themes.find((currentTheme)=>currentTheme.id===id)
  const searchParams = useSearchParams();
  const dispatch=useDispatch()
  useEffect(() => {
    const queryParam = searchParams.get('view');
    if (queryParam === 'Create') {
      dispatch(setComponent('AddTheme'));
    } else if (queryParam === 'View') {
      dispatch(setComponent('ViewTheme'));
    }
  }, [searchParams, dispatch]);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(()=>{
    setCardData([
      {
        id:id,
        title: 'Users',
        amount: 200,
        icon: <FaUser className="text-gray-600 text-2xl absolute top-2 left-2" style={{color:currentTheme?.textColor}} />,
      },
      {
        id:id,
        title: 'Themes',
        amount: themes.length,
        icon: <FaPalette className="text-gray-600 text-2xl absolute top-2 left-2" style={{color:currentTheme?.textColor}} />,
      },
      {
        id:id,
        title: 'Likes',
        amount: 1_500,
        icon: <FaThumbsUp className="text-gray-600 text-2xl absolute top-2 left-2" style={{color:currentTheme?.textColor}}/>,
      },
      {
        id:id,
        title: 'Dislikes',
        amount: 300,
        icon: <FaThumbsDown className="text-gray-600 text-2xl absolute top-2 left-2"  style={{color:currentTheme?.textColor}}/>,
      },
    ])
  },[id])
  const ApplyTheme=(id:string)=>{
          setId(id)
  }
  const getColors=async()=>{
    const textToCopy = `backgroundColor: ${currentTheme?.backgroundColor}
\ntextColor: ${currentTheme?.textColor}
\ntextColor: ${currentTheme?.descriptionColor}
\nbuttonBackgroundColor: ${currentTheme?.buttonBackgroundColor}
\nbuttonTextColor: ${currentTheme?.buttonTextColor}
\nlinkColor: ${currentTheme?.linkColor}
`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('Product details copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }
  const openModal = (id:string) => {
    setModalId(id)
    setIsModalOpen(true);
    document.body.classList.add("overflow-y-hidden");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("overflow-y-hidden");
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };
const deleteTheme=(id:string)=>{
   dispatch(deleteById(id))
}
  return (
    <>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Cards cardData={cardData}  />
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
  {/* Render theme data */}
  {searchData.map((theme, index) => (
    <div
      key={index}
      className={`relative rounded-lg shadow-md overflow-hidden group`} // Add 'group' class for hover functionality
      style={{ backgroundColor: theme.backgroundColor }}
    >
      {/* Delete Icon */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <FaTrash
          className=" cursor-pointer"
          style={{color:theme.linkColor}}
          onClick={() => deleteTheme(theme.id)} // Assuming you have a deleteTheme function
        />
      </div>

      <div className="p-4">
        <h3
          className="text-lg font-semibold"
          style={{ color: theme.textColor, fontFamily: theme.font }}
        >
          {theme.themeName}
        </h3>
        <p
          className="text-gray-600"
          style={{ color: theme.descriptionColor, fontFamily: theme.font }}
        >
          {theme.themeDescription.slice(0, 149)}{' '}
          <Link href="/" style={{ color: theme.linkColor }} onClick={() => openModal(theme.id)}>
            Read More
          </Link>
        </p>

        <div className="flex gap-3">
          <button
            className="mt-4 w-[150px] h-[50px] rounded-[30px] hover:bg-opacity-90 bg-opacity-100 flex items-center justify-center text-sm sm:text-base md:text-lg"
            onClick={() => ApplyTheme(theme.id)}
            style={{
              backgroundColor: theme.buttonBackgroundColor,
              color: theme.buttonTextColor,
            }}
          >
            Apply Theme
          </button>

          <button
            className="mt-4 w-[200px] lg:w-[220px] h-[50px] rounded-[30px] flex items-center justify-center text-sm sm:text-base md:text-lg hover:bg-opacity-90"
            style={{
              backgroundColor: theme.buttonBackgroundColor,
              color: theme.buttonTextColor,
            }}
            onClick={getColors}
          >
            Copy Colors Combination
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal isModalOpen={isModalOpen} closeModal={closeModal} id={modalId} />
      {/* End of Modal */}
    </div>
  ))}
</div>
     
    </>
  );
};

export default ViewTheme;
