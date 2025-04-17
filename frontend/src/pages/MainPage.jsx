import React, { useEffect } from 'react';

import SideBar from '../components/mainpageComp/SideBar';
import { Outlet } from 'react-router-dom';
import useGetAllPost from '@/components/hooks/useGetAllPost';
import { useDispatch } from 'react-redux';



const MainPage = () => {
  
  

  return (
    <>
    <div className='flex justify-center items-center w-full '>
      <div className='fixed'></div>
      <SideBar/>
      <div className='flex-1' >
        <Outlet/>
      </div>
      </div>
    </>
  );
};
// flex justify-center items-center w-full

export default MainPage;
