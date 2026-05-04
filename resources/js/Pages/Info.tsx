import { PromoHeader } from "@/Components/landing/PromoHeader";
import { useLocaleContext } from "@/i18n/LocaleProvider";

type Locale = "de" | "fr";
type TermsBlock =
    | { kind: "p"; text: string }
    | { kind: "ul"; items: string[] };
type TermsSection = {
    title: string;
    blocks: TermsBlock[];
};

const TERMS: Record<Locale, { home: string; title: string; sections: TermsSection[] }> = {
    de: {
        home: "Home",
        title: "TEILNAHMEBEDINGUNGEN DER UBS AKTION",
        sections: [
            {
                title: "1. Veranstalterin",
                blocks: [
                    { kind: "p", text: "Veranstalterin der Aktion ist die UBS Switzerland AG." },
                ],
            },
            {
                title: "2. Geltungsbereich",
                blocks: [
                    { kind: "p", text: "Die Aktion gilt in der Schweiz." },
                ],
            },
            {
                title: "3. Teilnahmeberechtigung",
                blocks: [
                    { kind: "p", text: "An der Aktion können ausschliesslich bestehende UBS Kundinnen und Kunden teilnehmen, die eine gültige UBS Access Card besitzen und die in diesen Teilnahmebedingungen festgelegten Voraussetzungen erfüllen." },
                    { kind: "p", text: "Die UBS Access Card dient im Rahmen dieser Aktion ausschliesslich der sicheren Identifikation und Autorisierung der teilnehmenden Person." },
                    { kind: "p", text: "UBS behält sich das Recht vor, zusätzliche Teilnahmevoraussetzungen festzulegen, insbesondere hinsichtlich Alter, Wohnsitz, bestehender Kundenbeziehung, gültiger UBS Access Card oder weiterer für die Aktion relevanter Kriterien." },
                ],
            },
            {
                title: "4. Teilnahme an der Aktion",
                blocks: [
                    { kind: "p", text: "Um an der Aktion teilzunehmen, müssen die Teilnehmenden:" },
                    {
                        kind: "ul",
                        items: [
                            "auf die Teilnahme-Schaltfläche auf der Aktionsseite klicken;",
                            "UBS als Bank auswählen, sofern eine Bankauswahl erforderlich ist;",
                            "sich als bestehende UBS Kundin oder bestehender UBS Kunde identifizieren;",
                            "sich mit ihrer gültigen UBS Access Card sicher anmelden bzw. autorisieren;",
                            "allen Anweisungen auf dem Bildschirm folgen;",
                            "alle erforderlichen Angaben vollständig ausfüllen;",
                            "sämtliche Registrierungsschritte vollständig abschliessen;",
                            "alle weiteren Voraussetzungen der Aktion gemäss diesen Teilnahmebedingungen erfüllen.",
                        ],
                    },
                    { kind: "p", text: "Wichtig: Der Registrierungsprozess muss vollständig abgeschlossen werden. Die Seite darf vor Abschluss aller Schritte nicht verlassen oder geschlossen werden, da die Registrierung andernfalls möglicherweise nicht gespeichert wird." },
                    { kind: "p", text: "Nach erfolgreichem Abschluss der Registrierung erscheint auf dem Bildschirm eine Bestätigung, dass die Teilnahme an der Aktion erfolgreich registriert wurde." },
                    { kind: "p", text: "Die Teilnahme an der Aktion ist erst dann erfolgreich abgeschlossen, wenn diese Bestätigung auf dem Bildschirm angezeigt wird." },
                ],
            },
            {
                title: "5. Bonus von CHF 75",
                blocks: [
                    { kind: "p", text: "Teilnehmende erhalten einen Bonus von CHF 75, nachdem alle Teilnahmebedingungen der Aktion vollständig erfüllt wurden." },
                    { kind: "p", text: "Der Bonus:" },
                    {
                        kind: "ul",
                        items: [
                            "wird automatisch gutgeschrieben;",
                            "wird in der Regel innerhalb von 24 bis 48 Stunden nach Bestätigung der vollständigen Erfüllung aller Bedingungen gutgeschrieben;",
                            "wird einmal pro teilnehmende Person gewährt, sofern UBS nichts anderes festlegt.",
                        ],
                    },
                    { kind: "p", text: "UBS behält sich das Recht vor, die Gutschrift des Bonus zu verweigern, falls die Teilnahmebedingungen nicht erfüllt sind, unvollständige oder unrichtige Angaben gemacht wurden oder ein Missbrauch der Aktion festgestellt wird." },
                ],
            },
            {
                title: "6. 3% Cashback",
                blocks: [
                    { kind: "p", text: "Teilnehmende erhalten 3% Cashback auf qualifizierte Zahlungen während 30 Kalendertagen ab erfolgreicher Registrierung oder Aktivierung der Aktion, je nach Ausgestaltung der Aktion." },
                    { kind: "p", text: "Der maximale Cashback-Betrag beträgt CHF 50 pro teilnehmende Person." },
                    { kind: "p", text: "Das Cashback:" },
                    {
                        kind: "ul",
                        items: [
                            "wird automatisch berechnet;",
                            "wird nur auf qualifizierte Transaktionen gewährt;",
                            "wird nicht auf Transaktionen gewährt, die storniert, rückerstattet oder anderweitig von der Aktion ausgeschlossen sind.",
                        ],
                    },
                    { kind: "p", text: "UBS bestimmt, welche Transaktionen für das Cashback qualifizieren und welche ausgeschlossen sind." },
                ],
            },
            {
                title: "7. Teilnahme an der Verlosung des Hauptpreises",
                blocks: [
                    { kind: "p", text: "Nach vollständiger Erfüllung aller Teilnahmebedingungen nehmen die Teilnehmenden automatisch an der Verlosung des Hauptpreises von CHF 20'000 teil." },
                    { kind: "p", text: "Eine zusätzliche Anmeldung für die Verlosung ist nicht erforderlich." },
                    { kind: "p", text: "Die Gewinnerin oder der Gewinner wird nach Abschluss der Aktion nach einem von UBS festgelegten Verfahren ermittelt." },
                    { kind: "p", text: "UBS kontaktiert die Gewinnerin oder den Gewinner über die bei der Registrierung angegebenen Kontaktdaten." },
                    { kind: "p", text: "Erfolgt innerhalb einer angemessenen Frist keine Rückmeldung, behält sich UBS das Recht vor, eine andere Person als Gewinnerin oder Gewinner zu bestimmen." },
                ],
            },
            {
                title: "8. Allgemeine Teilnahmebedingungen",
                blocks: [
                    { kind: "p", text: "Teilnehmende sind verpflichtet, richtige, vollständige und aktuelle Angaben zu machen." },
                    { kind: "p", text: "UBS behält sich das Recht vor, Teilnehmende von der Aktion auszuschliessen oder Bonus, Cashback oder Gewinn nicht zu gewähren, wenn:" },
                    {
                        kind: "ul",
                        items: [
                            "gegen diese Teilnahmebedingungen verstossen wurde;",
                            "unrichtige, irreführende oder unvollständige Angaben gemacht wurden;",
                            "ein Missbrauch, eine Umgehung der Regeln oder ein betrügerisches Verhalten festgestellt wird;",
                            "technische, automatisierte oder sonstige unzulässige Mittel zur Teilnahme verwendet wurden;",
                            "die Teilnahmeberechtigung nicht nachgewiesen werden kann.",
                        ],
                    },
                ],
            },
            {
                title: "9. Änderung oder vorzeitige Beendigung der Aktion",
                blocks: [
                    { kind: "p", text: "UBS behält sich das Recht vor, die Aktion jederzeit ganz oder teilweise zu ändern, auszusetzen oder vorzeitig zu beenden, sofern dies aus technischen, rechtlichen, organisatorischen oder anderen wichtigen Gründen erforderlich ist." },
                    { kind: "p", text: "Die jeweils aktuelle Fassung der Teilnahmebedingungen wird auf der Aktionsseite oder auf eine andere von UBS bestimmte Weise veröffentlicht." },
                ],
            },
            {
                title: "10. Haftungsausschluss",
                blocks: [
                    { kind: "p", text: "UBS haftet nicht für:" },
                    {
                        kind: "ul",
                        items: [
                            "technische Störungen der Website, der Registrierungsstrecke oder von Authentifizierungsprozessen;",
                            "Unterbrechungen, Verzögerungen oder Systemausfälle;",
                            "eine nicht abgeschlossene Registrierung infolge vorzeitigen Verlassens oder Schliessens der Seite;",
                            "eine nicht abgeschlossene Registrierung infolge Nichtbefolgung der Anweisungen auf dem Bildschirm;",
                            "eine fehlende Teilnahmemöglichkeit aus Gründen, die ausserhalb des Einflussbereichs von UBS liegen.",
                        ],
                    },
                ],
            },
            {
                title: "11. Datenschutz",
                blocks: [
                    { kind: "p", text: "Die im Rahmen der Aktion erhobenen personenbezogenen Daten werden ausschliesslich für folgende Zwecke bearbeitet:" },
                    {
                        kind: "ul",
                        items: [
                            "Durchführung und Verwaltung der Aktion;",
                            "Prüfung der Teilnahmeberechtigung;",
                            "sichere Identifikation und Autorisierung der Teilnehmenden;",
                            "Gutschrift von Bonus und Cashback;",
                            "Durchführung der Verlosung;",
                            "Kontaktaufnahme mit Teilnehmenden sowie Gewinnerinnen bzw. Gewinnern.",
                        ],
                    },
                    { kind: "p", text: "Die Bearbeitung personenbezogener Daten erfolgt gemäss den anwendbaren Datenschutzbestimmungen sowie der Datenschutzerklärung von UBS." },
                ],
            },
            {
                title: "12. Anwendbares Recht",
                blocks: [
                    { kind: "p", text: "Auf diese Teilnahmebedingungen ist ausschliesslich schweizerisches Recht anwendbar, soweit keine zwingenden gesetzlichen Bestimmungen etwas anderes vorsehen." },
                ],
            },
            {
                title: "13. Schlussbestimmungen",
                blocks: [
                    { kind: "p", text: "Mit der Teilnahme an der Aktion bestätigen die Teilnehmenden, dass sie diese Teilnahmebedingungen gelesen, verstanden und akzeptiert haben." },
                    { kind: "p", text: "Sollten einzelne Bestimmungen dieser Teilnahmebedingungen unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt." },
                ],
            },
        ],
    },
    fr: {
        home: "Accueil",
        title: "CONDITIONS DE PARTICIPATION À L'ACTION UBS",
        sections: [
            {
                title: "1. Organisatrice",
                blocks: [
                    { kind: "p", text: "L'organisatrice de l'action est UBS Switzerland AG." },
                ],
            },
            {
                title: "2. Champ d'application",
                blocks: [
                    { kind: "p", text: "L'action est valable en Suisse." },
                ],
            },
            {
                title: "3. Droit de participation",
                blocks: [
                    { kind: "p", text: "Seules les clientes et clients existants d'UBS qui possèdent une UBS Access Card valable et qui remplissent les conditions définies dans les présentes conditions de participation peuvent participer à l'action." },
                    { kind: "p", text: "Dans le cadre de cette action, l'UBS Access Card sert exclusivement à l'identification sécurisée et à l'autorisation de la personne participante." },
                    { kind: "p", text: "UBS se réserve le droit de fixer des conditions de participation supplémentaires, notamment en ce qui concerne l'âge, le domicile, la relation client existante, l'UBS Access Card valable ou d'autres critères pertinents pour l'action." },
                ],
            },
            {
                title: "4. Participation à l'action",
                blocks: [
                    { kind: "p", text: "Pour participer à l'action, les participantes et participants doivent:" },
                    {
                        kind: "ul",
                        items: [
                            "cliquer sur le bouton de participation sur la page de l'action;",
                            "sélectionner UBS comme banque, si un choix de banque est nécessaire;",
                            "s'identifier en tant que cliente ou client existant d'UBS;",
                            "se connecter et s'autoriser de manière sécurisée avec leur UBS Access Card valable;",
                            "suivre toutes les instructions affichées à l'écran;",
                            "remplir intégralement toutes les informations requises;",
                            "finaliser complètement toutes les étapes d'inscription;",
                            "remplir toutes les autres conditions de l'action conformément aux présentes conditions de participation.",
                        ],
                    },
                    { kind: "p", text: "Important: le processus d'inscription doit être entièrement finalisé. La page ne doit pas être quittée ou fermée avant la fin de toutes les étapes, faute de quoi l'inscription pourrait ne pas être enregistrée." },
                    { kind: "p", text: "Après la finalisation réussie de l'inscription, une confirmation s'affiche à l'écran indiquant que la participation à l'action a bien été enregistrée." },
                    { kind: "p", text: "La participation à l'action n'est définitivement réussie qu'au moment où cette confirmation s'affiche à l'écran." },
                ],
            },
            {
                title: "5. Bonus de CHF 75",
                blocks: [
                    { kind: "p", text: "Les participantes et participants reçoivent un bonus de CHF 75 une fois que toutes les conditions de participation à l'action ont été entièrement remplies." },
                    { kind: "p", text: "Le bonus:" },
                    {
                        kind: "ul",
                        items: [
                            "est crédité automatiquement;",
                            "est en règle générale crédité dans les 24 à 48 heures suivant la confirmation du respect complet de toutes les conditions;",
                            "est accordé une seule fois par personne participante, sauf indication contraire d'UBS.",
                        ],
                    },
                    { kind: "p", text: "UBS se réserve le droit de refuser le crédit du bonus si les conditions de participation ne sont pas remplies, si des informations incomplètes ou incorrectes ont été fournies ou si un abus de l'action est constaté." },
                ],
            },
            {
                title: "6. Cashback de 3%",
                blocks: [
                    { kind: "p", text: "Les participantes et participants reçoivent 3% de cashback sur les paiements qualifiés effectués pendant 30 jours calendaires à compter de l'inscription réussie ou de l'activation de l'action, selon la configuration de l'action." },
                    { kind: "p", text: "Le montant maximal du cashback est de CHF 50 par personne participante." },
                    { kind: "p", text: "Le cashback:" },
                    {
                        kind: "ul",
                        items: [
                            "est calculé automatiquement;",
                            "n'est accordé que sur les transactions qualifiées;",
                            "n'est pas accordé sur les transactions annulées, remboursées ou exclues d'une autre manière de l'action.",
                        ],
                    },
                    { kind: "p", text: "UBS détermine quelles transactions sont admissibles au cashback et lesquelles en sont exclues." },
                ],
            },
            {
                title: "7. Participation au tirage au sort du prix principal",
                blocks: [
                    { kind: "p", text: "Après avoir rempli toutes les conditions de participation, les participantes et participants participent automatiquement au tirage au sort du prix principal de CHF 20'000." },
                    { kind: "p", text: "Aucune inscription supplémentaire au tirage au sort n'est nécessaire." },
                    { kind: "p", text: "La gagnante ou le gagnant est déterminé après la fin de l'action selon la procédure fixée par UBS." },
                    { kind: "p", text: "UBS contacte la gagnante ou le gagnant via les coordonnées indiquées lors de l'inscription." },
                    { kind: "p", text: "En l'absence de réponse dans un délai raisonnable, UBS se réserve le droit de désigner une autre personne comme gagnante ou gagnant." },
                ],
            },
            {
                title: "8. Conditions générales de participation",
                blocks: [
                    { kind: "p", text: "Les participantes et participants sont tenus de fournir des informations exactes, complètes et actuelles." },
                    { kind: "p", text: "UBS se réserve le droit d'exclure des participantes ou participants de l'action ou de ne pas accorder le bonus, le cashback ou le gain lorsque:" },
                    {
                        kind: "ul",
                        items: [
                            "les présentes conditions de participation ont été violées;",
                            "des informations incorrectes, trompeuses ou incomplètes ont été fournies;",
                            "un abus, un contournement des règles ou un comportement frauduleux est constaté;",
                            "des moyens techniques, automatisés ou autrement non autorisés ont été utilisés pour participer;",
                            "le droit de participation ne peut être démontré.",
                        ],
                    },
                ],
            },
            {
                title: "9. Modification ou fin anticipée de l'action",
                blocks: [
                    { kind: "p", text: "UBS se réserve le droit de modifier, suspendre ou mettre fin à l'action à tout moment, totalement ou partiellement, si cela s'avère nécessaire pour des raisons techniques, juridiques, organisationnelles ou pour d'autres motifs importants." },
                    { kind: "p", text: "La version actuelle des conditions de participation est publiée sur la page de l'action ou par tout autre moyen déterminé par UBS." },
                ],
            },
            {
                title: "10. Exclusion de responsabilité",
                blocks: [
                    { kind: "p", text: "UBS n'est pas responsable de:" },
                    {
                        kind: "ul",
                        items: [
                            "dysfonctionnements techniques du site web, du parcours d'inscription ou des processus d'authentification;",
                            "interruptions, retards ou pannes des systèmes;",
                            "inscription non finalisée en raison d'un départ ou d'une fermeture prématurée de la page;",
                            "inscription non finalisée en raison du non-respect des instructions affichées à l'écran;",
                            "impossibilité de participer pour des raisons échappant à l'influence d'UBS.",
                        ],
                    },
                ],
            },
            {
                title: "11. Protection des données",
                blocks: [
                    { kind: "p", text: "Les données personnelles collectées dans le cadre de l'action sont traitées exclusivement aux fins suivantes:" },
                    {
                        kind: "ul",
                        items: [
                            "réalisation et gestion de l'action;",
                            "vérification du droit de participation;",
                            "identification et autorisation sécurisées des participantes et participants;",
                            "crédit du bonus et du cashback;",
                            "réalisation du tirage au sort;",
                            "prise de contact avec les participantes et participants ainsi qu'avec les gagnantes et gagnants.",
                        ],
                    },
                    { kind: "p", text: "Le traitement des données personnelles s'effectue conformément aux dispositions applicables en matière de protection des données ainsi qu'à la déclaration de protection des données d'UBS." },
                ],
            },
            {
                title: "12. Droit applicable",
                blocks: [
                    { kind: "p", text: "Les présentes conditions de participation sont soumises exclusivement au droit suisse, sous réserve de dispositions légales impératives contraires." },
                ],
            },
            {
                title: "13. Dispositions finales",
                blocks: [
                    { kind: "p", text: "En participant à l'action, les participantes et participants confirment avoir lu, compris et accepté les présentes conditions de participation." },
                    { kind: "p", text: "Si certaines dispositions des présentes conditions de participation devaient être ou devenir invalides, la validité des autres dispositions n'en serait pas affectée." },
                ],
            },
        ],
    },
};

