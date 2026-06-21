import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';
import ptBR from './locales/pt-BR.json';
import ptPT from './locales/pt-PT.json';
import de from './locales/de.json';
import th from './locales/th.json';
import my from './locales/my.json';
import hi from './locales/hi.json';
import km from './locales/km.json';
import uk from './locales/uk.json';
import vi from './locales/vi.json';
import id from './locales/id.json';
import ru from './locales/ru.json';
import fil from './locales/fil.json';
import ms from './locales/ms.json';
import pl from './locales/pl.json';
import tr from './locales/tr.json';
import lo from './locales/lo.json';
import ja from './locales/ja.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  ar: { translation: ar },
  'pt-BR': { translation: ptBR },
  'pt-PT': { translation: ptPT },
  de: { translation: de },
  th: { translation: th },
  my: { translation: my },
  hi: { translation: hi },
  km: { translation: km },
  uk: { translation: uk },
  vi: { translation: vi },
  id: { translation: id },
  ru: { translation: ru },
  fil: { translation: fil },
  ms: { translation: ms },
  pl: { translation: pl },
  tr: { translation: tr },
  lo: { translation: lo },
  ja: { translation: ja },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;