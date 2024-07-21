import { motion } from "framer-motion";

const MotionComponent = ({ as, children, ...props }) => {
  const ChildrenComponent = motion(as, {
    forwardMotionProps: true,
  });

  return <ChildrenComponent {...props}>{children}</ChildrenComponent>;
};

export default MotionComponent;
