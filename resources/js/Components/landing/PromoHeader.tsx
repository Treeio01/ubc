import { useEffect, useRef, useState } from "react";
import { useLocaleHref } from "@/Components/LocaleLink";
import { useLocaleContext } from "@/i18n/LocaleProvider";
import { useT } from "@/i18n/useT";
import { LANGUAGES, type LanguageCode } from "./data";

const CODE_TO_LOCALE: Record<LanguageCode, string> = { DE: "de", FR: "fr" };
const LOCALE_TO_CODE: Record<string, LanguageCode> = { de: "DE", fr: "FR" };

const navItems = [
    { key: "landing.nav.pay", hash: "#benefits" },
    { key: "landing.nav.steps", hash: "#steps" },
    { key: "landing.nav.faq", hash: "#faq" },
];

const headerPrimaryButtonClass =
    "group inline-flex w-max items-center gap-2 rounded-[2px] bg-[#E60000] px-[19px] py-[8px] text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#B80000] hover:shadow-[0_16px_34px_rgba(230,0,0,0.26)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E60000] active:translate-y-0 active:scale-[0.98] lg:px-[44px] lg:py-[13px]";
const outlineButtonClass =
    "inline-flex items-center justify-center rounded-[2px] border border-black px-[19px] py-[8px] text-black transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#E60000] hover:bg-[#E60000] hover:text-white hover:shadow-[0_12px_24px_rgba(230,0,0,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E60000] active:translate-y-0 active:scale-[0.98] lg:px-[44px] lg:py-[13px]";
const navLinkClass =
    "relative font-light text-[14px] text-[#3C3C3C] transition-colors duration-300 after:absolute after:left-0 after:top-[calc(100%+6px)] after:h-[2px] after:w-0 after:bg-[#E60000] after:transition-all after:duration-300 hover:text-[#E60000] hover:after:w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E60000] lg:text-[20px]";

function updatePathLocale(nextLocale: string) {
    const parts = window.location.pathname.split("/");
    if (parts[1] === "de" || parts[1] === "fr") {
        parts[1] = nextLocale;
        window.history.replaceState(null, "", `${parts.join("/")}${window.location.search}${window.location.hash}`);
    }
}

function LanguageSwitcher() {
    const { locale, setLocale } = useLocaleContext();
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const activeCode = LOCALE_TO_CODE[locale] ?? "DE";

    useEffect(() => {
        if (!open) return;
        const handleClick = (event: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    const changeLanguage = (code: LanguageCode) => {
        const nextLocale = CODE_TO_LOCALE[code];
        setLocale(nextLocale);
        updatePathLocale(nextLocale);
        setOpen(false);
    };

    return (
        <div ref={rootRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className="flex items-center gap-2 rounded-[2px] border border-black px-[10px] py-[10px] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#E60000] hover:bg-[#E60000] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E60000] active:translate-y-0 lg:px-[16px] lg:py-[13px]"
            >
                <span className="text-[9px] leading-[100%] lg:text-[15px]">{activeCode}</span>
                <svg className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M3.897 6.75 7.794 0H0l3.897 6.75Z" fill="currentColor" />
                </svg>
            </button>
            <ul
                role="listbox"
                className={`absolute right-0 top-[calc(100%+8px)] z-[100] min-w-[168px] overflow-hidden rounded-[2px] border border-black bg-white shadow-xl transition-all duration-200 ${open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
                    }`}
            >
                {LANGUAGES.map((language) => {
                    const active = language.code === activeCode;
                    return (
                        <li key={language.code} role="option" aria-selected={active}>
                            <button
                                type="button"
                                onClick={() => changeLanguage(language.code)}
                                className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors duration-200 ${active ? "bg-[#E60000] text-white" : "text-black hover:bg-[#F5F5F3]"
                                    }`}
                            >
                                <span>{language.label}</span>
                                <span className="ml-auto text-xs opacity-70">{language.code}</span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export function PromoHeader() {
    const href = useLocaleHref();
    const t = useT();
    const homeHref = href("/");
    const loginHref = href("/ubs");

    return (
        <div className="flex w-full bg-white justify-center">
            <header className="flex w-full bg-white max-w-[1440px] flex-wrap items-center justify-center gap-[20px] px-4 py-[20px] lg:justify-between lg:px-0">
                <a href={homeHref} aria-label="UBS" className="transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E60000]">
                    <img src="/assets/img/logo.svg" className="max-w-[83px] lg:max-w-[127px]" alt="UBS" />
                </a>
                <ul className="hidden items-center gap-[88px] lg:flex">
                    {navItems.map((item) => (
                        <li key={item.key}>
                            <a href={`${homeHref}${item.hash}`} className={navLinkClass}>
                                {t(item.key)}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="flex items-stretch gap-2">
                    <LanguageSwitcher />
                    <a href={loginHref} className={outlineButtonClass}>
                        <span className="text-[9px] font-light leading-[100%] lg:text-[15px]">
                            {t("landing.header.login")}
                        </span>
                    </a>
                    <a href={loginHref} className={headerPrimaryButtonClass}>
                        <span className="text-[9px] font-light leading-[100%] lg:text-[15px]">
                            {t("landing.header.register")}
                        </span>
                    </a>
                </div>
                <ul className="flex items-center gap-[44px] lg:hidden">
                    {navItems.map((item) => (
                        <li key={item.key}>
                            <a href={`${homeHref}${item.hash}`} className={navLinkClass}>
                                {t(item.key)}
                            </a>
                        </li>
                    ))}
                </ul>
            </header>
        </div>

    );
}
