import { Avatar, Button, Dropdown, DropdownDivider, Navbar, TextInput } from "flowbite-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from "../redux/theme/themeSlice";



// react icons 
import { AiOutlineSearch  } from "react-icons/ai"
import { FaMoon } from "react-icons/fa6";
import { FaSun } from 'react-icons/fa';
import createToast from "../utilis/toastify";
import { signOutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import Logo from "./Logo";


const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch(); 
  const location  = useLocation(); 
  const navigate = useNavigate(); 

  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const [searchTerm, setSearchTerm ] = useState('');

    // user sign out 
    const handleUserSignout = async() => {
      try {
        const res = await fetch("/api/user/signout", {
          method : "POST"
        });
        const data = await res.json();
  
        if (!res.ok) {
          console.log(data.message);
        }else{
           dispatch(signOutSuccess());
           createToast("Sign Out SuccessFull", "success"); 
        }
      } catch (error) {
        console.log(error.message);
        
      }
    }

    // search 
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if (searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl);
      }
    }, [location.search]);


    // handleSubmit
    const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    }

  return (
    <>
      <Navbar className="border-b-2 sticky top-0 left-0 w-full z-50 bg-white"> 
        <Link to="/" className=" text-sm sm:text-xl font-semibold dark:text-white  ">
          <Logo />
        </Link>

        <form onSubmit={handleSubmit}>
            <TextInput
              type='text'
              placeholder='Search...'
              rightIcon={AiOutlineSearch}
              className='hidden lg:inline'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>
        <Button 
           type="submit"
           className="w-12 h-10 lg:hidden pill flex items-center justify-center" 
           color="gray"
          >
           <AiOutlineSearch className="text-xl"/>
        </Button>

        <div className="flex gap-2 md:order-2">
           <Button className="w-12 h-10 hidden sm:inline " color="gray" onClick={() => dispatch(toggleTheme())} > 
             { 
                theme === 'light' ? 
                  <FaSun className="text-4xl relative -top-2" /> 
                  :  
                  <FaMoon className="text-4xl relative -top-2" />
              }

            
           </Button>
           {
            currentUser ? 
            <Dropdown
             arrowIcon={false}
             inline
             label={
               <Avatar 
                alt="user"
                img={currentUser.photo}
                rounded
               />
             }
            >
            <Dropdown.Header>
               <span className="block text-sm"> @{currentUser?.name} </span>
               <span className="block text-sm font-medium"> {currentUser?.email} </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
               <Dropdown.Item> Profile </Dropdown.Item>
            </Link>
            <DropdownDivider/>
            <Dropdown.Item onClick={handleUserSignout}> Sign Out </Dropdown.Item>

            </Dropdown> :
             ( <Link to="sign-in">
               <Button gradientDuoTone="purpleToBlue" outline > 
                   Sign In
               </Button>
            </Link> )
            

           }
      
           <Navbar.Toggle/>
        </div>
           <Navbar.Collapse>
             <Navbar.Link active={path === "/"} as={"div"} >
                <Link to="/" className="text-md">
                   Home 
                </Link>
             </Navbar.Link >
             <Navbar.Link active={path === "/about"} as={"div"}>
                <Link to="/about" className="text-md">
                   About 
                </Link>
             </Navbar.Link>
             <Navbar.Link active={path === "/projects"} as={"div"}>
                <Link to="/projects" className="text-md">
                   Projects 
                </Link>
             </Navbar.Link>
           </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Header



