import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../COMPONENTS/Navbar";
import {
  ShieldCheck,
  Zap,
  Globe,
  Smartphone,
  ChevronDown,
  ArrowRight,
  Star,
  Lock,
  Users,
  DollarSign,
  Clock,
} from "lucide-react";

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const testimonialsRef = useRef(null);
  const securityRef = useRef(null);

  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=1200&q=80",
      title: t("hero.title1"),
      subtitle: t("hero.subtitle1"),
    },
    {
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
      title: t("hero.title2"),
      subtitle: t("hero.subtitle2"),
    },
    {
      image:
        "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=1200&q=80",
      title: t("hero.title3"),
      subtitle: t("hero.subtitle3"),
    },
  ];

  const stats = [
    { icon: Users, value: "10,000+", labelKey: "stats.users" },
    { icon: DollarSign, value: "$50M+", labelKey: "stats.transferred" },
    { icon: Clock, value: "99.9%", labelKey: "stats.uptime" },
    { icon: ShieldCheck, value: "256-bit", labelKey: "stats.encryption" },
  ];

  const features = [
    { titleKey: "features.noFees", descKey: "features.noFeesDesc", icon: "💰" },
    {
      titleKey: "features.highInterest",
      descKey: "features.highInterestDesc",
      icon: "📈",
    },
    {
      titleKey: "features.support",
      descKey: "features.supportDesc",
      icon: "🤝",
    },
    {
      titleKey: "features.instantTransfers",
      descKey: "features.instantTransfersDesc",
      icon: "⚡",
    },
    {
      titleKey: "features.security",
      descKey: "features.securityDesc",
      icon: "🔒",
    },
    { titleKey: "features.mobile", descKey: "features.mobileDesc", icon: "📱" },
  ];

  const testimonials = [
    { textKey: "testimonials.t1", nameKey: "testimonials.t1Name", rating: 5 },
    { textKey: "testimonials.t2", nameKey: "testimonials.t2Name", rating: 5 },
    { textKey: "testimonials.t3", nameKey: "testimonials.t3Name", rating: 5 },
  ];

  const faqs = [
    { qKey: "faq.q1", aKey: "faq.a1" },
    { qKey: "faq.q2", aKey: "faq.a2" },
    { qKey: "faq.q3", aKey: "faq.a3" },
    { qKey: "faq.q4", aKey: "faq.a4" },
  ];

  const howItWorksSteps = [
    {
      step: "01",
      titleKey: "howItWorks.step1",
      descKey: "howItWorks.step1Desc",
      color: "from-green-500 to-green-600",
    },
    {
      step: "02",
      titleKey: "howItWorks.step2",
      descKey: "howItWorks.step2Desc",
      color: "from-purple-500 to-purple-600",
    },
    {
      step: "03",
      titleKey: "howItWorks.step3",
      descKey: "howItWorks.step3Desc",
      color: "from-blue-500 to-blue-600",
    },
  ];

  const securityFeatures = [
    {
      icon: Lock,
      titleKey: "security.encryption",
      descKey: "security.encryptionDesc",
    },
    {
      icon: ShieldCheck,
      titleKey: "security.twoFactor",
      descKey: "security.twoFactorDesc",
    },
    {
      icon: Zap,
      titleKey: "security.monitoring",
      descKey: "security.monitoringDesc",
    },
    {
      icon: Globe,
      titleKey: "security.compliance",
      descKey: "security.complianceDesc",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  return (
    <div className="overflow-x-hidden font-sans">
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt="hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-purple-900/50" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 text-white text-center max-w-3xl px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-green-400 text-sm tracking-widest uppercase mb-4">
                {t("hero.welcome")}
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {heroSlides[currentSlide].title.split(" ").map((word, i) =>
                  i === 1 ? (
                    <span
                      key={i}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400"
                    >
                      {" "}
                      {word}{" "}
                    </span>
                  ) : (
                    word + " "
                  ),
                )}
              </h1>
              <p className="text-gray-300 text-lg mb-8">
                {heroSlides[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/register")}
              className="bg-gradient-to-r from-green-500 to-green-600 text-black px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-green-500/25 transition-all"
            >
              {t("hero.openAccount")}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/pin")}
              className="border-2 border-green-400 px-8 py-3 rounded-full font-semibold hover:bg-green-400 hover:text-black transition-all"
            >
              {t("hero.login")}
            </motion.button>
          </div>

          <div className="flex justify-center gap-2 mt-10">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? "w-8 bg-green-400" : "w-2 bg-white/40"}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 cursor-pointer"
          onClick={() => scrollTo(featuresRef)}
        >
          <ChevronDown size={32} />
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-gray-900 to-purple-900 py-16 px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="text-center text-white"
            >
              <div className="flex justify-center mb-3">
                <div className="bg-green-500/20 p-3 rounded-full">
                  <stat.icon className="text-green-400" size={24} />
                </div>
              </div>
              <p className="text-3xl font-bold text-green-400">{stat.value}</p>
              <p className="text-gray-400 text-sm mt-1">{t(stat.labelKey)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="py-20 px-4 bg-gray-50">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-green-600 text-sm font-semibold uppercase tracking-widest mb-2">
              {t("features.subtitle")}
            </p>
            <h2 className="text-4xl font-bold text-gray-900">
              {t("features.title")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-gray-500">{t(feature.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* How It Works */}
      <div ref={howItWorksRef} className="py-20 px-4 bg-white">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-purple-600 text-sm font-semibold uppercase tracking-widest mb-2">
              {t("howItWorks.subtitle")}
            </p>
            <h2 className="text-4xl font-bold text-gray-900">
              {t("howItWorks.title")}
            </h2>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {howItWorksSteps.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="text-center flex-1 relative"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${item.color} text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg`}
                >
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {t(item.titleKey)}
                </h3>
                <p className="text-gray-500">{t(item.descKey)}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-10 right-0 transform translate-x-1/2">
                    <ArrowRight className="text-gray-300" size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Security Section */}
      <div
        ref={securityRef}
        className="py-20 px-4 bg-gradient-to-br from-gray-900 to-purple-900 text-white"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-2">
              {t("security.subtitle")}
            </p>
            <h2 className="text-4xl font-bold">{t("security.title")}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {securityFeatures.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
              >
                <div className="bg-green-500/20 p-3 rounded-xl">
                  <item.icon className="text-green-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{t(item.titleKey)}</h3>
                  <p className="text-gray-400 text-sm">{t(item.descKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Testimonials */}
      <div ref={testimonialsRef} className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-green-600 text-sm font-semibold uppercase tracking-widest mb-2">
            {t("testimonials.subtitle")}
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            {t("testimonials.title")}
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ),
                )}
              </div>
              <p className="text-xl text-gray-700 mb-4 italic">
                "{t(testimonials[currentTestimonial].textKey)}"
              </p>
              <p className="text-green-600 font-semibold">
                — {t(testimonials[currentTestimonial].nameKey)}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`h-2 rounded-full transition-all ${i === currentTestimonial ? "w-8 bg-green-500" : "w-2 bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* App Download */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-600 via-green-700 to-purple-700 rounded-3xl p-12 text-white text-center shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">{t("app.title")}</h2>
          <p className="text-xl mb-8 text-green-100">{t("app.subtitle")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-black text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-900 transition">
              <span>📱</span> {t("app.appStore")}
            </button>
            <button className="bg-black text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-900 transition">
              <span>📲</span> {t("app.googlePlay")}
            </button>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-600 text-sm font-semibold uppercase tracking-widest mb-2">
              {t("faq.subtitle")}
            </p>
            <h2 className="text-4xl font-bold text-gray-900">
              {t("faq.title")}
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <span className="font-semibold text-gray-900">
                    {t(faq.qKey)}
                  </span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="text-gray-400" size={20} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="px-6 pb-6 text-gray-500">{t(faq.aKey)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-xl mb-3 text-green-400">
              United Union Trust Bank
            </h3>
            <p className="text-gray-400 text-sm mb-3">{t("footer.tagline")}</p>
            <div className="flex gap-3 mt-4">
              <span className="text-gray-500 text-xs">📍 Global Banking</span>
              <span className="text-gray-500 text-xs">🔒 256-bit Secure</span>
            </div>
            <div className="mt-3">
              <p className="text-gray-500 text-xs">
                📞 24/7 Customer Support: +1 (540) 317-6252
              </p>
              <p className="text-gray-500 text-xs mt-1">
                ✉️ uniteduniontrustbank@gmail.com
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-green-300">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-green-400 cursor-pointer transition-colors">
                🏦 {t("footer.about")}
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">
                💼 {t("footer.careers")}
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">
                📞 {t("footer.contact")}
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">
                📍 {t("footer.branchLocator")}
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">
                📱 {t("footer.mobileBanking")}
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">
                💰 {t("footer.loanCalculator")}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-green-300">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-green-400 cursor-pointer transition-colors">
                📜 {t("footer.privacy")}
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">
                ⚖️ {t("footer.terms")}
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">
                🔐 {t("footer.securityLink")}
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">
                🍪 {t("footer.cookiePolicy")}
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">
                📢 {t("footer.complaints")}
              </li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">
                🏛️ {t("footer.regulatoryDisclosures")}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-green-300">
              {t("footer.followUs")}
            </h4>
            <div className="flex gap-4 mb-6">
              {[
                { icon: "🐦", name: "Twitter", url: "https://twitter.com" },
                { icon: "📘", name: "Facebook", url: "https://facebook.com" },
                { icon: "📷", name: "Instagram", url: "https://instagram.com" },
                { icon: "💼", name: "LinkedIn", url: "https://linkedin.com" },
                { icon: "🎵", name: "TikTok", url: "https://tiktok.com" },
              ].map((social, i) => (
                <motion.span
                  key={i}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="text-2xl cursor-pointer hover:text-green-400 transition-colors"
                  title={social.name}
                  onClick={() => window.open(social.url, "_blank")}
                >
                  {social.icon}
                </motion.span>
              ))}
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2 text-green-300 text-sm">
                {t("footer.newsletter")}
              </h4>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 rounded-lg text-gray-800 text-sm outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2 rounded-lg transition-colors">
                  {t("footer.subscribe")}
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-2">
                Get latest offers and updates
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm">{t("footer.copyright")}</p>
              <p className="text-gray-600 text-xs mt-1">
                United Union Trust Bank is a registered trademark. Banking services
                provided by United Union Trust Financial Group.
              </p>
            </div>
            <div className="flex gap-6">
              <span className="text-gray-500 text-xs">
                {t("footer.fdicInsured")}
              </span>
              <span className="text-gray-500 text-xs">
                {t("footer.sslSecure")}
              </span>
              <span className="text-gray-500 text-xs">
                {t("footer.visaPartner")}
              </span>
            </div>
          </div>
          <div className="text-center text-gray-600 text-xs mt-4">
            Built with ❤️ for secure banking
          </div>
        </div>
      </footer>

      {/* ===== FLOATING WHATSAPP BUTTON ===== */}
      <a
        href="https://wa.me/15403176252?text=Hello%20United%20Union%20Trust%20Bank%2C%20I%20need%20assistance"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
        aria-label="Chat on WhatsApp"
      >
        <div className="relative">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
        </div>
      </a>
    </div>
  );
}

export default Home;