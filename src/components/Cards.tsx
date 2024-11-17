
import { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';
interface cardData {
    id:string
    title: string;
    amount: number;
    icon: React.ReactNode;
  }
  interface CardsProps {
    cardData: cardData[];  // Assuming searchData is an array of SearchDataItem objects
  }

const Card:React.FC<CardsProps> = ({cardData}) => {
    const themes=useSelector((state:RootState)=>state.theme.data)
    const currentTheme=themes.find((currentTheme)=>currentTheme.id===cardData[0]?.id)
    // console.log(currentTheme)
  return (
    <>
    {
         cardData.map((item,index)=>{
             return <div key={index} className=" h-[120px] mt-2 mb-2 rounded-lg overflow-hidden shadow-lg bg-white relative "
             style={{backgroundColor:currentTheme?.backgroundColor}}
             >
               {item.icon}
             <div className="p-4 pt-10"> {/* Adjusted padding to make room for the icon */}
               <h3 className="text-sm font-semibold text-gray-900" style={{color:currentTheme?.textColor}}>{item.title}</h3>
               <p className="text-gray-700 text-sm mt-2" style={{color:currentTheme?.textColor}}>{item.amount}</p>
             </div>
           </div>
         })
    }
    </>
  );
};

export default Card;
