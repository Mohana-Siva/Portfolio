export default function ConnectFab({ targetId = 'contact' }) {
  const scrollToTarget = () => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const navbar = document.querySelector('.custom-navbar');
    const navbarOffset = navbar ? Math.ceil(navbar.getBoundingClientRect().height || 0) + 10 : 0;
    const y = window.scrollY + target.getBoundingClientRect().top - navbarOffset;

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.history.replaceState(null, '', `#${encodeURIComponent(targetId)}`);
    window.scrollTo({ top: Math.max(0, Math.round(y)), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <button type="button" className="connect-fab" onClick={scrollToTarget} aria-label="Connect">
      Connect
    </button>
  );
}

