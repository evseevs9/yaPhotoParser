import { Variants } from 'motion'
import { motion } from 'framer-motion'

const LoadingButton = () => {
  const dotVariants: Variants = {
    pulse: {
      scale: [1, 1.7, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <>
      <motion.div
        className='load-in-button-container'
        animate='pulse'
        transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      >
        <motion.div className='load-dot' variants={dotVariants} />
        <motion.div className='load-dot' variants={dotVariants} />
        <motion.div className='load-dot' variants={dotVariants} />
      </motion.div>
    </>
  )
}

export default LoadingButton
