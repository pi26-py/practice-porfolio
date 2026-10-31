(() => {
    const instances = new Map();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    function mount(root) {
        const track = root.querySelector('.carousel-track');
        const prev = root.querySelector('.carousel-prev');
        const next = root.querySelector('.carousel-next');
        const count = root.querySelector('.carousel-count');
        function update() {
            const cards = Array.from(track.children);
            const max = track.scrollWidth - track.clientWidth;
            const left = track.scrollLeft;
            prev.disabled = left <= 2;
            next.disabled = left >= max - 2;
            prev.hidden = next.hidden = max <= 2;
            const bounds = track.getBoundingClientRect();
            const visible = cards.map((card, index) => ({ index, rect: card.getBoundingClientRect() }))
                .filter(item => item.rect.right > bounds.left + 8 && item.rect.left < bounds.right - 8);
            const label = visible.length ? `${visible[0].index + 1}–${visible[visible.length - 1].index + 1} of ${cards.length} projects` : `${cards.length} projects`;
            if (count.textContent !== label) count.textContent = label;
        }
        function move(direction) {
            const cards = Array.from(track.children);
            const origin = track.getBoundingClientRect().left;
            const positions = cards.map(card => card.getBoundingClientRect().left - origin + track.scrollLeft);
            const current = track.scrollLeft;
            const target = direction > 0 ? positions.find(pos => pos > current + 3)
                : positions.reverse().find(pos => pos < current - 3);
            if (target !== undefined) track.scrollTo({ left: target, behavior: reduced.matches ? 'instant' : 'smooth' });
        }
        const previous = () => move(-1);
        const following = () => move(1);
        function keyboard(event) {
            if (event.target !== track) return;
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
            }
        }
        prev.addEventListener('click', previous);
        next.addEventListener('click', following);
        track.addEventListener('scroll', update, { passive: true });
        track.addEventListener('keydown', keyboard);
        const resize = new ResizeObserver(update);
        resize.observe(track);
        update();
        return () => {
            resize.disconnect();
            prev.removeEventListener('click', previous);
            next.removeEventListener('click', following);
            track.removeEventListener('scroll', update);
            track.removeEventListener('keydown', keyboard);
        };
    }
    function refresh() {
        instances.forEach((dispose, root) => {
            if (!root.isConnected) { dispose(); instances.delete(root); }
        });
        document.querySelectorAll('.project-carousel').forEach(root => {
            if (!instances.has(root)) instances.set(root, mount(root));
        });
    }
    new MutationObserver(refresh).observe(document.body, { childList: true, subtree: true });
    refresh();
})();
