export type LanguageCode = "DE" | "FR";

export type Language = {
    code: LanguageCode;
    label: string;
    flag: string;
};

export type Bonus = {
    id: string;
    image: string;
    iconKey: "wallet" | "chart-bars" | "camera" | "hands";
    titleLines: [string] | [string, string];
    description: string;
    maxWidth?: string;
};

export type Step = {
    step: number;
    label: string;
    title: string;
    description: string;
};

export type FaqItem = {
    id: string;
    question: string;
    answer: string;
};

export const LANGUAGES: Language[] = [
    { code: "DE", label: "Deutsch", flag: "🇩🇪" },
    { code: "FR", label: "Français", flag: "🇫🇷" },
];

export const BONUSES: Bonus[] = [
    {
        id: "bonus-75",
        image: "/assets/img/bonuses-block-img-1.png",
        iconKey: "camera",
        titleLines: ["Bonus von", "CHF 1'000"],
        description:
            "Erhalte einen Bonus von CHF 1'000, wenn du die Aktionsbedingungen erfüllst.",
            maxWidth: "md:max-w-[210px] max-w-[150px]",
    },
    {
        id: "cashback-3",
        image: "/assets/img/bonuses-block-img-2.png",
        iconKey: "hands",
        titleLines: ["3%", "Cashback"],
        description:
            "Erhalte 3% Cashback auf deine Zahlungen in den ersten 30 Tagen, bis maximal CHF 50.",
            maxWidth: "md:max-w-[210px] max-w-[150px]",
    },
    {
        id: "faster",
        image: "/assets/img/bonuses-block-img-3.png",
        iconKey: "wallet",
        titleLines: ["Schneller und", "einfacher bezahlen"],
        description:
            "Bezahle in Sekundenschnelle im Geschäft, online und zwischen Freunden.",
            maxWidth: "md:max-w-full max-w-[150px]",
    },
    {
        id: "win-20000",
        image: "/assets/img/bonuses-block-img-4.png",
        iconKey: "chart-bars",
        titleLines: ["Chance auf CHF 20’000"],
        description:
            "Jede qualifizierte Zahlung gibt dir die Chance auf den Hauptgewinn von CHF 20’000.",
        maxWidth: "md:max-w-[250px] max-w-[150px]",
    },
];

export const STEPS: Step[] = [
    {
        step: 1,
        label: "Schritt 1",
        title: "Teilnahme starten",
        description:
            "Öffne die Teilnahme und starte die Registrierung.",
    },
    {
        step: 2,
        label: "Schritt 2",
        title: "Registrierung starten",
        description:
            "Klicke auf die Schaltfläche, die zu deiner Teilnahmemethode passt.",
    },
    {
        step: 3,
        label: "Schritt 3",
        title: "Alle Schritte abschliessen",
        description:
            "Gib deine Daten ein und verlasse die Seite nicht, bevor die Registrierung vollständig abgeschlossen ist.",
    },
    {
        step: 4,
        label: "Schritt 4",
        title: "Teilnahme bestätigt",
        description:
            "Nach erfolgreichem Abschluss bist du für die Aktion registriert.",
    },
];

export const FAQ_ITEMS: FaqItem[] = [
    {
        id: "cashback",
        question: "Wie funktioniert das 3% Cashback?",
        answer:
            "Du erhältst 3% Cashback auf qualifizierte Zahlungen mit UBS Access Card während der ersten 30 Tage nach Aktivierung der Aktion. Der maximale Cashback-Betrag für den gesamten Aktionszeitraum beträgt CHF 50 pro Person. Das Cashback wird automatisch berechnet und nach der Verarbeitung der entsprechenden Transaktionen gutgeschrieben.",
    },
    {
        id: "bonus",
        question: "Wann erhalte ich den Bonus von CHF 1'000?",
        answer:
            "Den Bonus von CHF 1'000 erhältst du, sobald du dich für die Aktion registriert und innerhalb der ersten 30 Tage mindestens drei qualifizierte Zahlungen mit Access Card getätigt hast. Die Gutschrift erfolgt automatisch innerhalb von 14 Tagen nach Erfüllung der Bedingungen direkt auf dein UBS Konto.",
    },
    {
        id: "participants",
        question: "Wer kann an der Aktion teilnehmen?",
        answer:
            "Teilnahmeberechtigt sind alle UBS Kundinnen und Kunden mit einer gültigen Access Card und einem, das mit der UBS verknüpft ist. Mitarbeitende der UBS sowie deren Angehörige sind von der Aktion ausgeschlossen. Pro Person ist nur eine Teilnahme möglich.",
    },
    {
        id: "win-chance",
        question: "Wie erhalte ich die Chance, CHF 20’000 zu gewinnen?",
        answer:
            "Jede qualifizierte Zahlung während des Aktionszeitraums zählt automatisch als ein Los für die Verlosung des Hauptgewinns von CHF 20’000. Je mehr qualifizierte Transaktionen du tätigst, desto höher sind deine Gewinnchancen. Die Gewinnerin oder der Gewinner wird nach Aktionsende ausgelost und direkt benachrichtigt.",
    },
    {
        id: "how-join",
        question: "Wie kann ich teilnehmen?",
        answer:
            "Um an der Aktion teilzunehmen, klicke auf der Aktionsseite auf den Button „Jetzt teilnehmen“ und folge den angezeigten Schritten. Du musst dich identifizieren und die Registrierung vollständig abschliessen. Sobald die Bestätigung erfolgt ist, bist du automatisch für alle Aktionsvorteile registriert.",
    },
];
