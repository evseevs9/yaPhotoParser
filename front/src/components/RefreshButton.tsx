import { RefreshCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { restDataType } from '../types/RestDataType'
import { FC } from 'react'

interface RefreshButtonProps {
  setRestData: (value: restDataType) => void
  setSelectedRestData: (value: restDataType) => void
  setSlugName: (value: string) => void
  setFilterValue: (value: string) => void
  slugName: string
}

const RefreshButton: FC<RefreshButtonProps> = ({
  setRestData,
  setSelectedRestData,
  setSlugName,
  slugName,
  setFilterValue,
}) => {
  const handleRefresh = () => {
    setRestData([])
    setSelectedRestData([])
    setSlugName('')
    setFilterValue('')
  }

  return (
    <>
      <AnimatePresence>
        {slugName && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type='button'
            className='refresh-button'
            onClick={handleRefresh}
            key='refreshButton'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <RefreshCcw size={44} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default RefreshButton
