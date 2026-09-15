import { useState } from "react";
import { Mail, X } from "lucide-react";

export default function EmailWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 rounded-2xl border border-white/20 bg-navy/95 p-5 shadow-2xl backdrop-blur-xl w-64 animate-slideUp">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-white">Contact Support</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-white/70 mb-4">
            Send us an email and we'll respond within 24 hours.
          </p>
          <a
            href="mailto:uniteduniontrust@gmail.com?subject=Support Request"
            className="gradient-primary flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            <Mail className="h-4 w-4" />
            uniteduniontrust@gmail.com
          </a>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="gradient-primary shadow-glow flex h-14 w-14 items-center justify-center rounded-full text-white hover:scale-110 transition-transform duration-300"
      >
        <Mail className="h-6 w-6" />
      </button>
      
      <span className="mt-2 text-xs text-white/50">Email Us</span>
    </div>
  );
}