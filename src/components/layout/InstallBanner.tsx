"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Download, Share, X } from "lucide-react";

const DISMISS_KEY = "ustatop-install-dismissed";
const DISMISS_DAYS = 7;

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const noopSubscribe = () => () => {};

function isPhone() {
  return /Android|iPhone|iPod|Mobi/i.test(navigator.userAgent);
}

function isIos() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isInstalled() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function recentlyDismissed() {
  try {
    const at = Number(localStorage.getItem(DISMISS_KEY));
    return at > 0 && Date.now() - at < DISMISS_DAYS * 86_400_000;
  } catch {
    return false;
  }
}

/** Faqat telefonda, ilova hali o‘rnatilmagan va yaqinda yopilmagan bo‘lsa. */
function getEligible() {
  return isPhone() && !isInstalled() && !recentlyDismissed();
}

export function InstallBanner() {
  const eligible = useSyncExternalStore(noopSubscribe, getEligible, () => false);
  const [closed, setClosed] = useState(false);
  const [help, setHelp] = useState(false);
  const [prompt, setPrompt] = useState<InstallPromptEvent | null>(null);

  useEffect(() => {
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPrompt(event as InstallPromptEvent);
    };
    const onInstalled = () => setClosed(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!eligible || closed) return null;

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
    setClosed(true);
  }

  async function install() {
    if (!prompt) return setHelp((value) => !value);
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    setPrompt(null);
    if (outcome === "accepted") setClosed(true);
  }

  return (
    <div className="bg-brand-900 text-white" role="region" aria-label="Ilovani yuklab olish">
      <div className="flex items-center gap-3 px-3 py-2.5">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Yopish"
          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-brand-200 transition hover:bg-white/10 hover:text-white"
        >
          <X className="size-4" aria-hidden />
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/icon-192.png" alt="" className="size-10 shrink-0 rounded-xl" />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-sm font-bold">UstaTop ilovasi</p>
          <p className="truncate text-xs text-brand-200">Bosh ekranga o‘rnating</p>
        </div>
        <button
          type="button"
          onClick={install}
          aria-expanded={!prompt ? help : undefined}
          className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-accent-400 px-4 py-2 text-sm font-extrabold text-brand-950 transition active:scale-95"
        >
          <Download className="size-4" aria-hidden />
          Yuklab olish
        </button>
      </div>

      {help && !prompt && (
        <div className="border-t border-white/10 px-4 py-3 text-sm text-brand-100">
          {isIos() ? (
            <ol className="list-inside list-decimal space-y-1">
              <li>
                Safari pastidagi <Share className="inline size-4 align-text-bottom" aria-hidden />{" "}
                <b>«Ulashish»</b> tugmasini bosing
              </li>
              <li>
                <b>«Bosh ekranga qo‘shish»</b> ni tanlang
              </li>
              <li>
                <b>«Qo‘shish»</b> ni bosing — tayyor!
              </li>
            </ol>
          ) : (
            <ol className="list-inside list-decimal space-y-1">
              <li>
                Brauzerning <b>⋮</b> menyusini oching
              </li>
              <li>
                <b>«Ilovani o‘rnatish»</b> yoki <b>«Bosh ekranga qo‘shish»</b> ni tanlang
              </li>
              <li>Tasdiqlang — UstaTop ikonkasi telefoningizda paydo bo‘ladi</li>
            </ol>
          )}
        </div>
      )}
    </div>
  );
}
