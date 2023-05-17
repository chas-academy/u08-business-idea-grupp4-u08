import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (error) {}
  };

  return (
    <section className="bg-gray-50">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <div className="w-full bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl  text-center">
                  Login
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                      <input type="email" name="email" id="email" value={email}onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border-2 border-gray-900 text-gray-900 sm:text-sm rounded-3xl block w-full p-2.5" placeholder="Email"  />
                  </div>
    
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                      <input type="password" id="Password" placeholder="Password"value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border-2 border-gray-900 text-gray-900 sm:text-sm rounded-3xl block w-full p-2.5"   />
                  </div>
               
                  <button type="submit" className="w-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center bg-black text-white">Create an account</button>
                 
              </form>
          </div>
      </div>
  </div>
</section>
  );
};

export default Login;