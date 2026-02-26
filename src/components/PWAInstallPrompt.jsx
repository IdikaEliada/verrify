import { useState, useEffect } from "react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
      <div className="bg-[#1a1612] border border-[#2a2520] rounded-xl p-4 shadow-2xl flex items-start gap-3">
        <div className="text-2xl">📱</div>
        <div className="flex-1">
          <p className="text-[#e8e0d0] font-semibold text-sm">Install Verrify</p>
          <p className="text-[#8a7f72] text-xs mt-0.5">Add to home screen for quick access</p>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setShowPrompt(false)}
            className="text-[#8a7f72] hover:text-[#e8e0d0] text-xs transition-colors"
          >
            Later
          </button>
          <button
            onClick={handleInstall}
            className="bg-[#c8a96e] text-[#0a0a0a] text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#d4b87e] transition-colors"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}