function Bullet({ text }: { text: string }) {
    return (
        <li className="flex items-start gap-2 md:gap-3">
            <div className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#E60000] md:mt-[10px] md:h-[8px] md:w-[8px]" />
            <span className="text-[12px] leading-[18px] text-[#3C3C3C] md:text-[16px] md:leading-[24px]">
                {text}
            </span>
        </li>
    );
}

export default function Info() {
    const { locale } = useLocaleContext();
    const content = TERMS[(locale === "fr" ? "fr" : "de") as Locale];

    return (
        <div className="relative flex w-full flex-col items-center font-frutiger">
            <PromoHeader />
            <main className="flex w-full max-w-[1440px] flex-col gap-[28px] p-4 pt-[16px] md:gap-[48px] md:pt-[52px] 1440:px-0">
                <div className="flex flex-col gap-3 md:gap-6">
                    <div className="flex items-stretch gap-3">
                        <div className="flex w-[6px] bg-[#E60000]"></div>
                        <h1 className="text-base font-bold leading-[120%] text-black md:text-[32px]">
                            {content.title}
                        </h1>
                    </div>
                </div>

                <div className="flex flex-col gap-[24px] md:gap-[40px]">
                    {content.sections.map((section) => (
                        <section key={section.title} className="flex max-w-[1390px] flex-col gap-[10px] md:gap-[16px]">
                            <h2 className="text-[14px] font-bold leading-[120%] text-black md:text-[20px]">
                                {section.title}
                            </h2>
                            <div className="flex flex-col gap-[10px] md:gap-[14px]">
                                {section.blocks.map((block, idx) =>
                                    block.kind === "p" ? (
                                        <p key={idx} className="text-[12px] leading-[18px] text-[#3C3C3C] md:text-[16px] md:leading-[24px]">
                                            {block.text}
                                        </p>
                                    ) : (
                                        <ul key={idx} className="flex flex-col gap-[6px] md:gap-[10px]">
                                            {block.items.map((item) => (
                                                <Bullet key={item} text={item} />
                                            ))}
                                        </ul>
                                    )
                                )}
                            </div>
                        </section>
                    ))}
                </div>
            </main>
        </div>
    );
}
