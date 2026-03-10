import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({
  open,
  images,
  index,
  onClose,
  onPrev,
  onNext,
}) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose, onPrev, onNext]);

  const currentImage = images?.[index];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-label="Image gallery lightbox"
        >
          <motion.div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-glow"
            initial={{ scale: 0.98, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 10, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={currentImage?.src || "/gallery/1.png"}
                alt={currentImage?.alt || "Gallery image"}
                fill
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="flex items-center justify-between gap-3 p-4">
              <div className="truncate text-sm text-white/80">
                {currentImage?.title || currentImage?.alt || ""}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="btn-ghost px-3 py-2"
                  onClick={onPrev}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  className="btn-ghost px-3 py-2"
                  onClick={onNext}
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>

                <button
                  type="button"
                  className="btn-ghost px-3 py-2"
                  onClick={onClose}
                  aria-label="Close lightbox"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}