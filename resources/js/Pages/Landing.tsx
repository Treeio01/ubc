import { useEffect, useState } from "react";
import { useLocaleHref } from "@/Components/LocaleLink";
import { PromoHeader } from "@/Components/landing/PromoHeader";
import { useT } from "@/i18n/useT";

type FaqItem = { id: string; question: string; answer: string };
type BonusItem = {
    id: string;
    image: string;
    icon: "coins" | "gift" | "card" | "chart";
    title: string;
    description: string;
};

const primaryButtonClass =
    "group inline-flex w-max items-center gap-2 rounded-[2px] bg-[#E60000] px-[32px] py-[12px] text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#B80000] hover:shadow-[0_16px_34px_rgba(230,0,0,0.26)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E60000] active:translate-y-0 active:scale-[0.98] lg:gap-4 lg:px-[44px] lg:py-[16px]";
const outlineButtonClass =
    "inline-flex items-center justify-center rounded-[2px] border border-black px-[19px] py-[8px] text-black transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#E60000] hover:bg-[#E60000] hover:text-white hover:shadow-[0_12px_24px_rgba(230,0,0,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E60000] active:translate-y-0 active:scale-[0.98] lg:px-[44px] lg:py-[13px]";

function ArrowIcon() {
    return (
        <svg className="transition-transform duration-300 group-hover:translate-x-1" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M0.279 1.733C-0.093 1.337 -0.093 0.72 0.279 0.324C0.685 -0.108 1.371 -0.108 1.777 0.324L7.616 6.528C6.851 7.342 5.558 7.342 4.793 6.528L0.279 1.733Z" fill="currentColor" />
            <path d="M1.777 12.733C1.371 13.164 0.685 13.164 0.279 12.733C-0.093 12.337 -0.093 11.72 0.279 11.324L4.793 6.528C5.558 5.715 6.851 5.715 7.616 6.528L1.777 12.733Z" fill="currentColor" />
        </svg>
    );
}

