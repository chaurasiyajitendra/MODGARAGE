import { motion } from "framer-motion";
import { Link } from "react-router";

const menuItems = [
  "HOME",
  "VEHICLES",
  "ABOUT",
  "OUR REVIEWS",
  "CONTACT",
];
const Navbar = () => {
  return (
<motion.aside
  initial="hidden"
  animate="visible"
  className="absolute left-10 top-1/2 z-20 -translate-y-1/2"
>
  <motion.nav
    className="space-y-8"
    variants={{
      visible: {
        transition: {
          staggerChildren: 0.2, // delay between each menu item
        },
      },
    }}
  >
    {menuItems.map((item, index) => (
      <motion.div
        key={item}
        variants={{
          hidden: {
            opacity: 0,
            x: -40,
          },
          visible: {
            opacity: 1,
            x: 0,
          },
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        whileHover={{ x: 10 }}
        className="relative"
      >
        <Link
        to={`/${item}`}
          className={`text-sm tracking-[0.2em] transition-all duration-300 ${
            index === 0
              ? "text-white"
              : "text-white/70 hover:text-white"
          }`}
        >
          {item}
        </Link>

        {index === 0 && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{
              delay: 0.8,
              duration: 0.5,
            }}
            className="mt-1 h-[2px] bg-white"
          />
        )}
      </motion.div>
    ))}
  </motion.nav>
</motion.aside>
  )
}

export default Navbar