"use client";
import React, { useState } from 'react';
import { SketchPicker } from 'react-color'; 
import Color from '../../public/images/colors.png'
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { createTheme } from '@/reducers/themeSlice';
import { setComponent } from '@/reducers/componentSlice';
import { ColorResult } from 'react-color'; // If you're using react-color
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const fonts = [
    'Arial',
    'Verdana',
    'Helvetica',
    'Tahoma',
    'Trebuchet MS',
    'Times New Roman',
    'Georgia',
    'Garamond',
    'Courier New',
    'Brush Script MT',
    'Lucida Console',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Oswald',
    'Merriweather',
    'PT Sans',
    'Raleway',
    'Ubuntu',
  ];
  const ThemeDescription=`
  A Software Engineer specializing in React, Next.js, Node.js, Express, or NestJS develops dynamic web applications using modern JavaScript frameworks and server-side technologies.
They focus on creating scalable, performant, and maintainable applications, both on the frontend and backend.
Experienced with DevOps tools like Jenkins, Docker, Git, and Puppet to automate workflows and ensure smooth deployment.
Skilled in continuous integration, containerization, and version control for efficient software development.
Passionate about optimizing development pipelines and cloud-based infrastructure.
Dedicated to improving scalability, security, and performance in all stages of software development.
  `
  interface Color{
    color:string
  }
const AddTheme: React.FC = () => {
    const dispatch=useDispatch()
   const [themeName,setThemeName]=useState('Software Engineer')
   const [themeDescription,setThemeDescription]=useState(ThemeDescription)
   const [linkName,setLinkName]=useState<string>('https://123muamil.github.io/Muzamil-Iqbal/')
   const [selectedFont, setSelectedFont] = useState('Arial'); // Default font
   const [backgroundColor,setBackGroundColor]=useState('#FFFFFF')
   const [textColor,setTextColor]=useState('#333')
   const [descriptionColor,setDescriptionColor]=useState('#FFC107')
   const [buttonBackroundColor,setButtonBackgroundColor]=useState('#4CAF50')
   const [buttonTextColor,setButtonTextColor]=useState('#2196F3')
   const [linkColor,setLinkColor]=useState('#9C27B0')
   const [isOpenBackgroundColor,setIsOpenBackgroundColor]=useState(false)
   const [isOpenTextColor,setIsOpenTextColor]=useState(false)
   const [isOpenDescriptionColor,setIsOpenDescriptionColor]=useState(false)
   const [isOpenButtonBackgroundColor,setIsOpenButtonBackgroundColor]=useState(false)
   const [isOpenButtonTextColor,setIsOpenButtonTextColor]=useState(false)
   const [isOpenLinkColor,setIsOpenLinkColor]=useState(false)
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const handleChangeBackgroundColor = (color:ColorResult) => {
    setBackGroundColor(color.hex)
  };
  const handleChangeTextColor = (color:ColorResult) => {
    setTextColor(color.hex);  // Update the selected color
  };
  const handleChangeDescriptionColor=(color:ColorResult)=>{
      setDescriptionColor(color.hex)
  }
  const handleChangeButtonBackgroundColor = (color:ColorResult) => {
    setButtonBackgroundColor(color.hex)
  };
  const handleChangeButtonTextColor = (color:ColorResult) => {
    setButtonTextColor(color.hex)
  };
  const handleChangeLinkColor = (color:ColorResult) => {
    setLinkColor(color.hex)
  };
  const handleOpenBackgroundColor=()=>{
    setIsOpenTextColor(false)
    setIsOpenButtonBackgroundColor(false)
    setIsOpenButtonTextColor(false)
    setIsOpenLinkColor(false)
    setIsOpenDescriptionColor(false)
    setIsOpenBackgroundColor(!isOpenBackgroundColor)
  }
  const handleOpenTextColor=()=>{
    setIsOpenButtonBackgroundColor(false)
    setIsOpenButtonTextColor(false)
    setIsOpenLinkColor(false)
    setIsOpenBackgroundColor(false)
    setIsOpenDescriptionColor(false)
    setIsOpenTextColor(!isOpenTextColor)
  }
  const handleOpenDescriptionColor=()=>{
    setIsOpenButtonBackgroundColor(false)
    setIsOpenButtonTextColor(false)
    setIsOpenLinkColor(false)
    setIsOpenBackgroundColor(false)
    setIsOpenTextColor(false)
    setIsOpenDescriptionColor(!isOpenDescriptionColor)
  }
  const handleOpenButtonBackgroundColor=()=>{
    setIsOpenButtonTextColor(false)
    setIsOpenLinkColor(false)
    setIsOpenBackgroundColor(false)
    setIsOpenTextColor(false)
    setIsOpenDescriptionColor(false)
    setIsOpenButtonBackgroundColor(!isOpenButtonBackgroundColor)
  }
  const handleOpenButtonTextColor=()=>{
    setIsOpenLinkColor(false)
    setIsOpenBackgroundColor(false)
    setIsOpenTextColor(false)
    setIsOpenButtonBackgroundColor(false)
    setIsOpenDescriptionColor(false)
    setIsOpenButtonTextColor(!isOpenButtonTextColor)
  }
  const handleOpenLinkColor=()=>{
    setIsOpenBackgroundColor(false)
    setIsOpenTextColor(false)
    setIsOpenButtonBackgroundColor(false)
    setIsOpenButtonTextColor(false)
    setIsOpenDescriptionColor(false)
    setIsOpenLinkColor(!isOpenLinkColor)
  }
  

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFont(event.target.value);
  };
  const handleThemeName=(e: React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.value==='')
    {
        setThemeName('Software Engineer')
    }
    else{
        setThemeName(e.target.value)
    }
  }
  const handleThemeDescription=(e: React.ChangeEvent<HTMLTextAreaElement>)=>{
    if(e.target.value==='')
        {
            setThemeDescription(ThemeDescription)
        }
        else{
            setThemeDescription(e.target.value)
        }
  }
  const handleLinkName=(e: React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.value==='')
    {
        setLinkName('https://123muamil.github.io/Muzamil-Iqbal/')
    }
    else{
        setLinkName(e.target.value)
    }
  }
  const handleCreateTheme=()=>{
    const data={
        id:uuidv4(),
        themeName:themeName,
        themeDescription:themeDescription,
        backgroundColor:backgroundColor,
        buttonBackgroundColor:buttonBackroundColor,
        buttonTextColor:buttonTextColor,
        linkColor:linkColor,
        font:selectedFont,
        textColor:textColor,
        descriptionColor:descriptionColor,
        link:linkName,
    }
    dispatch(createTheme(data))
    dispatch(setComponent('ViewTheme'))
    updateSearchParam('View');
  }
  const updateSearchParam = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('view', value);
    router.push(pathname + '?' + newParams.toString());
  };

  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
  <div className="col-span-1">
     {/* Add Theme Name */}
    <div className="flex flex-wrap sm:flex-nowrap gap-3 items-baseline  mb-3">
  <h1 className="text-[18px] text-[#52AC62]">Theme Name:</h1>
  <input
    type="text"
    id="default-input"
    onChange={handleThemeName}
    className="bg-gray-50 w-full sm:w-[500px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 block p-2.5"
  />
