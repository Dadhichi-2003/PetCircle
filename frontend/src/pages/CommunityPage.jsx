import CreateCommunity from '@/components/communityComp/CreateCommunity'
import useGetAllCommunity from '@/components/hooks/useGetAllCommunity'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { setAllComm } from '@/redux/community/communitySlice'
import { setAuthUser } from '@/redux/user/authSlice'
import axios from 'axios'
import { CommandIcon, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'


const CommunityPage = () => {

  const [open, setOpen] = useState(false)

 
  useGetAllCommunity();

  const { allCommunities } = useSelector(store => store.community);
  const { user } = useSelector(store => store.auth);
  console.log(user);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const joinedCommunityHandler= async(communityId)=>{
    try{ 

      const res = await axios.post(`/community/joincommunity/${communityId}`,{ userId: user._id },{withCredentials:true});

      if(res.data){
        console.log(res.data);
        toast.success('community joined succesfuly');
        const allRes = await axios.get('/community/getallcommunities', { withCredentials: true });
        dispatch(setAllComm(allRes.data.communities));
        dispatch(
          setAuthUser({
            ...user,
            joinedCommunities: [...user.joinedCommunities, communityId], // Add new community
          })
        )
      }
   
    }
    catch(err){

      console.log(err);
      toast.error('you cannot join the community')
    }
  }

  return (
    <>
      <div className='flex m-5 p-5 justify-center items-center w-full '>
        {/* <div className=' '>
        <button type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Create your Community </button>
      </div> */}

        <div className="bg-gray-50 min-h-screen p-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-3 md:mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Communities</h1>
              <Dialog open={open}>
                <DialogTrigger asChild>
                  <button onClick={() => { setOpen(true) }} className="px-2 py-2 md:px-4 md:py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">Create Community</button>
                </DialogTrigger>
                <DialogContent>
                  <CreateCommunity open={open} setOpen={setOpen} />
                </DialogContent>
              </Dialog>

            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search communities..."
                    className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />

                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" ></Search>

                </div>


              </div>
            </div>


            {/* Your Communities */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Communities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {

                  allCommunities?.map((community) => {
                    return <>

                      {
                        user?._id === community?.createdBy &&
                        <>
                          <Link to={`/main/community/${community?._id}`}>
                          {/* Community Item 1 */}
                          <div key={community?._id}  className="bg-white rounded-lg shadow-md p-4 flex items-center cursor-pointer">
                            <img
                              src={community?.poster}
                              alt="Golden Retrievers"
                              className="w-16 h-16 rounded-lg mr-4"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{community?.name}</h3>
                              <p className="text-sm text-gray-500">{community?.members.length} {community?.members.length > 1 ? `members` : `member`} </p>
                              <div className="mt-1 flex items-center text-xs text-teal-600">
                                <span className="w-2 h-2 bg-teal-600 rounded-full mr-1"></span>
                                <span>{community?.posts.length} posts</span>
                              </div>
                            </div>
                          </div>

                          </Link>
                        </>

                      }
                    </>
                  })
                }
              </div>
            </div>


                
            {
              user.joinedCommunities.length> 0 &&

              <div className='my-3'>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">joined Communities</h2>

                {
                  allCommunities?.map((community) => {
                    return <>
                      
                      {
                        user?.joinedCommunities.includes(community?._id) && <>
                          <Link to={`/main/community/${community?._id}`}>
                          <div key={community?._id} className="grid grid-cols-1 gap-4 my-2 cursor-pointer">
                            {/* Community Row 1 */}
                            <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                              <img
                                src={community?.poster}
                                alt="Bird Enthusiasts"
                                className="w-16 h-16 rounded-lg mr-4"
                              />
                              <div className="flex-1">
                                <h3 className="font-medium text-gray-900">{community?.name}</h3>
                                <p className="text-sm text-gray-500 mb-1">{community?.members.length} {community?.members.length > 1 ? `members` : `member`}</p>
                                <p className="text-sm text-gray-600 w-150 line-clamp-2">
                                  {community?.description}
                                </p>
                              </div>

                            </div>
                          </div>
                          </Link>
                        </>


                      }


                    </>
                  })

                }

              </div>
            }

            {/* Discover Communities */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Discover Communities</h2>

              <div className="grid grid-cols-1 md:grid-cols-3  gap-6">


                {
                  allCommunities?.map((community) => {
                    return <>
                      {

                        !(user?._id === community?.createdBy) && !(user?.joinedCommunities.includes(community?._id)) &&

                        <>
                           <Link to={`/main/community/${community?._id}`}>
                          {/* Community Card  */}
                          <div className="bg-white rounded-lg shadow-md overflow-hidden w-fit cursor-pointer ">
                            <div className="h-32 bg-teal-600 relative">
                              <img
                                src={community.poster}
                                alt="Dog Lovers"
                                className="w-full h-full object-cover opacity-50"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-white text-xl font-bold">{community?.name}</h3>
                              </div>
                            </div>
                            <div className="p-4 w-fit">
                              <p className="text-gray-600 mb-4 line-clamp-2 overflow-hidden text-ellipsis w-70">
                                {community?.description}
                              </p>
                              <div className="flex justify-between items-center">
                                <span className="text-sm  text-gray-500">{community?.members?.length} {community?.members?.length > 1 ? `members` : `member`}</span>
                                <button onClick={()=>{joinedCommunityHandler(community?._id)}} className="px-3 py-1 cursor-pointer bg-teal-100 text-teal-700 rounded-md hover:bg-teal-200">Join</button>
                              </div>
                            </div>
                          </div>
                          </Link>
                        </>
                      }
                    </>
                  })

                }

              </div>
            </div>



          </div>
        </div>
      </div >
      
    </>
  )
}

export default CommunityPage

