import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { IoIosArrowDown } from 'react-icons/io'
import { RxHamburgerMenu } from 'react-icons/rx'

import logo from '../../assets/Logo/Logo-Full-Light.png'
import ProfileDropDown from '../core/Auth/ProfileDropdown'
import { NavbarLinks } from '../../data/navbar-links'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'

import './loader.css'

const Navbar = () => {
  const location = useLocation()
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)

  const [subLinks, setSubLinks] = useState([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector('GET', categories.CATEGORIES_API)
      setSubLinks(result.data.data)
    } catch (error) {
      console.log('Could not fetch the category list')
    }
  }

  useEffect(() => {
    fetchSublinks()
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            width={160}
            height={42}
            loading="lazy"
            alt="Company Logo"
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav>
          <ul className="hidden md:flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === 'Catalog' ? (
                  <div className="relative flex items-center gap-2 group">
                    <p>{link.title}</p>
                    <IoIosArrowDown />

                    <div
                      className={`invisible absolute left-[50%] 
                        translate-x-[-49%] ${
                          subLinks.length
                            ? 'translate-y-[15%]'
                            : 'translate-y-[40%]'
                        }
                        top-[50%] z-50 
                        flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                        opacity-0 transition-all duration-200 group-hover:visible
                        group-hover:opacity-100 lg:w-[300px]`}
                    >
                      <div
                        className="absolute left-[50%] top-0
                          translate-x-[80%]
                          translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5"
                      ></div>

                      {subLinks.length ? (
                        subLinks.map((subLink, index) => (
                          <Link
                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            to={`/catalog/${subLink.name}`}
                            key={index}
                          >
                            <p>{subLink.name}</p>
                          </Link>
                        ))
                      ) : (
                        <span className="loader"></span>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? 'text-yellow-25'
                          : 'text-richblack-25'
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Auth Buttons / Cart */}
        <div className="hidden md:flex gap-x-4 items-center">
          {user && user?.accountType !== 'Instructor' && (
            <Link to="/dashboard/cart" className="relative pr-2">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-0 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {!token && (
            <>
              <Link to="/login">
                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                  Sign Up
                </button>
              </Link>
            </>
          )}

          {token && <ProfileDropDown />}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-14 left-0 w-full bg-richblack-900 z-50 flex flex-col items-start p-6 gap-4 md:hidden text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <div key={index} className="w-full">
                {link.title === 'Catalog' ? (
                  <div>
                    <p className="mb-2">{link.title}</p>
                    <div className="ml-4 flex flex-col gap-2">
                      {subLinks.length ? (
                        subLinks.map((subLink, subIndex) => (
                          <Link
                            to={`/catalog/${subLink.name}`}
                            key={subIndex}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subLink.name}
                          </Link>
                        ))
                      ) : (
                        <span className="loader"></span>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link?.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}

            {!token && (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md w-full text-left">
                    Log In
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md w-full text-left">
                    Sign Up
                  </button>
                </Link>
              </>
            )}

            {token && <ProfileDropDown />}
          </div>
        )}

        {/* Hamburger Icon */}
        <div
          className="mr-4 md:hidden text-[#AFB2BF] scale-150 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <RxHamburgerMenu />
        </div>
      </div>
    </div>
  )
}

export default Navbar
