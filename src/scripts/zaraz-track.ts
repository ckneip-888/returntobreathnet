declare global {
  interface Window {
    zaraz?: {
      track?: (eventName: string) => unknown;
    };
  }
}

const ALLOWED = new Set([
  'app_store_click',
  'google_play_click',
  'protocol_view',
  'field_notes_click',
  'about_click',
  'Explore_the_Breathline_click',
  'Set_Your_Standing_Wave_click',
  'Start_the_exercise_click',
]);

function track(name: string | null | undefined) {
  if (!name || !ALLOWED.has(name)) return;
  try {
    window.zaraz?.track?.(name);
  } catch {
    // Zaraz is injected by Cloudflare. Local preview and blockers are silent.
  }
}

document.addEventListener(
  'click',
  (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const el = target.closest('[data-track]');
    if (!(el instanceof HTMLElement)) return;
    track(el.dataset.track);
  },
  { capture: true },
);

function observeProtocolView() {
  const section = document.getElementById('protocol');
  if (!section || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        track('protocol_view');
        observer.disconnect();
        break;
      }
    },
    { threshold: 0.2 },
  );

  observer.observe(section);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', observeProtocolView, { once: true });
} else {
  observeProtocolView();
}
