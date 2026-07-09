import { CircleArrowUp } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

const UpButton = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const { scrollY } = useScroll()
  const offsetY = [250, 600]
  const scrollOpacity = useTransform(scrollY, offsetY, [0, 1])
  const offsetscrollY = useTransform(scrollY, offsetY, [60, 0])

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type='button'
      className='scroll-to-top'
      onClick={scrollToTop}
      style={{ opacity: scrollOpacity, y: offsetscrollY }}
    >
      <CircleArrowUp size={44} />
    </motion.button>
  )
}

export default UpButton
