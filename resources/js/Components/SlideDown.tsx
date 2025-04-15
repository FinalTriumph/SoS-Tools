import { motion, AnimatePresence } from 'framer-motion';

interface SlideDownProps {
    show: boolean;
    children: React.ReactNode;
}

export default function SlideDown({
    show,
    children,
}: SlideDownProps) {
    return (
        <AnimatePresence initial={false}>
            {show && (
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    style={{ overflow: 'hidden' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
