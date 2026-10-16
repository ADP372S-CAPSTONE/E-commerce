import { motion, useReducedMotion } from 'motion/react'
import { pageVariants } from '../../../constants/motion/motionTokens.js'

/**
 * Route level crossfade. Keyed on the current pathname by the caller so each
 * navigation replays the entrance.
 */
export default function PageTransition({ children }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return children

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate">
      {children}
    </motion.div>
  )
}
