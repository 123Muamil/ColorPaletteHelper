// import { RootState } from "@/store/store";
import React, {  useEffect, useState } from "react";
import Cards from "./Cards";
import { FaUser, FaPalette, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setComponent } from "@/reducers/componentSlice";
import { useSearchParams } from "next/navigation";

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
  const themes=useSelector((state:RootState)=>state.theme.data)
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
  return (
    <>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Cards cardData={cardData}  />
         </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      
        {/* Render theme data */}
        {searchData.map((theme,index) => (
          <div
            key={index}
            className={`rounded-lg shadow-md overflow-hidden`}
            style={{ backgroundColor: theme.backgroundColor }}
          >
            <div className="p-4">
              <h3
                className="text-lg font-semibold"
                style={{ color: theme.textColor,fontFamily:theme.font }}
              >
                {theme.themeName}
              </h3>
              <p
                className="text-gray-600"
                style={{ color: theme.descriptionColor,fontFamily:theme.font }}
              >
                {theme.themeDescription.slice(0,149)}
              </p>
              <div className="flex gap-3">
              <button
                className={`mt-4 px-4 py-3 rounded hover:bg-opacity-90`}
                style={{
                  backgroundColor: theme.buttonBackgroundColor,
                  color: theme.buttonTextColor,
                  
                }}
                onClick={()=>ApplyTheme(theme.id)}
              >
                Apply Theme
              </button>
              <button
                className={`mt-4 px-4 py-3 rounded hover:bg-opacity-90`}
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
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewTheme;
