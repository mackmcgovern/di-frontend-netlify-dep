import { Link, useLocation, NavLink } from '@remix-run/react'
import { useState, useEffect } from 'react'
import MobileNavItems from './MobileNavItems'

export default function MobileNavbar({ data }) {
  const [navOpen, setNavOpen] = useState(false)
  const pathname = useLocation()
  const depthLevel = 0
  const sortedLinks = data.data.sort(
    (a, b) => a.attributes.order - b.attributes.order
  )

  const handleMobileNav = navOpen => {
    if (navOpen) {
      setNavOpen(false)
      document.body.style.overflowY = 'scroll'
    } else {
      setNavOpen(true)
      document.body.style.overflowY = 'hidden'
    }
  }

  useEffect(() => {
    setNavOpen(false)
    document.body.style.overflowY = 'scroll'
  }, [pathname])

  return (
    <>
      <div className='relative top-0 right-0 left-0 shadow-sm bg-navbar-blue h-20 mobile-nav flex items-center z-40'>
        <div className='w-full px-4 xl:px-8 flex justify-between items-center'>
          <div className='max-w-[60vw]'>
            <Link to='/'>
              <div className='flex items-center'>
                <img
                  src='images/logo-white.png'
                  alt='logo'
                  className='py-2 w-10 sm:w-14 h-auto brightness-95'
                />
                <p className='text-[2rem] sm-text-[2.5rem] text-white logo tracking-wide transition hover:drop-shadow-md leading-24 my-4 ml-4 mr-8 pt-2 whitespace-nowrap'>
                  Duluth Institute
                </p>
              </div>
            </Link>
          </div>
          <div className='hamburger' onClick={() => handleMobileNav(navOpen)}>
            <div className={`bar bar1 ${navOpen ? 'animateBar1' : ''}`}></div>
            <div className={`bar bar2 ${navOpen ? 'animateBar2' : ''}`}></div>
            <div className={`bar bar3 ${navOpen ? 'animateBar3' : ''}`}></div>
          </div>
        </div>
      </div>

      <nav>
        <ul className={`main-nav-links ${navOpen && 'nav-open'}`}>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          {sortedLinks.map((link, i) => {
            return (
              <MobileNavItems
                navlink={link.attributes}
                key={i}
                depthLevel={depthLevel}
              />
            )
          })}
        </ul>
      </nav>
    </>
  )
}