</div>
 {/* Add Theme Description */}
<div className="flex flex-wrap sm:flex-nowrap gap-3 items-baseline mb-3">
  <h1 className="text-[18px] text-[#52AC62]">Theme Descr: </h1>
  <textarea
    id="theme-description"
    onChange={handleThemeDescription}
    className="bg-gray-50 w-full sm:w-[500px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 block p-2.5"
    rows={4} // Adjust rows as needed
    placeholder="Enter theme description here..."
  ></textarea>
</div>
{/* Add Link Name */}
<div className="flex flex-wrap sm:flex-nowrap gap-3 items-baseline  mb-3">
  <h1 className="text-[18px] text-[#52AC62]">Enter a Link::::</h1>
  <input
    type="url"
    id="default-input"
    onChange={handleLinkName}
    className="bg-gray-50 w-full sm:w-[500px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 block p-2.5"
  />
</div>

{/* Background Color */}
<div className="flex  items-baseline gap-3 mt-4">
      <div className="flex w-[400px] gap-3 items-center justify-between">
        <h1 className="text-[18px] text-[#52AC62]">Background Color:</h1>
        <div
          className="h-[60px] sm:h-[80px] w-[60px] sm:w-[80px] flex items-center justify-center border border-gray-500 cursor-pointer rounded"
          style={{ backgroundColor: backgroundColor }}
          onClick={handleOpenBackgroundColor}
        >
          <Image src={Color} alt="pick color" className="rounded-full object-cover" />
        </div>
      </div>
      <div>
        {isOpenBackgroundColor && (
          <SketchPicker color={backgroundColor} onChangeComplete={handleChangeBackgroundColor} />
        )}
      </div>
    </div>
     {/* Text Color */}
     <div className="flex items-baseline gap-3 mt-4">
      <div className="flex w-[400px] gap-3 items-center justify-between">
        
        <h1 className="text-[18px] text-[#52AC62]">Text Color:</h1>
        
         
         <div
          className="h-[60px] sm:h-[80px] w-[60px] sm:w-[80px] flex items-center justify-center border border-gray-500 cursor-pointer rounded"
          style={{ backgroundColor: textColor }}
          onClick={handleOpenTextColor}
        >
          <Image src={Color} alt="pick color" className="rounded-full object-cover" />
        </div>
         
      </div>
      <div>
        {isOpenTextColor && (
          <SketchPicker color={textColor} onChangeComplete={handleChangeTextColor} />
        )}
      </div>
    </div>
       {/* Description Color */}
       <div className="flex items-baseline gap-3 mt-4">
      <div className="flex w-[400px] gap-3 items-center justify-between">
        
        <h1 className="text-[18px] text-[#52AC62]">Description Color:</h1>
        
         
         <div
          className="h-[60px] sm:h-[80px] w-[60px] sm:w-[80px] flex items-center justify-center border border-gray-500 cursor-pointer rounded"
          style={{ backgroundColor: descriptionColor }}
          onClick={handleOpenDescriptionColor}
        >
          <Image src={Color} alt="pick color" className="rounded-full object-cover" />
        </div>
         
      </div>
      <div>
        {isOpenDescriptionColor && (
          <SketchPicker color={descriptionColor} onChangeComplete={handleChangeDescriptionColor} />
        )}
      </div>
    </div>
    {/* Button Background Color */}
    <div className="flex items-baseline gap-3 mt-4">
      <div className="flex w-[400px] gap-3 items-center justify-between">
        <h1 className="text-[18px] text-[#52AC62]">Button Background Color:</h1>
        <div
          className="h-[60px] sm:h-[80px] w-[60px] sm:w-[80px] flex items-center justify-center border border-gray-500 cursor-pointer rounded"
          style={{ backgroundColor: buttonBackroundColor }}
          onClick={handleOpenButtonBackgroundColor}
        >
          <Image src={Color} alt="pick color" className="rounded-full object-cover" />
        </div>
      </div>
      <div>
        {isOpenButtonBackgroundColor && (
          <SketchPicker
            color={buttonBackroundColor}
            onChangeComplete={handleChangeButtonBackgroundColor}
          />
        )}
      </div>
    </div>

    {/* Button Text Color */}
    <div className="flex items-baseline gap-3 mt-4">
      <div className="flex w-[400px] gap-3 items-center justify-between">
        <h1 className="text-[18px] text-[#52AC62]">Button Text Color:</h1>
        <div
          className="h-[60px] sm:h-[80px] w-[60px] sm:w-[80px] flex items-center justify-center border border-gray-500 cursor-pointer rounded"
          style={{ backgroundColor: buttonTextColor }}
          onClick={handleOpenButtonTextColor}
        >
          <Image src={Color} alt="pick color" className="rounded-full object-cover" />
        </div>
      </div>
      <div>
        {isOpenButtonTextColor && (
          <SketchPicker
            color={buttonTextColor}
            onChangeComplete={handleChangeButtonTextColor}
          />
        )}
      </div>
    </div>
 {/* Link Color */}
 <div className="flex items-baseline gap-3 mt-4">
      <div className="flex w-[400px] gap-3 items-center justify-between">
        <h1 className="text-[18px] text-[#52AC62]">Link Color:</h1>
        <div
          className="h-[60px] sm:h-[80px] w-[60px] sm:w-[80px] flex items-center justify-center border border-gray-500 cursor-pointer rounded"
          style={{ backgroundColor: linkColor }}
          onClick={handleOpenLinkColor}
        >
          <Image src={Color} alt="pick color" className="rounded-full object-cover" />
        </div>
      </div>
      <div>
        {isOpenLinkColor && (
          <SketchPicker color={linkColor} onChangeComplete={handleChangeLinkColor} />
        )}
      </div>
    </div>
 {/* Font Size */}
 <div className="flex flex-wrap sm:flex-nowrap gap-3 w-[400px] items-baseline justify-between mt-4">
      <h1 className="text-[18px] text-[#52AC62]">Font Size:</h1>
      {/* <p>
       Selected font: <strong>{selectedFont}</strong>.
      </p> */}
      <select
        value={selectedFont}
        onChange={handleFontChange}
        className="p-2 rounded border text-sm sm:text-base"
        style={{ fontFamily: selectedFont,width:'200px',height:'45px',borderRadius:'10px' }}
      >
        {fonts.map((font) => (
          <option key={font} value={font} style={{ fontFamily: font }}>
            {font}
          </option>
        ))}
      </select>
    </div>
   
