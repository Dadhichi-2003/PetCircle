import React from 'react';

import SideBar from '../components/mainpageComp/SideBar';
import { Outlet } from 'react-router-dom';



const MainPage = () => {
  return (
    <>
      <SideBar/>
      <div className='flex justify-center items-center  w-full' >
        <Outlet/>
      </div>
    </>
  );
};

export default MainPage;
