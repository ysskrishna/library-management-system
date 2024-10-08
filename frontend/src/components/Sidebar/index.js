"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaHome, FaSearch, FaShoppingCart, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/api/authApi';
import { selectRole, selectUser } from '@/redux/features/authSlice';
import { Role } from '@/common/constants';
import Button from '@/components/Button';
import Logo from '@/components/Logo';


const SidebarLink = ({ href, children, isSelected, onClick }) => (
  <Link href={href} className={`mb-2 p-2 flex items-center rounded hover:bg-gray-300 ${isSelected ? 'bg-gray-300' : ''}`} onClick={onClick}>
    {children}
  </Link>
);

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState('');

  let role = useSelector(selectRole);
  let user = useSelector(selectUser);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLinkClick = (link, children) => {
    setSelectedLink(link);
    closeSidebar();
  };


  const links = {
    [Role.ADMIN]: [
      { href: "/admin/dashboard", content: <><FaHome className="mr-2" /> Home</>},
      { href: "/admin/booknew", content: <><FaPlus className="mr-2" /> Book New</>}
    ],
    [Role.USER]: [
      { href: "/user/dashboard", content: <><FaHome className="mr-2" /> Home</>},
      { href: "/user/search", content: <><FaSearch className="mr-2" /> Search</>},
      { href: "/user/cart", content: <><FaShoppingCart className="mr-2" /> Cart</>}
    ]
  };

  useEffect(() => {
    
    const currentLink = links[role]?.find(link => link.href === pathname);
    
    if (currentLink) {
      setSelectedLink(currentLink.href);
    }
  }, []);

  const renderLinks = () => {
    return links[role]?.map(link => (
      <SidebarLink
        key={link.href}
        href={link.href}
        isSelected={selectedLink === link.href}
        onClick={() => handleLinkClick(link.href, link.content)}
      >
        {link.content}
      </SidebarLink>
    ));
  };

  return (
    <div>
      <div className="lg:hidden p-4">
        <AiOutlineMenu
          className="text-2xl cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>

      <div
        className={`fixed lg:static top-0 left-0 h-screen bg-gray-200 w-64 p-4 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 z-50 flex flex-col justify-between`}
      >
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between mb-4 lg:mb-6'>
            <Logo />
            <AiOutlineClose
              className="text-2xl cursor-pointer lg:hidden"
              onClick={closeSidebar}
            />
          </div>

          {renderLinks()}
        </div>


        <div className='flex-col justify-end'>
          <p className='font-bold mb-2'>Welcome, <span className="italic">{user?.name}</span></p>
          <Button 
            onClick={handleLogout} 
            buttonContainerClassName="w-full !bg-red-100 !text-red-600 hover:!bg-red-200"
          >
            Logout
          </Button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-40"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
}

