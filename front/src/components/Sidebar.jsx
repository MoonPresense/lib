import  React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/sidebar.css';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import '../css/sidebar.css';
import { IconContext } from 'react-icons';

import { sidebarNavItems } from '../utils/data';
import { Button } from '@mui/material';


const Sidebar = () => {
    const [user, setUser] = useState(undefined);
    const [sidebar, setSidebar] = useState(false);
  
    const showSidebar = () => setSidebar(!sidebar);

    useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if ( user !== null) {
                setUser(user);
            }
        }
        fetchData();
    }, [])
    const logOut = () => {
        localStorage.removeItem("user")
        return window.location.reload();
    }

    return (
      <>
        <IconContext.Provider value={{ color: '#000' }}>
          <div className='navbar'>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {sidebarNavItems.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.to}>
                      {item.icon}
                      <span>{item.display}</span>
                    </Link>
                  </li>
                );
              })}
                <div style={{height: '72%', display: 'flex', width: "100%", justifyContent: "space-around"  }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",  
                        alignItems: "flex-end",   
                    }}>
                { user ? (
                    <Button variant="contained" style={{backgroundColor: "#1a83ff"}}
                        onClick={() => logOut()}
                        >
                        Выход
                    </Button>
                ) : (
                    <>
                        <Link style={{textDecoration: "none"}} to={'/login'}>
                            <Button variant="contained" style={{backgroundColor: "#1a83ff", display: "flex" }}>
                                Логин
                            </Button>
                        </Link>
                        <Button variant="contained" style={{backgroundColor: "#1a83ff", margin: "0 0 0 10px" }}>
                            Регистрация
                        </Button>
                    </>
                )}
                    </div>
                </div>
            
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  }
  
export default Sidebar;



















// const Sidebar = () => {
    

//     return (
//         <div className="body">
//             <div className='sidebar'>
//                 <Link 
//                 to={"/"}
//                 className='link_img'>
//                     <img src={logo} alt="logo" />
//                 </Link>
//                 <div className='sidebar_menu'>
//                     <Link
//                         to={"/"}
//                         className=''

//                     >
//                         <i className='bx bx-home'></i>
//                         Главная
//                     </Link>
//                     <h3 style={{
//                         marginTop: "0.5rem",
//                         paddingLeft: "1.25rem", /* 20px */
//                         paddingRight: "1.25rem",
//                         fontSize: "1rem", /* 16px */
//                         lineHeight: "1.5rem",
//                     }}>
//                         Популярные жанры
//                     </h3>
//                     {categories.slice(0, categories.length).map((category) => (
//                         <NavLink
//                             to={`/category/${category.name}`}
//                             className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}

//                             key={category.name}
//                         >
//                             <img src={category.image} alt='' style={{
//                                 width: "2rem",
//                                 height: "2rem",
//                                 borderRadius: "9999px",
//                                 boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
//                             }} />
//                             {category.name}
//                         </NavLink>
//                     ))}
//                 </div>
//             </div >
//         </div >



// const [activeIndex, setActiveIndex] = useState(0);
    // const [stepHeight, setStepHeight] = useState(0);

    // const sidebarRef = useRef();
    // const indicatorRef = useRef();
    // const location = useLocation();

    // useEffect(() => {
    //     setTimeout(() => {
    //         const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
    //         indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
    //         setStepHeight(sidebarItem.clientHeight);


    //     }, 50);
    // }, []);

    // // change active index
    // useEffect(() => {
    //     const curPath = window.location.pathname.split('/')[1];
    //     const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
    //     setActiveIndex(curPath.length === 0 ? 0 : activeItem);


    // }, [location]);
    // return (
        // <div className='sidebar'>
        //     <div className="sidebar__logo">
        //         <img src={logo} alt="logo" style={{width:"100px"}} ></img>
        //     </div>
        //     <div ref={sidebarRef} className="sidebar__menu">
        //         <div
        //             ref={indicatorRef}
        //             className="sidebar__menu__indicator"
        //             style={{
        //                 transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
        //             }}
        //         ></div>
        //         {
        //             sidebarNavItems.map((item, index) => (
        //                 <Link to={item.to} key={index}>
        //                     <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
        //                         <div className="sidebar__menu__item__icon">
        //                             {item.icon}
        //                         </div>
        //                         <div className="sidebar__menu__item__text">
        //                             {item.display}
        //                         </div>
        //                     </div>
        //                 </Link>
        //             ))
        //         }

        //     </div>
        // </div>
    // );
//     );
// };

// export default Sidebar;
