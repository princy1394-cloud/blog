document.addEventListener('DOMContentLoaded', () => {
    // 1. Reading Progress Bar
    const progressBar = document.getElementById('reading-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const progress = (window.scrollY / totalHeight) * 100;
                progressBar.style.width = `${progress}%`;
            }
        });
    }

    // 2. Category Filter & Live Search
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    const cards = document.querySelectorAll('.card');

    function filterPosts() {
        const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
        const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';

        cards.forEach(card => {
            const category = card.dataset.category || '';
            const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
            const excerpt = card.querySelector('.card-excerpt')?.textContent.toLowerCase() || '';

            const matchesCategory = activeFilter === 'all' || category === activeFilter;
            const matchesSearch = title.includes(searchQuery) || excerpt.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterPosts();
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterPosts);
    }

    // 3. Copy Code Snippet
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach((pre) => {
        const button = document.createElement('button');
        button.className = 'copy-code-btn';
        button.textContent = 'Copy';
        pre.appendChild(button);

        button.addEventListener('click', () => {
            const code = pre.querySelector('code')?.innerText || pre.innerText;
            navigator.clipboard.writeText(code).then(() => {
                button.textContent = 'Copied!';
                button.classList.add('copied');
                setTimeout(() => {
                    button.textContent = 'Copy';
                    button.classList.remove('copied');
                }, 2000);
            });
        });
    });

    // 4. Like Button Persistence
    const likeBtn = document.getElementById('like-btn');
    const likeCountSpan = document.getElementById('like-count');
    if (likeBtn && likeCountSpan) {
        const pageId = window.location.pathname.split('/').pop() || 'index';
        const storageKey = `liked_${pageId}`;
        const countKey = `likes_count_${pageId}`;

        let currentLikes = parseInt(localStorage.getItem(countKey)) || parseInt(likeCountSpan.textContent) || 42;
        let isLiked = localStorage.getItem(storageKey) === 'true';

        likeCountSpan.textContent = currentLikes;
        if (isLiked) {
            likeBtn.classList.add('liked');
        }

        likeBtn.addEventListener('click', () => {
            if (!isLiked) {
                currentLikes++;
                isLiked = true;
                likeBtn.classList.add('liked');
            } else {
                currentLikes--;
                isLiked = false;
                likeBtn.classList.remove('liked');
            }

            likeCountSpan.textContent = currentLikes;
            localStorage.setItem(countKey, currentLikes);
            localStorage.setItem(storageKey, isLiked);
        });
    }

    // 5. Interactive Flexbox Playground
    const flexDirSelect = document.getElementById('flex-dir');
    const justifySelect = document.getElementById('justify-content');
    const alignSelect = document.getElementById('align-items');
    const flexDemoBox = document.getElementById('flex-demo-box');

    function updateFlexDemo() {
        if (flexDemoBox && flexDirSelect && justifySelect && alignSelect) {
            flexDemoBox.style.flexDirection = flexDirSelect.value;
            flexDemoBox.style.justifyContent = justifySelect.value;
            flexDemoBox.style.alignItems = alignSelect.value;
        }
    }

    if (flexDemoBox) {
        flexDirSelect?.addEventListener('change', updateFlexDemo);
        justifySelect?.addEventListener('change', updateFlexDemo);
        alignSelect?.addEventListener('change', updateFlexDemo);
        updateFlexDemo();
    }
});
