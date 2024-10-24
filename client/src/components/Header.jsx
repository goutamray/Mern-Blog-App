import { Button, Navbar, TextInput } from "flowbite-react"
import { Link, useLocation } from "react-router-dom"
import { AiOutlineSearch  } from "react-icons/ai"
import { FaMoon } from "react-icons/fa6";

const Header = () => {
  const path = useLocation().pathname;


  return (
    <>
      <Navbar className="border-b-2"> 
        <Link to="/" className=" text-sm sm:text-xl font-semibold dark:text-white  ">
           <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md text-white mr-1"> Goutam </span>
           <span> Blog </span>
        </Link>
        <form >
          <TextInput 
            type="text"
            placeholder="Search..."
            rightIcon={ AiOutlineSearch }
            className="hidden lg:inline "
          />
        </form>
        <Button className="w-12 h-10 lg:hidden pill flex items-center justify-center" color="gray">
           <AiOutlineSearch className="text-xl"/>
        </Button>

        <div className="flex gap-2 md:order-2">
           <Button className="w-12 h-10 hidden sm:inline " color="gray" > 
              <FaMoon className="text-4xl relative -top-2" />
           </Button>
           <Link to="sign-in">
              <Button gradientDuoTone="purpleToBlue" outline > 
                  Sign In
              </Button>
           </Link>
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



