(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const EXIT_DELAY_MS = 260;
  let isLeaving = false;

  const isPlainLeftClick = (event) => {
    return (
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    );
  };

  document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a');
    if (!anchor || !isPlainLeftClick(event) || isLeaving) {
      return;
    }

    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('#') || anchor.hasAttribute('download')) {
      return;
    }

    if (anchor.target && anchor.target !== '_self') {
      return;
    }

    const destination = new URL(anchor.href, window.location.href);
    const current = new URL(window.location.href);

    const isExternal = destination.origin !== current.origin;
    const isSamePath =
      destination.pathname === current.pathname &&
      destination.search === current.search;

    if (isExternal || isSamePath) {
      return;
    }

    event.preventDefault();
    isLeaving = true;
    document.body.classList.add('is-page-leaving');

    window.setTimeout(() => {
      window.location.href = destination.href;
    }, EXIT_DELAY_MS);
  });
})();
