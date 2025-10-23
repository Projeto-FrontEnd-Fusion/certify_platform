export const smoothSlideDownVariant = {
  initial: {
    opacity: 0,
    scaleY: 0,
    transformOrigin: "top",
  },
  animate: {
    opacity: 1,
    scaleY: 1,
    transformOrigin: "top",
    transition: {
      duration: 0.35,
    },
  },
  exit: {
    opacity: 0,
    scaleY: 0,
    transformOrigin: "top",
    transition: {
      duration: 0.35,
    },
  },
};
