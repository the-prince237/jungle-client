'use client';
import BottomNavBar from '../../ui/bottom-nav-bar'

const BottomMenu = () => {
  return (
    <div className="fixed z-50 bottom-5 w-full md:hidden padded-x">
      <BottomNavBar />
    </div>
  )
}

export default BottomMenu