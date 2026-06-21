
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Menu, X } from "lucide-react";
// import logo from "../assets/logo.png";

// function Navbar() {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Personal", href: "#" },
//     { name: "Corporate", href: "#" },
//     { name: "Insurance", href: "#" },
//     { name: "Mortgages", href: "#" },
//     { name: "Savings", href: "#" },
//   ];

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm text-white px-6 py-4 shadow-lg">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">

//         {/* Logo */}
//         <div className="cursor-pointer flex items-center gap-2" onClick={() => navigate("/")}>
//           <img src={logo} alt="Novexus Finance" className="h-12 w-auto rounded-full shadow-md border border-green-500/30" />
//           <div className="hidden sm:block">
//             <h3 className="font-bold text-2xl text-transparent bg-clip-text text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400 tracking-wider">
//             NOVEXUS FINANCE
//             </h3>
            
//             <p className="text-[10px] text-gray-300 italic -mt-1">
//              Your Trusted Banking Partner
//             </p>
//           </div>
//         </div>

//         {/* Desktop Navigation */}
//         <ul className="hidden lg:flex gap-6 text-sm">
//           {navLinks.map((link) => (
//             <li
//               key={link.name}
//               onClick={() => navigate(link.href)}
//               className="hover:text-green-400 cursor-pointer transition-colors"
//             >
//               {link.name}
//             </li>
//           ))}
//         </ul>

//         {/* Desktop Right Section */}
//         <div className="hidden lg:flex items-center gap-4">
//           <button
//             onClick={() => navigate("/pin")}
//             className="hover:text-green-400 transition-colors text-sm"
//           >
//             Login
//           </button>
//           <button
//             onClick={() => navigate("/register")}
//             className="bg-green-500 hover:bg-green-400 text-black px-5 py-2 rounded-full font-semibold transition-all text-sm"
//           >
//             Open Account →
//           </button>
//         </div>

//         {/* Mobile Right Section */}
//         <div className="lg:hidden flex items-center gap-3">
//           <button
//             onClick={() => navigate("/pin")}
//             className="text-sm hover:text-green-400 transition-colors"
//           >
//             Login
//           </button>
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="p-2 rounded-lg hover:bg-white/10 transition-colors"
//           >
//             {menuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="lg:hidden mt-4 bg-gray-800 rounded-2xl p-4 space-y-2 mx-2">
//           {navLinks.map((link) => (
//             <button
//               key={link.name}
//               onClick={() => {
//                 navigate(link.href);
//                 setMenuOpen(false);
//               }}
//               className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-700 transition-colors text-sm"
//             >
//               {link.name}
//             </button>
//           ))}
//           <div className="border-t border-gray-700 pt-3">
//             <button
//               onClick={() => {
//                 navigate("/register");
//                 setMenuOpen(false);
//               }}
//               className="w-full bg-green-500 text-black px-5 py-3 rounded-full font-semibold text-sm hover:bg-green-400 transition-all"
//             >
//               Open Account →
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;


import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { name: t('nav.home'), href: "/" },
    { name: t('nav.personal'), href: "#" },
    { name: t('nav.corporate'), href: "#" },
    { name: t('nav.insurance'), href: "#" },
    { name: t('nav.mortgages'), href: "#" },
    { name: t('nav.savings'), href: "#" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="cursor-pointer flex items-center gap-2" onClick={() => navigate("/")}>
          <img src={logo} alt="Novexus Finance" className="h-12 w-auto rounded-full shadow-md border border-green-500/30" />
          <div className="hidden sm:block">
            <h3 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400 tracking-wider">
              NOVEXUS FINANCE
            </h3>
            <p className="text-[10px] text-gray-300 italic -mt-1">
              {t('footer.tagline')}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-6 text-sm">
          {navLinks.map((link) => (
            <li
              key={link.name}
              onClick={() => navigate(link.href)}
              className="hover:text-green-400 cursor-pointer transition-colors"
            >
              {link.name}
            </li>
          ))}
        </ul>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={() => navigate("/pin")}
            className="hover:text-green-400 transition-colors text-sm"
          >
            {t('nav.login')}
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-green-500 hover:bg-green-400 text-black px-5 py-2 rounded-full font-semibold transition-all text-sm"
          >
            {t('nav.openAccount')}
          </button>
        </div>

        {/* Mobile Right Section */}
        <div className="lg:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => navigate("/pin")}
            className="text-sm hover:text-green-400 transition-colors"
          >
            {t('nav.login')}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-4 bg-gray-800 rounded-2xl p-4 space-y-2 mx-2">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                navigate(link.href);
                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-700 transition-colors text-sm"
            >
              {link.name}
            </button>
          ))}
          <div className="border-t border-gray-700 pt-3">
            <button
              onClick={() => {
                navigate("/register");
                setMenuOpen(false);
              }}
              className="w-full bg-green-500 text-black px-5 py-3 rounded-full font-semibold text-sm hover:bg-green-400 transition-all"
            >
              {t('nav.openAccount')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;