import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiHome, FiUser, FiMessageSquare, FiBell, FiUsers, FiHeart, FiLogOut } from "react-icons/fi";
import logo from "../../assets/logo1.png"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setPetData } from "@/redux/user/authSlice";
import { setPosts, setSelectedPost } from "@/redux/post/postSlice";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { likeNotification } = useSelector(store => store.realTimeNotification);
  
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth)

  const handleLogout = async () => {
    try {
      await axios.get("/logout", {
        withCredentials: true, // ✅ Ensure cookies are sent & cleared
      });
      dispatch(setAuthUser(null))
      dispatch(setSelectedPost(null));
      dispatch(setPetData(null));
      dispatch(setPosts([]))
      localStorage.removeItem("token"); // ✅ Clear stored token (if using JWT)
      localStorage.removeItem("id"); // ✅ Clear user ID
      navigate("/login"); // ✅ Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close Sidebar on Outside Click
  const closeSidebar = () => {
    if (isOpen) setIsOpen(false);
  };

  const menuItems = [
    { name: "Feed", icon: <FiHome />, path: "feeds" },
    { name: "Profile", icon: <FiUser />, path: `profile/${user?._id}` },
    { name: "Messages", icon: <FiMessageSquare />, path: "messages" },
    { name: "Notifications", icon: <FiBell />, path: "feeds" },
    { name: "Community", icon: <FiUsers />, path: "community" },
    { name: "Adoption", icon: <FiHeart />, path: "adoption" },
    { name: "Logout", icon: <FiLogOut />, path: "/logout", action: handleLogout },
  ];

  return (
    <div className="flex relative ">
      {/* Overlay for Mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-[#0D1B2A] text-[#E0E1DD] transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out shadow-lg h-screen`}
      >
        {/* Logo Section */}
        <div className="flex justify-start items-center p-5 mt-3 border-b border-[#1B263B]">
          <img src={logo} className="size-22 shrink-0'"></img>
          <h1 className="text-xl font-bold flex items-center gap-2 ">PetCircle </h1>
        </div>

        {/* Menu Items */}
        <nav className="mt-4">
          {menuItems.map((item, index) =>
            item.action ? ( // ✅ Check if action exists (Logout button)
              <button
                key={index}
                onClick={item.action}
                className="relative flex w-full items-center gap-3 px-13 py-3 text-lg hover:bg-[#1B263B] transition rounded-md"
              >
                {item.icon} {item.name}
              </button>
            ) : (

              <>
                {item.name === "Notifications" ? (<div className="relative">
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 px-13 py-3 text-lg hover:bg-[#1B263B] transition rounded-md"
                  >
                    {item.icon} {item.name}
                  </Link>

                  {likeNotification.length > 0 && (
                    <Popover>
                      <PopoverTrigger asChild>
                      <div className="relative flex items-center gap-3 px-13 py-3 text-lg hover:bg-[#1B263B] transition rounded-md cursor-pointer">
                  {item.icon}
                  
                  {/* Notification Count Badge Near Bell Icon */}
                  {likeNotification.length > 0 && (
                    <span className="absolute left-50 flex items-center justify-center h-5 w-5 rounded-full bg-red-600 text-white text-xs font-bold">
                      {likeNotification.length}
                    </span>
                  )}

                  {item.name}
                </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-56">
                        <div>
                          {likeNotification.length === 0 ? (
                            <p>No new notifications</p>
                          ) : (
                            likeNotification.map((notification) => (
                              <div key={notification.userId} className="flex items-center  gap-2 my-2">
                                <Avatar>
                                  <AvatarImage src={notification.userDetails?.profilePic} />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p className="text-sm">
                                  <span className=" font-bold">{notification.userDetails?.username}</span> liked your post
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>) : (<Link
                  key={index}
                  to={item.path}
                  className="flex items-center gap-3 px-13 py-3 text-lg hover:bg-[#1B263B] transition rounded-md"
                >
                  {item.icon} {item.name}
                </Link>)}
              </>
            )
          )}
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 md:hidden text-xl z-50  text-secondary p-2 rounded-md"
        onClick={toggleSidebar}
      >
        <FiMenu />
      </button>
    </div>
  );
};

export default Sidebar;
