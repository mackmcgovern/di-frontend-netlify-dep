import { Link, NavLink } from '@remix-run/react'
import NavItems from './NavItems'

export default function Navbar({ data }) {
  const depthLevel = 0
  const sortedLinks = data.data.sort(
    (a, b) => a.attributes.order - b.attributes.order
  )

  return (
    <>
      <div className='xl:px-8 md:flex justify-between items-center'>
        <Link to='/'>
          <div className='flex items-center container px-4'>
            <img
              src='images/logo.png'
              alt='logo'
              className='py-2 w-14 h-auto brightness-95'
            />
            <p className='text-[2.5rem] text-slate-800 logo tracking-wide transition hover:drop-shadow-md leading-24 my-4 ml-4 pt-2'>
              Duluth Institute
            </p>
          </div>
        </Link>
      </div>
      <div className='shadow-sm bg-navbar-blue'>
        <nav className='container px-4 lg:px-14'>
          <ul className='flex justify-between max-w-5xl text-lg main-nav-links'>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            {sortedLinks.map((link, i) => {
              return (
                <NavItems
                  navlink={link.attributes}
                  key={i}
                  depthLevel={depthLevel}
                />
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}
