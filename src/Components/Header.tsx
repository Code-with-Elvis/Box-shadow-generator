import { IoMoonOutline } from 'react-icons/io5'
import { AiOutlineSun } from 'react-icons/ai'
import { useAppSelector } from '../hooks'
import { useDispatch } from 'react-redux'
import { toggleTheme } from '../Features/User/useSlice'
import { useEffect } from 'react'

const Header = () => {
  const { theme } = useAppSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [theme])
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [])
  return (
    <header className="container main-header">
      <button
        onClick={() => {
          dispatch(toggleTheme(theme == 'dark' ? 'light' : 'dark'))
        }}
      >
        {theme === 'light' ? (
          <AiOutlineSun size={18} />
        ) : (
          <IoMoonOutline size={18} />
        )}
      </button>
    </header>
  )
}
export default Header
