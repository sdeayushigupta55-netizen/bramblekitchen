import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ open, images, index, onClose, onPrev, onNext }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 bg-ink shadow-glow"
            initial={{ scale: 0.98, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 10, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[4/3] bg-center bg-cover" style={{ backgroundImage: `url('${images[index]?.src}')` }} />
            <div className="p-4 flex items-center justify-between gap-3">
              <div className="text-sm text-white/80 truncate">{images[index]?.alt || ""}</div>
              <div className="flex items-center gap-2">
                <button className="btn-ghost px-3 py-2" onClick={onPrev}><ChevronLeft size={18} /></button>
                <button className="btn-ghost px-3 py-2" onClick={onNext}><ChevronRight size={18} /></button>
                <button className="btn-ghost px-3 py-2" onClick={onClose}><X size={18} /></button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