function BonusIcon({ type }: { type: BonusItem["icon"] }) {
    if (type === "gift") {
        return (
            <svg className="h-[14px] w-[14px] lg:h-[28px] lg:w-[28px]" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path d="M25.2 7h-1.694c.182-.574.294-1.26.294-2.1A4.906 4.906 0 0 0 18.9 0c-2.268 0-3.78 2.072-4.76 4.326C13.174 2.212 11.578 0 9.1 0a4.906 4.906 0 0 0-4.9 4.9c0 .84.112 1.526.294 2.1H2.8A2.808 2.808 0 0 0 0 9.8v2.8c0 1.54 1.26 2.8 2.8 2.8v9.8c0 1.54 1.26 2.8 2.8 2.8h16.8c1.54 0 2.8-1.26 2.8-2.8v-9.8c1.54 0 2.8-1.26 2.8-2.8V9.8c0-1.54-1.26-2.8-2.8-2.8ZM18.9 2.8A2.1 2.1 0 0 1 21 4.9C21 7 20.118 7 19.6 7h-3.472c.714-2.212 1.75-4.2 2.772-4.2ZM7 4.9A2.1 2.1 0 0 1 9.1 2.8c1.246 0 2.394 2.142 3.08 4.2H8.4C7.882 7 7 7 7 4.9ZM2.8 9.8h9.8v2.8H2.8V9.8Zm2.8 15.4v-9.8h7v9.8h-7Zm16.8 0h-7v-9.8h7v9.8Zm-7-12.6V9.8h9.8v2.8h-9.8Z" fill="white" />
            </svg>
        );
    }

    if (type === "card") {
        return (
            <svg className="h-[14px] w-[14px] lg:h-[28px] lg:w-[28px]" viewBox="0 0 28 20" fill="none" aria-hidden="true">
                <path d="M26.6 0H1.4C.63 0 0 .563 0 1.25v17.5C0 19.438.63 20 1.4 20h25.2c.77 0 1.4-.563 1.4-1.25V1.25C28 .562 27.37 0 26.6 0Zm-1.4 13.75c-2.324 0-4.2 1.675-4.2 3.75H7c0-2.075-1.876-3.75-4.2-3.75v-7.5C5.124 6.25 7 4.575 7 2.5h14c0 2.075 1.876 3.75 4.2 3.75v7.5Z" fill="white" />
                <path d="M14 5c-3.094 0-5.6 2.238-5.6 5s2.506 5 5.6 5 5.6-2.238 5.6-5-2.506-5-5.6-5Zm0 7.5c-1.54 0-2.8-1.125-2.8-2.5s1.26-2.5 2.8-2.5 2.8 1.125 2.8 2.5-1.26 2.5-2.8 2.5Z" fill="white" />
            </svg>
        );
    }

    if (type === "chart") {
        return (
            <svg className="h-[14px] w-[14px] lg:h-[28px] lg:w-[28px]" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.889 0A2.889 2.889 0 0 0 0 2.889v20.222A2.889 2.889 0 0 0 2.889 26h20.222A2.889 2.889 0 0 0 26 23.111V2.889A2.889 2.889 0 0 0 23.111 0H2.89Zm4.333 14.444a1.444 1.444 0 1 0-2.889 0v5.778a1.444 1.444 0 1 0 2.89 0v-5.778ZM13 8.667c.798 0 1.444.646 1.444 1.444v10.111a1.444 1.444 0 1 1-2.888 0V10.111c0-.798.646-1.444 1.444-1.444Zm8.667-2.89a1.444 1.444 0 1 0-2.89 0v14.445a1.444 1.444 0 1 0 2.89 0V5.778Z" fill="white" />
            </svg>
        );
    }

    return (
        <svg className="h-[14px] w-[14px] lg:h-[28px] lg:w-[28px]" viewBox="0 0 28 26" fill="none" aria-hidden="true">
            <path d="M17.552 15.4c0 2.399-3.929 4.343-8.776 4.343C3.929 19.743 0 17.799 0 15.4s3.929-4.344 8.776-4.344c4.847 0 8.776 1.945 8.776 4.344ZM28 4.344c0 2.398-3.929 4.343-8.776 4.343-4.847 0-8.776-1.945-8.776-4.343C10.448 1.944 14.377 0 19.224 0 24.071 0 28 1.945 28 4.344Z" fill="white" />
            <path d="M0 19.931v-2.397c0-.041.062-.06.085-.025.451.672 2.68 3.16 8.605 3.16 5.924 0 8.326-2.488 8.777-3.16.023-.035.085-.016.085.025v2.397c0 .006-.001.012-.004.018-.105.176-2.155 2.892-8.858 2.892-6.704 0-8.581-2.716-8.686-2.892A.035.035 0 0 1 0 19.93Zm27.915-10.32c.023-.034.085-.015.085.026v2.397c0 .006-.001.012-.004.018-.105.176-2.069 2.613-8.772 2.613-.188 0-.372-.003-.553-.008-.151-.793-.433-1.704-.9-2.227.458.04.942.063 1.453.063 5.924 0 8.24-2.21 8.69-2.881Z" fill="white" />
        </svg>
    );
}

