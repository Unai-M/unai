import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export default function Lines() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [points, setPoints] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setPoints({ width, height });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 h-screen w-full"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.line
          x1={points.width / 2}
          y1={points.height}
          x2="0"
          y2={points.height / 3}
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
          exit={{ pathLength: 0 }}
        />

        <motion.line
          x1={points.width / 2}
          y1={points.height}
          x2={points.width}
          y2={points.height / 3}
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          exit={{ pathLength: 0 }}
        />

        <motion.line
          x1={points.width / 2}
          y1={points.height}
          x2={points.width / 6}
          y2="0"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
          exit={{ pathLength: 0 }}
        />

        <motion.line
          x1={points.width / 2}
          y1={points.height}
          x2={points.width - points.width / 6}
          y2="0"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          exit={{ pathLength: 0 }}
        />
      </svg>
    </div>
  );
}
