import NavItems from './NavItems'

export default function DropdownItems({ subItems, dropDown, depthLevel }) {
  depthLevel = depthLevel + 1

  return (
    <>
      <ul
        className={`dropdown absolute ${dropDown ? 'block' : 'hidden'} ${
          depthLevel > 1 ? `top-0 left-[100%] nested` : ''
        }`}>
        {subItems.map((item, i) => (
          <NavItems navlink={item} key={i} depthLevel={depthLevel} />
        ))}
      </ul>
    </>
  )
}
