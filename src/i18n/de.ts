import { en } from './en';

/**
 * German chrome is ready. Homepage strings stay English until translation lands.
 * `/de/` remains a stub; swapping this file is enough for a full DE homepage later.
 */
export const de = {
  ...en,
  brand: {
    name: 'Return',
    homeAria: 'Return — Startseite',
  },
  nav: {
    protocol: 'Protokoll',
    fieldNotes: 'Field Notes',
    about: 'Über',
    language: 'Sprache',
    menu: 'Menü',
    close: 'Menü schließen',
  },
  cta: {
    appStore: 'Im App Store laden',
    googlePlay: 'Bei Google Play laden',
    comingSoon: 'Demnächst',
  },
  writing: {
    ...en.writing,
    title: 'Field Notes.',
    pageTitle: 'Field Notes — Return to Breath',
    back: 'Field Notes',
    all: 'Alle Field Notes',
  },
  footer: {
    site: 'Seite',
    elsewhere: 'Anderswo',
    contact: 'Kontakt',
    about: 'Über',
    fieldNotes: 'Field Notes',
    impressum: 'Impressum',
    terms: 'Nutzungsbedingungen',
    privacy: 'Datenschutzerklärung',
    youtube: 'YouTube',
    appStore: 'App Store',
    googlePlay: 'Google Play',
    blurb:
      'Return ist ein stilles Atem-Werkzeug zur Regulation des Nervensystems. Öffnen. Atmen. Schließen.',
    copyright: '© 2026 Christoph Kneip. Alle Texte sind Originalwerk.',
    mark: 'Return · 2026',
  },
} as const;
