import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function UserProfile() {
        const [username, setUsername] = useState("");
        const [bio, setBio] = useState('')
        const [cookies, , removeCookies] = useCookies(["access_token"]);
        const navigate = useNavigate();
        const [profilePicture, setProfilePicture] = useState('')
        const [categories, setCategories] = useState([]);        

        
        useEffect(() => {
          const fetchUserProfile = async () => {
            let userID = window.localStorage.getItem("userID");
        
            if (typeof userID !== 'undefined' && userID !== null) {

            } else {
            navigate('/');
            }
        
            try {
              const response = await axios.get(`http://localhost:3001/auth/profile/${userID}`, {
                headers: {
                  Authorization: `Bearer ${cookies.access_token}`,
                },
              });
        
              console.log(response.data);
              if (response.data && response.data.user) {
                setUsername(response.data.user.username);
                setBio(response.data.user?.bio)
                setProfilePicture(response.data.user?.profilePicture)
              }
            } catch (error) {
              console.error(error);
            }
          };
        
          fetchUserProfile();
        }, [cookies.access_token, navigate]);
        
        let profileUrl = window.localStorage.getItem('userID')

        useEffect(() => {
          const fetchData = async () => {
            try {
              const userID = window.localStorage.getItem("userID");
              const response = await axios.get(`http://localhost:3001/category/categories/${userID}`);
              console.log(response.data);
              setCategories(response.data);
            } catch (error) {
              console.log(error);
            }
          };
      
          fetchData();
        }, []);
        

        return (
          <>
          <div className="flex justify-center">
              <div className="flex justify-between lg:w-7/12 w-11/12 sm:pt-20 pt-10 pb-10 sm:px-12">
                  <div>
                     {!profilePicture ? (
                        <img
                        className="sm:h-48 sm:w-48 w-32 h-32 rounded-full object-cover"
                        src="https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg"
                        alt="Profile Picture"
                      />
                     ) : (
                      <img
                      className="sm:h-48 sm:w-48 w-32 h-32 rounded-full object-cover"
                      src={profilePicture}
                      alt="Profile Picture"
                      />
                     )}
                  </div>
                  <div className="flex flex-col space-y-4 ml-5">
                      <div className="flex flex-row sm:space-x-16 space-x-6 pt-2 text-xs">
                          <div className="flex flex-col text-center">
                              <h4 className="sm:text-2xl">47</h4>
                              <p>recipes</p>
                          </div>
                          <div className="flex flex-col text-center">
                              <h4 className="sm:text-2xl">500k</h4>
                              <p>followers</p>
                          </div>
                          <div className="flex flex-col text-center">
                              <h4 className="sm:text-2xl">100</h4>
                              <p>following</p>
                          </div>
                      </div>
                      <Link to={`/home/edit-profile/${profileUrl}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded sm:text-lg text-xs text-center">
                      Edit profile
                      </Link>
                  </div>
              </div>
          </div>
          <div className="flex justify-center">
              <div className="flex flex-col lg:w-7/12 w-11/12 space-y-3">
                  <h5 className="text-xs font-bold">{username}</h5>
                  <p>{bio}</p>
              </div>
          </div>
          
          <div className="flex justify-center sm:pt-20 pt-10">
              <div className="flex flex-col text-center sm:text-lg text-sm lg:w-7/12 w-11/12 space-y-3">
                  <h1 className="tracking-widest font-light">CATEGORIES</h1>
  
                  <div className="flex flex-row">
                      <div className="flex flex-row sm:space-x-5 space-x-2 pb-2 sm:text-lg text-xs overflow-x-scroll">
                      {categories.map((category, index) => (
                      <div key={index}>
                           <Link to="" className="flex items-center space-x-3 text-gray-700 bg-gray-200 py-1 px-6 rounded-md font-medium hover:bg-gray-300 focus:bg-gray-200 focus:shadow-outline">
                              <p>{category.title}</p>
                          </Link>
                          
                      </div>
                      ))}      
                      </div>
                      <Link to={`/home/create-category`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 sm:mt-1 -mt-1 mx-2 stroke-2 hover:text-blue-400" viewBox="0 0 48 48"><g fill="none" stroke="currentColor"><rect width="36" height="36" x="6" y="6" rx="3"/><path d="M24 16v16m-8-8h16"/></g></svg>
                      </Link>
                  </div>
  
              </div>
          </div>
  
          <div className="flex justify-center">
              <div className="flex justify-center lg:w-7/12 w-11/12 sm:pt-20 pt-8  sm:space-x-5 space-x-3 border-b text-xs sm:text-lg">
                  <Link to="" className="flex items-center justify-center sm:space-x-3 space-x-2 hover:border-b hover:border-b-black focus:border-b-black sm:w-36 w-20 pb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-7 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"/></svg>
                  <p className="tracking-widest font-light">POSTS</p>
                  </Link>
                  <Link to="" className="flex items-center justify-center sm:space-x-3 space-x-2 hover:border-b hover:border-b-black focus:border-b-black sm:w-36 w-20 pb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-7 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21V5q0-.825.588-1.413T7 3h10q.825 0 1.413.588T19 5v16l-7-3l-7 3Zm2-3.05l5-2.15l5 2.15V5H7v12.95ZM7 5h10H7Z"/></svg>
                  <p className="tracking-widest font-light">SAVED</p>
                  </Link>
              </div>
          </div>
  
          <div className="flex justify-center pt-5">
          <div className="grid grid-cols-3 sm:gap-3 gap-1 lg:w-7/12 w-11/12">
              <div className="bg-gray-200 sm:h-48 h-28">
                  <Link to="">
                      <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80" alt="Profile Picture"/>
                  </Link>
              </div>
              <div className="bg-gray-200 sm:h-48 h-28">
              <Link to="">
                  <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" alt="Profile Picture"/>
              </Link>
              </div>
              <div className="bg-gray-200 sm:h-48 h-28">
              <Link to="">
                  <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" alt="Profile Picture"/>
              </Link>
              </div>
              <div className="bg-gray-200 sm:h-48 h-28">
              <Link to="">
                  <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80" alt="Profile Picture"/>
              </Link>
              </div>
              <div className="bg-gray-200 sm:h-48 h-28">
              <Link to="">
                  <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Profile Picture"/>
              </Link>
              </div>
              <div className="bg-gray-200 sm:h-48 h-28">
              <Link to="">
                  <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=820&q=80" alt="Profile Picture"/>
              </Link>
              </div>
              <div className="bg-gray-200 sm:h-48 h-28">
              <Link to="">
                  <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1065&q=80" alt="Profile Picture"/>
              </Link>
              </div>
              <div className="bg-gray-200 sm:h-48 h-28">
              <Link to="">
                  <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1081&q=80" alt="Profile Picture"/>
              </Link>
              </div>
              <div className="bg-gray-200 sm:h-48 h-28">
              <Link to="">
                  <img className="h-full w-full object-cover" src="https://plus.unsplash.com/premium_photo-1663853560438-6cc3a70a3c97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" alt="Profile Picture"/>
              </Link>
              </div>
              <div className="bg-gray-200 sm:h-48 h-28">
              <Link to="">
                  <img className="h-full w-full object-cover" src="https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg" alt="Profile Picture"/>
              </Link>
              </div>
          </div>
          </div>
          </>
      ) 
}

export default UserProfile