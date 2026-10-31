(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const selector = '.hero > div, .section-heading, .panel, .about-section > div, .contact-section, .project-detail';
    const seen = new WeakSet();
    const reveal = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.remove('reveal-pending');
            if (!motion.matches) entry.target.classList.add('reveal-visible');
            reveal.unobserve(entry.target);
        });
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
    function refresh() {
        document.querySelectorAll(selector).forEach(el => {
            if (seen.has(el)) return;
            seen.add(el);
            if (motion.matches || el.getBoundingClientRect().top < window.innerHeight) return;
            el.classList.add('reveal-pending');
            reveal.observe(el);
        });
    }
    // Blazor can replace routed content without a full browser page load.
    let queued = false;
    new MutationObserver(() => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => { queued = false; refresh(); });
    }).observe(document.body, { childList: true, subtree: true });
    motion.addEventListener('change', () => {
        if (motion.matches) {
            document.querySelectorAll('.reveal-pending').forEach(el => {
                el.classList.remove('reveal-pending'); reveal.unobserve(el);
            });
        }
    });
    refresh();
})();
