import React, { useEffect } from 'react';

import SideBar from '../components/mainpageComp/SideBar';
import { Outlet } from 'react-router-dom';
import useGetAllPost from '@/components/hooks/useGetAllPost';
import { useDispatch } from 'react-redux';



const MainPage = () => {
  
  

  return (
    <>
      <SideBar/>
      <div className='flex justify-center items-center   w-full' >
        <Outlet/>
      </div>
    </>
  );
};

export default MainPage;