<button
      className="mt-4 px-4 py-3 bg-[#52AC62] text-white items-center justify-center rounded hover:bg-[#52AC52]"
      onClick={handleCreateTheme}
    >
      Happy? Lets Create
    </button> 
    </div>
    <div className="col-span-1 flex flex-col  justify-center ">
        <h1 className='text-[24px] text-[#52AC62]'>Preview</h1>
       <div className='w-full h-[400px]  rounded-[10px] shadow p-4' style={{backgroundColor:backgroundColor}}>
         <h1 className='text-[24px] ' style={{color:textColor,fontFamily:selectedFont}}>{themeName}</h1>
         <p className='text-[16px] mb-2' style={{color:descriptionColor,fontFamily:selectedFont}}>{themeDescription}</p>
         <Link className='text-[20px]' style={{color:linkColor}} href={linkName} target='_blank'>🎨💼 Creative Portfolio 🌟</Link>
        <br/> <button
      className="mt-4 px-4 py-3 text-white items-center justify-center rounded hover:bg-[#52AC52]"
      style={{backgroundColor:buttonBackroundColor,color:buttonTextColor}}
      onClick={handleCreateTheme}
    >
      Happy? Lets Create
    </button>
       </div>
    </div>
    
</div>;
};

export default AddTheme;
