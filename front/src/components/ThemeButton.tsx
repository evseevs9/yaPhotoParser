import { SunMoon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const ThemeButton = () => {
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark')

  const handleThemeButton = () => {
    setIsDark((prev) => !prev)
    document.body.classList.toggle('dark-style', !isDark)
  }

  useEffect(() => {
    const root = document.body
    if (isDark) {
      root.classList.add('dark-style')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark-style')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type='button'
      className='theme-button'
      onClick={handleThemeButton}
    >
      <SunMoon size={44} />
    </motion.button>
  )
}

export default ThemeButton
