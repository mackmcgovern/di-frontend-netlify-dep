import MobileNavItems from './MobileNavItems'

export default function MobileDropdownItems({
  subItems,
  dropDown,
  depthLevel,
}) {
  depthLevel = depthLevel + 1

  return (
    <>
      <ul
        className={`dropdown ${dropDown ? 'open' : ''} ${
          depthLevel > 1 ? `nested` : ''
        }`}>
        {subItems.map((item, i) => (
          <MobileNavItems navlink={item} key={i} depthLevel={depthLevel} />
        ))}
      </ul>
    </>
  )
}
