import { NavLink } from '@remix-run/react'
import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from '~/components/icons/NavIcons'
import MobileDropdownItems from './MobileDropdownItems'

export default function MobileNavItems({ navlink, depthLevel, direction }) {
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

  return (
    <>
      <li className='relative' ref={ref}>
        {navlink?.nestedNavLinks?.length > 0 ? (
          <>
            <span>
              <NavLink to={navlink.page.data.attributes.slug}>
                {navlink.title}
              </NavLink>
              <button
                type='button'
                aria-haspopup='menu'
                aria-expanded={dropDown ? 'true' : 'false'}
                onClick={() => setDropDown(!dropDown)}
                className={`chevron-icon ${
                  dropDown ? 'animate-rotateChevron' : ''
                }`}>
                <ChevronDown />
              </button>
            </span>
            <MobileDropdownItems
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
