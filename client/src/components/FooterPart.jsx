 import { Link } from "react-router-dom"
 import { Footer } from "flowbite-react"
 import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

const FooterPart = () => {

  return (
   <> 
    <div className="border border-t-8 border-teal-500 p-3 sm:p-0 mt-5">
       <div className="w-full max-w-8xl mx-auto">
          <div className="grid w-full justify-between sm:flex md:grid-cols-1 sm:px-3 sm:pb-3"> 
               <div className="mt-5">
                  <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white  ">
                        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md text-white mr-1"> Goutam </ span>
                        <span> Blog </span>
                  </Link>
                  
               </div>
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-6 mt-4">
                  <div>
                  <Footer.Title title="about" className="text-[18px] font-medium"/>
                  <Footer.LinkGroup col>
                     <Footer.Link>
                           100 Js Projects
                     </Footer.Link>
                     <Footer.Link
                        href="/about"
                        >
                           About
                     </Footer.Link>
                  </Footer.LinkGroup>
                  </div>

                  <div>
                  <Footer.Title title="Follow Us" className="text-[18px] font-medium"/>
                  <Footer.LinkGroup col>
                     <Footer.Link
                        href="https://github.com/GOUTAMRAY"
                        target="_blank"
                     >
                           Github
                     </Footer.Link>
                     <Footer.Link
                     href="#"
                        >
                           Linkedin
                     </Footer.Link>
                  </Footer.LinkGroup>
                  </div>

                  <div>
                  <Footer.Title title="Legal" className="text-[18px] font-medium"/>
                  <Footer.LinkGroup col>
                     <Footer.Link >
                           Privacy Policy
                     </Footer.Link>
                     <Footer.Link
                     href="#"
                        >
                           Terms &amp; Conditions
                     </Footer.Link>
                  </Footer.LinkGroup>
                  </div>
               
               </div>
          </div>

      <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between sm:pb-4 sm:px-3'>
          <Footer.Copyright
            href='#'
            by="Goutam's blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='#' icon={BsFacebook}/>
            <Footer.Icon href='#' icon={BsInstagram}/>
            <Footer.Icon href='#' icon={BsTwitter}/>
            <Footer.Icon href='https://github.com/GOUTAMRAY' icon={BsGithub}/>
            <Footer.Icon href='#' icon={BsDribbble}/>

          </div>
        </div>

       </div>
    </div>
  </>
  )
}

export default FooterPart







