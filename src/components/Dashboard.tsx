"use client";
import {  useEffect, useState } from "react";
import { LuAlignJustify } from "react-icons/lu";
import { IoIosAdd, IoMdEye } from "react-icons/io";
import Image from "next/image";
import logo from '../../public/images/logo.png';
import AddTheme from "./AddTheme";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import ViewTheme from "./ViewTheme";
import { setComponent } from "@/reducers/componentSlice";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "next-themes";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from "next/link";

interface SearchDataItem {
  id: string;
  themeName: string;
  themeDescription: string;
  textColor: string;
  descriptionColor: string;
  backgroundColor: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
  linkColor: string;
  font: string;
}

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const themes = useSelector((state: RootState) => state.theme.data) as SearchDataItem[];
  const [searchData, setSearchData] = useState<SearchDataItem[]>([]);
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isOverlaySidebarOpen, setIsOverlaySidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.component.currentComponent);

  useEffect(() => {
    if (themes) {
      setSearchData(themes);
    }
  }, [themes]);

  useEffect(() => {
    const queryParam = searchParams.get('view');
    if (queryParam === 'Create') {
      dispatch(setComponent('AddTheme'));
    } else if (queryParam === 'View') {
      dispatch(setComponent('ViewTheme'));
    }
  }, [searchParams, dispatch]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleOverlaySidebar = () => {
    setIsOverlaySidebarOpen((prevState) => !prevState);
  };

  const closeOverlaySidebar = () => {
    setIsOverlaySidebarOpen(false);
  };

  const handleSidebarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
    updateSearchParam('Create');
  };

  const handleView = () => {
    updateSearchParam('View');
  };

  const updateSearchParam = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('view', value);
    router.push(pathname + '?' + newParams.toString());
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    const filteredData = themes.filter((item) =>
      item.themeName.toLowerCase().includes(query)
    );
    setSearchData(filteredData);
  };

  let component;
  switch (currentComponent) {
    case 'ViewTheme':
      component = <ViewTheme searchData={searchData} />;
      break;
    case 'AddTheme':
    default:
      component = <AddTheme />;
      break;
  }

  return (
    <div className="flex h-screen">
      {/* Fixed Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transform transition-all duration-300 ease-in-out flex-col w-64 border-r-[1px] border-[#DCDCDC] fixed z-20 top-0 left-0 bottom-0 hidden md:block`}
      >
        <div className="flex items-center justify-center h-16">
          <Image src={logo} alt="themeLogo" width={70} height={70} style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover' }} />
          <span className="text-[#52AC62] font-bold uppercase">Theming System</span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4">
            <Link
              href={pathname + '?' + new URLSearchParams({ view: 'Create' }).toString()}
              className="block flex gap-2 items-center px-4 py-2 text-[#52AC62] hover:bg-gray-700 hover:rounded-[10px]"
              onClick={toggleOverlay}
            >
              <IoIosAdd size={24} color="#52AC62" /> Create a Theme
            </Link>
            <Link
              href={pathname + '?' + new URLSearchParams({ view: 'View' }).toString()}
              className="block flex gap-2 items-center px-4 py-2 text-[#52AC62] hover:bg-gray-700 hover:rounded-[10px]"
              onClick={handleView}
            >
              <IoMdEye size={24} color="#52AC62" /> View Themes
            </Link>
          </nav>
        </div>
      </div>

      {/* Overlay Sidebar */}
      <div
        onClick={closeOverlaySidebar}
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-all duration-300 transform md:hidden ${
          isOverlaySidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={handleSidebarClick}
          className={`fixed top-0 left-0 h-full w-64 bg-white p-6 transform transition-transform duration-300 ${
            isOverlaySidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Sidebar Content</h2>
          <p>This sidebar only appears on mobile screens.</p>
          <button
            onClick={closeOverlaySidebar}
            className="mt-4 px-4 py-2 text-white bg-red-500 rounded"
          >
            Close Sidebar
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex flex-col flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${sidebarOpen ? "md:pl-64" : ""}`}>
        {/* Navbar */}
        <div className="text-gray-800 p-4 shadow-sm flex justify-between items-center sticky top-0 w-full z-10"
          style={{
            backgroundColor: theme === 'light' || theme === 'system' ? 'white' : 'black',
            borderBottom: theme === 'light' || theme === 'system' ? 'none' : '1px solid #4A4A4A',
          }}>
          <div className="flex items-center px-4">
            <button
              className="focus:outline-none focus:text-gray-700 md:hidden"
              onClick={toggleOverlaySidebar}
            >
              <LuAlignJustify style={{ color: theme === 'light' || theme === 'system' ? '' : '#FFFFFF' }} />
            </button>
            <button
              className="text-gray-500 focus:outline-none focus:text-gray-700 hidden md:block"
              onClick={toggleSidebar}
            >
              <LuAlignJustify style={{ color: theme === 'light' || theme === 'system' ? '' : '#FFFFFF' }} />
            </button>
            <input
              className="mx-4 w-full border rounded-md px-4 py-2"
              type="text"
              placeholder="Search theme"
              onChange={handleSearch}
            />
          </div>
          <ThemeSwitcher />
        </div>

        {/* Main content area */}
        <div className={`container mx-auto p-4 `}>
          {component}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
