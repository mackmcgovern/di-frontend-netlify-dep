import { NavLink } from '@remix-run/react'
import { useState, useEffect, useRef } from 'react'
import DropdownItems from './DropdownItems'
import { ChevronRight } from '~/components/icons/NavIcons'

export default function NavItems({ navlink, depthLevel, direction }) {
  const [dropDown, setDropDown] = useState(false)
  let ref = useRef()

  useEffect(() => {
    const handler = event => {
      if (dropDown && ref.current && !ref.current.contains(event.target)) {
        setDropDown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [dropDown])

  const onMouseEnter = () => {
    window.innerWidth >= 768 && setDropDown(true)
  }
  const onMouseLeave = () => {
    window.innerWidth >= 768 && setDropDown(false)
  }

  return (
    <>
      <li
        className='relative z-40'
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
        {navlink?.nestedNavLinks?.length > 0 ? (
          <>
            <NavLink to={navlink.page.data.attributes.slug}>
              <span>
                {navlink.title}
                {depthLevel > 0 && (
                  <span className='pt-[2px]'>
                    <ChevronRight />
                  </span>
                )}
              </span>
            </NavLink>
            <DropdownItems
              subItems={navlink.nestedNavLinks}
              dropDown={dropDown}
              depthLevel={depthLevel}
              direction={direction}
            />
          </>
        ) : (
          <NavLink to={navlink.page.data.attributes.slug}>
            {navlink.title}
          </NavLink>
        )}
      </li>
    </>
  )
}