function FaqAccordion({ items }: { items: FaqItem[] }) {
    const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

    useEffect(() => {
        setOpenId(items[0]?.id ?? null);
    }, [items]);

    return (
        <div className="flex w-full max-w-[709px] flex-col">
            {items.map((item) => {
                const open = openId === item.id;
                return (
                    <div key={item.id} className="flex w-full flex-col border-b border-[#E60000]">
                        <button
                            type="button"
                            onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
                            aria-expanded={open}
                            aria-controls={`faq-panel-${item.id}`}
                            className="group flex w-full cursor-pointer items-center justify-between py-[10px] text-left transition-colors duration-300 hover:text-[#E60000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E60000] lg:py-[20px]"
                        >
                            <span className="pr-4 text-[12px] font-bold text-black transition-colors duration-300 group-hover:text-[#E60000] lg:text-[20px]">
                                {item.question}
                            </span>
                            <svg
                                width="19"
                                height="12"
                                viewBox="0 0 19 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-[6px] w-[10px] shrink-0 transition-transform duration-300 ease-in-out lg:h-[12px] lg:w-[19px] ${open ? "rotate-180" : ""}`}
                                aria-hidden="true"
                            >
                                <path d="M9.269 0C7.956 1.27 7.956 3.375 9.269 4.645l6.439 6.232c.647.626 1.674.626 2.321 0 .678-.656.678-1.743 0-2.399L9.269 0Z" fill="#E60000" />
                                <path d="M.508 8.478c-.678.656-.678 1.743 0 2.399.647.626 1.674.626 2.321 0l6.44-6.232c1.312-1.27 1.312-3.375 0-4.645L.508 8.478Z" fill="#E60000" />
                            </svg>
                        </button>
                        <div
                            id={`faq-panel-${item.id}`}
                            role="region"
                            className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                            style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                        >
                            <div className="overflow-hidden">
                                <div className={`flex pb-[12px] pt-[10px] transition-opacity duration-300 ease-in-out lg:pb-[24px] lg:pt-[20px] ${open ? "opacity-100" : "opacity-0"}`}>
                                    <span className="text-[10px] font-light leading-[130%] text-[#090909] lg:text-[16px]">
                                        {item.answer}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default function Landing() {
    const t = useT();
    const href = useLocaleHref();
    const loginHref = href("/ubs");
    const infoHref = href("/info");

    const faqItems: FaqItem[] = [
        { id: "cashback", question: t("faq.cashback.q"), answer: t("faq.cashback.a") },
        { id: "bonus", question: t("faq.bonus.q"), answer: t("faq.bonus.a") },
        { id: "participants", question: t("faq.participants.q"), answer: t("faq.participants.a") },
        { id: "winChance", question: t("faq.winChance.q"), answer: t("faq.winChance.a") },
        { id: "howJoin", question: t("faq.howJoin.q"), answer: t("faq.howJoin.a") },
    ];

    const bonuses: BonusItem[] = [
        {
            id: "bonus",
            image: "/assets/img/section-2--image-1.png",
            icon: "coins",
            title: `${t("bonus.bonus75.title1")} ${t("bonus.bonus75.title2")}`,
            description: t("bonus.bonus75.desc"),
        },
        {
            id: "cashback",
            image: "/assets/img/section-2--image-2.png",
            icon: "gift",
            title: `${t("bonus.cashback.title1")} ${t("bonus.cashback.title2")}`,
            description: t("bonus.cashback.desc"),
        },
        {
            id: "fast",
            image: "/assets/img/section-2--image-3.png",
            icon: "card",
            title: `${t("bonus.faster.title1")} ${t("bonus.faster.title2")}`,
            description: t("bonus.faster.desc"),
        },
        {
            id: "win",
            image: "/assets/img/section-2--image-4.png",
            icon: "chart",
            title: t("bonus.win.title1"),
            description: t("bonus.win.desc"),
        },
    ];

    const steps = [1, 2, 3, 4].map((step) => ({
        step,
        label: t(`step.${step}.label`),
        title: t(`step.${step}.title`),
        description: t(`step.${step}.desc`),
    }));

    return (
        <div className="relative flex w-full flex-col items-center overflow-x-hidden font-frutiger">
            <PromoHeader />

            <section className="flex w-full justify-center bg-[url('/assets/img/main--bg-mobile.png')] bg-cover bg-center px-[8px] py-[8px] lg:bg-[url('/assets/img/main--bg.png')] lg:px-0 lg:py-[61px]">
                <div className="flex w-full max-w-[1440px] justify-start">
                    <div className="flex max-w-[288px] flex-col gap-3 bg-[#F5F5F3] p-[24px] pl-[16px] transition-transform duration-300 hover:-translate-y-1 lg:max-w-[1030px] lg:gap-6 lg:p-[64px] lg:pl-[44px]">
                        <div className="flex items-stretch gap-3 lg:items-start lg:gap-6">
                            <div className="flex min-h-full min-w-[3px] max-w-[3px] bg-[#E60000] lg:min-h-[220px] lg:min-w-[6px] lg:max-w-[6px]" />
                            <div className="flex flex-col gap-3 lg:gap-6">
                                <h1 className="text-[24px] font-bold leading-[100%] text-black lg:text-[52px]">
                                    {t("hero.title")}
                                </h1>
                                <span className="max-w-[803px] text-[10px] font-light leading-[130%] text-black lg:text-[20px]">
                                    {t("hero.description")}
                                </span>
                            </div>
                        </div>
                        <a href={loginHref} className={primaryButtonClass}>
                            <span className="text-[12px] font-bold leading-[100%] lg:text-[20px]">
                                {t("hero.cta")}
                            </span>
                            <ArrowIcon />
                        </a>
                        <span className="text-[8px] font-light leading-[130%] text-black lg:text-[16px]">
                            {t("hero.terms")}
                            {" "}
                            <a href={infoHref} className="font-bold text-[#E60000] underline decoration-[#E60000]/40 underline-offset-4 transition-colors duration-300 hover:text-[#B80000]">
                                {t("landing.terms.link")}
                            </a>
                        </span>
                    </div>
                </div>
            </section>

            <section id="benefits" className="flex w-full max-w-[1440px] flex-wrap justify-center gap-[20px] scroll-mt-8 py-[64px] lg:py-[120px]">
                {bonuses.map((bonus) => (
                    <a
                        key={bonus.id}
                        href={loginHref}
                        className="group flex w-full max-w-[175px] flex-col gap-3 rounded-[4px] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#F9F9F7] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E60000] lg:max-w-[344px] lg:gap-6"
                    >
                        <img src={bonus.image} className="transition-transform duration-300 group-hover:scale-[1.025]" alt="" />
                        <div className="flex max-w-[308px] flex-col gap-4 p-1 lg:p-0">
                            <div className="flex w-max rounded-[2px] bg-[#E60000] p-1.5 transition-transform duration-300 group-hover:scale-110 lg:p-3">
                                <BonusIcon type={bonus.icon} />
                            </div>
                            <span className="text-[18px] leading-[100%] text-black transition-colors duration-300 group-hover:text-[#E60000] lg:text-[32px]">
                                {bonus.title}
                            </span>
                            <span className="text-[10px] font-light leading-[130%] text-[#090909] lg:text-[16px]">
                                {bonus.description}
                            </span>
                        </div>
                    </a>
                ))}
            </section>

            <section id="faq" className="flex w-full scroll-mt-8 flex-col justify-center gap-9 bg-cover bg-center py-[47px] lg:flex-row lg:bg-[url('/assets/img/faq--bg.png')]">
                <div className="flex w-full max-w-[1440px] justify-start px-4 lg:px-0">
                    <FaqAccordion items={faqItems} />
                </div>
                <div className="flex lg:hidden">
                    <img src="/assets/img/faq--img-mobile.png" alt="" />
                </div>
            </section>

            <section id="steps" className="relative my-[64px] flex w-full scroll-mt-8 items-center justify-center overflow-hidden bg-[#404040] py-[79px] lg:my-[120px]">
                <svg className="absolute left-1/2 top-1/2 -translate-1/2" width="298" height="328" viewBox="0 0 298 328" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M243.105 94.835 237.402 99.826l6.416 20.678-18.536-9.982-6.416 4.991 20.675 11.409-22.101 17.826-5.703-7.844 7.842-6.417-5.703-7.13-7.843 6.417-6.416-8.557 7.842-6.417-5.703-7.843-39.923 33.513 38.497 30.66 7.129-8.556c4.991 0 8.555 4.278 10.694 8.556l-7.129 8.557 4.277 3.565c9.268-8.556 22.101-14.261 34.933-14.261 27.091 0 47.766 22.105 47.766 49.2 0 8.557-2.139 18.539-7.129 26.383l7.129 5.704c0 4.992-4.99 10.696-9.981 12.122l-7.129-5.704c-9.268 9.269-22.101 14.261-34.933 14.261-27.091 0-47.766-21.392-47.766-48.487 0-8.557 2.852-17.827 6.417-25.67l-4.991-3.565-7.129 9.269c-4.99-.713-9.268-4.278-10.694-9.269l7.129-7.844-32.081-27.095v42.782h10.694c1.426 2.139 2.139 4.279 2.139 6.418 0 2.139-.713 4.991-2.139 7.13h-10.694v4.991c23.526 4.279 43.488 24.244 43.488 48.487 0 24.957-19.249 44.922-43.488 49.2v8.557c-2.139 1.426-4.99 2.139-7.842 2.139s-6.416-.713-8.555-2.139v-8.557c-24.239-3.565-42.775-24.243-42.775-49.2 0-24.243 18.536-44.208 42.775-47.774v-5.704h-11.407c-1.426-2.139-2.138-4.278-2.138-7.13 0-2.853.712-4.992 2.138-7.131h11.407v-42.782l-32.794 27.095 7.129 7.844c-1.426 4.991-5.703 8.556-10.694 9.269l-7.129-9.269-4.277 4.278c4.277 7.843 7.129 16.4 7.129 25.67 0 27.095-21.388 48.487-47.766 48.487-12.832 0-25.665-4.992-34.933-14.261L9.981 262.4C5.703 260.974.713 255.27 0 250.278l7.129-5.704C2.852 236.73 0 227.461 0 218.191c0-27.095 20.675-49.2 47.766-49.2 12.832 0 25.665 5.705 34.933 14.261l4.277-2.852-7.129-8.557c1.426-4.278 5.704-7.843 10.694-8.556l7.129 8.556 38.497-30.66-39.923-33.513-5.703 7.843 7.842 6.417-5.704 7.844-7.842-6.417-5.703 7.13 6.416 4.991-5.703 7.844-21.388-17.826 19.962-11.409-5.703-4.991-18.536 9.982 5.703-19.252-5.703-4.991-7.129 22.104-22.101-17.826 5.704-7.13 7.842 6.417 6.416-7.13-7.842-7.131 5.703-7.13 7.842 5.704 5.704-7.13-17.11-12.835c1.426-5.704 4.991-9.982 10.694-13.548l90.541 74.157V74.157h-9.268v9.269h-9.268v-9.269h-9.268v9.269h-9.268V55.617l21.388 9.27v-7.844l-19.962-8.556 19.962-7.844v-7.13l-21.388 8.557V13.548h9.268v9.982h9.268v-9.982h9.268v9.982h9.268V1.426C143.297.713 146.148 0 149 0s5.703.713 7.842 1.426v121.931l90.541-74.157c4.99 3.565 8.555 7.843 10.694 13.548l-17.11 13.548 5.703 7.13 7.842-5.704 5.703 7.13-7.842 7.13 5.704 7.131 7.842-6.417 5.703 7.13-22.1 17.826-6.417-22.817Z" fill="#4A4A4A" />
                </svg>

                <div className="z-50 flex w-full max-w-[1440px] flex-wrap justify-center gap-3 lg:gap-[20px]">
                    {steps.map((step) => (
                        <div key={step.step} className="group flex w-full max-w-[175px] flex-col items-center gap-[6px] rounded-[4px] transition-transform duration-300 hover:-translate-y-1 lg:max-w-[345px] lg:gap-[20px]">
                            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#E60000] bg-[#4A4A4A] transition-all duration-300 group-hover:bg-[#E60000] lg:h-[68px] lg:w-[68px]">
                                <span className="text-base font-light leading-[100%] text-[#E60000] transition-colors duration-300 group-hover:text-white lg:text-[32px]">
                                    {step.step}
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5 lg:gap-3">
                                <span className="text-[10px] font-light leading-[100%] text-white lg:text-sm">
                                    {step.label}
                                </span>
                                <span className="text-center text-[10px] font-bold leading-[130%] text-white lg:text-base">
                                    {step.title}
                                    <br />
                                    {step.description}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="relative flex w-full items-center justify-center overflow-hidden bg-[#F9F9F7] py-[37px]">
                <div className="flex w-full max-w-[1440px] flex-wrap p-4 lg:gap-[20px] lg:p-0">
                    <div className="flex max-w-[705px] flex-col gap-3 rounded-[4px] bg-white p-[41px] pl-[22px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,0,0,0.08)] lg:gap-6 lg:p-[64px] lg:pl-[44px]">
                        <div className="flex items-stretch gap-3 lg:items-start lg:gap-6">
                            <div className="flex min-h-full min-w-[3px] max-w-[3px] bg-[#E60000] lg:min-h-[220px] lg:min-w-[6px] lg:max-w-[6px]" />
                            <div className="flex flex-col gap-3 lg:gap-6">
                                <h2 className="text-[18px] font-bold leading-[110%] text-black lg:text-[36px]">
                                    {t("landing.promo.title")}
                                </h2>
                                <span className="max-w-[803px] text-[10px] font-light leading-[130%] text-black lg:text-[24px]">
                                    {t("landing.promo.description")}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <a href={infoHref} className={primaryButtonClass.replace("py-[12px]", "py-[8px]").replace("text-[12px]", "text-[10px]")}>
                                <span className="text-[10px] font-bold leading-[100%] lg:text-[20px]">
                                    {t("landing.promo.cta")}
                                </span>
                                <ArrowIcon />
                            </a>
                        </div>
                    </div>
                    <div className="relative flex w-full max-w-[705px] rounded-[4px]">
                        <img src="/assets/img/last--bg.png" className="rounded-[4px]" alt="" />
                        <img src="/assets/img/last--image.png" className="absolute bottom-0 right-0 max-w-[257px] transition-transform duration-500 hover:scale-[1.02] lg:left-0 lg:right-auto lg:max-w-[517px]" alt="" />
                    </div>
                </div>
            </section>

            <section className="flex w-full max-w-[1440px] flex-wrap items-center gap-[20px] p-4 py-[60px] lg:p-0 lg:py-[120px]">
                <a
                    href={loginHref}
                    className="group flex min-h-[220px] w-full max-w-[579px] items-end overflow-hidden rounded-[16px] border border-[#E60000] bg-[url('/assets/img/main--bg-mobile.png')] bg-cover bg-center p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(230,0,0,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E60000] lg:min-h-[340px] lg:bg-[url('/assets/img/main--bg.png')]"
                >
                    <span className="inline-flex items-center gap-3 rounded-[2px] bg-[#E60000] px-6 py-3 text-[12px] font-bold text-white transition-transform duration-300 group-hover:translate-x-1 lg:text-[20px]">
                        {t("hero.cta")}
                        <ArrowIcon />
                    </span>
                </a>
                <div className="flex items-stretch gap-3 lg:gap-6">
                    <div className="flex min-w-[3px] max-w-[3px] bg-[#E60000] lg:min-w-[6px] lg:max-w-[6px]" />
                    <div className="flex flex-col gap-3 lg:gap-6">
                        <h2 className="text-[20px] font-bold leading-[110%] text-black lg:text-[36px]">
                            {t("landing.final.title")}
                        </h2>
                        <span className="max-w-[803px] text-[10px] font-light leading-[130%] text-black lg:text-[24px]">
                            {t("landing.final.description")}
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}
