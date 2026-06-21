import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'vi', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'th', name: 'Thailand', flag: '🇹🇭' },
  { code: 'my', name: 'မြန်မာ', flag: '🇲🇲' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'pt-BR', name: 'Português (BR)', flag: '🇧🇷' },
  { code: 'pt-PT', name: 'Português (PT)', flag: '🇵🇹' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'km', name: 'ភាសាខ្មែរ', flag: '🇰🇭' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'fil', name: 'Filipino', flag: '🇵🇭' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'lo', name: 'ລາວ', flag: '🇱🇦' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/10 transition-all"
      >
        <Globe size={16} className="text-white" />
        <span className="text-sm text-white">{currentLanguage.flag}</span>
        <ChevronDown size={14} className="text-white" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-gray-800 rounded-xl shadow-lg z-50 w-48 max-h-96 overflow-y-auto border border-gray-700">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-700 transition-colors ${
                i18n.language === lang.code ? 'bg-green-700' : ''
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="text-sm text-white">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;