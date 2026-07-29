"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** 読み込みも演出にする。暗闇に題字が浮かび、幕が上がる。 */
export default function Opening() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setDone(true);
      document.body.style.overflow = "";
    }, 3400);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-sumi"
          exit={{ opacity: 0, transition: { duration: 1.4, ease: "easeInOut" } }}
          aria-hidden
        >
          <div className="flex flex-col items-center gap-8">
            <motion.h1
              className="serif-display tategaki text-2xl md:text-3xl tracking-[0.5em] text-kinari"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
            >
              乱歩と名張
            </motion.h1>
            <motion.span
              className="serif-display text-sm tracking-[0.6em] text-copper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, delay: 1.6, ease: "easeOut" }}
            >
              第二章
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
