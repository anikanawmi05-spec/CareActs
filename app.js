const relationshipGroups = [
    {
        title: "IMMEDIATE FAMILY",
        items: ["Father", "Mother", "Brother", "Sister", "Son", "Daughter"]
    },
    {
        title: "EXTENDED FAMILY",
        items: ["Grandfather", "Grandmother", "Aunt/Uncle", "Cousin"]
    },
    {
        title: "PARTNERS",
        items: ["Boyfriend", "Girlfriend", "Husband", "Wife", "Fiancé", "Fiancée"]
    },
    {
        title: "FRIENDS",
        items: ["Close friend/Best Friend", "Work friend/Colleague", "School / College friend", "Childhood friend"]
    },
    {
        title: "PROFESSIONAL",
        items: ["Boss / Manager", "Coworker / Team member", "Mentor / Teacher / Professor", "Employee / Subordinate"]
    },
    {
        title: "OTHER",
        items: ["Neighbor / Community friend", "Ex", "Pet", "Yourself"]
    }
];

let selectedRelation = "Mother";
let selectedVibe = "Bonding";
let currentRotation = 0;

// Elements
const viewHome = document.getElementById('view-home');
const viewResult = document.getElementById('view-result');
const relationContainer = document.getElementById('relation-container');
const vibeBtns = document.querySelectorAll('.vibe-btn');
const effortRange = document.getElementById('effort-range');
const spinButton = document.getElementById('spin-button');
const wheel = document.getElementById('wheel');

// Helper: View Switcher
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => {
        v.classList.remove('active');
        v.style.display = 'none';
    });
    const activeView = document.getElementById(viewId);
    activeView.style.display = 'block';

    // Aggressive scroll reset
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    setTimeout(() => activeView.classList.add('active'), 10);
}

// Init Relations
function initRelations() {
    let html = '<div class="space-y-8">';
    relationshipGroups.forEach((group, idx) => {
        const colors = ['blue', 'pink', 'yellow'];
        const color = colors[idx % 3];

        html += `
            <div>
                <h3 class="text-[10px] font-black uppercase text-${color}-500 mb-4 tracking-widest">${group.title}</h3>
                <div class="grid grid-cols-2 gap-2">
                    ${group.items.map(item => `
                        <button class="relation-btn p-3 text-xs font-bold rounded-xl border-2 transition-all text-left truncate ${item === selectedRelation ? `border-${color}-400 bg-${color}-50 text-slate-900` : `border-slate-100 hover:border-${color}-400 hover:bg-${color}-50 text-slate-600`}" data-relation="${item}">
                            ${item}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    });
    html += '</div>';
    relationContainer.innerHTML = html;

    document.querySelectorAll('.relation-btn').forEach(btn => {
        btn.onclick = () => {
            selectedRelation = btn.dataset.relation;
            initRelations();
        };
    });
}

// Init Vibes
function updateVibesUI() {
    vibeBtns.forEach(btn => {
        if (btn.dataset.vibe === selectedVibe) {
            btn.classList.add('text-pink-500', 'border-pink-400');
            btn.classList.remove('border-slate-100', 'text-slate-900');
        } else {
            btn.classList.remove('text-pink-500', 'border-pink-400');
            btn.classList.add('border-slate-100', 'text-slate-900');
        }
    });
}

vibeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        selectedVibe = btn.dataset.vibe;
        updateVibesUI();
    });
});

// Spin Navigation
spinButton.addEventListener('click', () => {
    if (spinButton.disabled) return;
    spinButton.disabled = true;
    spinButton.innerHTML = '<span class="material-symbols-outlined animate-spin mr-2">refresh</span> Spinning...';

    currentRotation += 1440 + Math.floor(Math.random() * 360);
    wheel.style.transform = `rotate(${currentRotation}deg)`;
});

wheel.addEventListener('transitionend', () => {
    spinButton.disabled = false;
    spinButton.innerHTML = '<span class="material-symbols-outlined">refresh</span> Spin for Ideas';
    populateResult();
    showView('view-result');
});

function populateResult(specificTip = null) {
    const effort = parseInt(effortRange.value);
    let result;
    if (specificTip) {
        result = specificTip;
    } else {
        const matches = tips.filter(t => t.relation === selectedRelation && t.category === selectedVibe && t.effort === effort);
        result = matches.length > 0 ? matches[Math.floor(Math.random() * matches.length)] : tips.find(t => t.relation === selectedRelation) || tips[0];
    }

    const breadcrumb = document.getElementById('breadcrumb-current');
    if (breadcrumb) breadcrumb.textContent = `${result.relation}/${result.category}`;

    // Track current result for Save/Share buttons
    currentResult = result;
    updateSaveBtn();

    const tip = result.tip;
    let title = tip;
    let desc = "";

    // Split by first occurrence of ": ", " – ", " — ", or " - "
    const match = tip.match(/[:–—]| - /);
    if (match) {
        const index = tip.indexOf(match[0]);
        title = tip.substring(0, index).trim();
        desc = tip.substring(index + match[0].length).trim();
    } else if (tip.includes('.')) {
        // Fallback to period if no other delimiter found
        title = tip.split('.')[0];
        desc = tip.split('.').slice(1).join('.').trim();
    }

    document.getElementById('result-title').textContent = title;
    document.getElementById('result-desc').textContent = desc;
    document.getElementById('result-icon').textContent = result.icon || 'star';
    document.getElementById('result-effort-tag').textContent = effort === 1 ? 'Low Effort' : effort === 2 ? 'Medium Effort' : 'Big Adventure';

    // Filter by BOTH relation and category for truly relevant suggestions
    const similar = tips.filter(t =>
        t.relation === selectedRelation &&
        t.category === result.category &&
        t.tip !== result.tip
    ).slice(0, 3);

    const container = document.getElementById('similar-ideas-container');
    container.innerHTML = similar.map((s, idx) => {
        // Get a short preview title (first 8 words)
        const previewMatch = s.tip.match(/[:–—]| - /);
        const previewTitle = previewMatch
            ? s.tip.substring(0, s.tip.indexOf(previewMatch[0])).trim()
            : s.tip.split(' ').slice(0, 7).join(' ') + '...';

        return `
        <div class="similar-card level-card p-6 rounded-3xl border-4 border-white bg-white/80 transition-all group flex flex-col justify-between h-40 cursor-pointer hover:border-pink-300 hover:shadow-xl hover:translate-y-[-4px]" data-idx="${idx}">
            <div>
                <span class="text-blue-500 text-[10px] font-black uppercase tracking-widest">${s.effort === 1 ? 'Low' : 'Med'} Effort</span>
                <h4 class="font-black text-base text-slate-900 mt-2 leading-tight">${previewTitle}</h4>
            </div>
            <div class="flex items-center justify-between mt-4">
                <span class="material-symbols-outlined text-pink-400 text-2xl">${s.icon || 'lightbulb'}</span>
                <span class="material-symbols-outlined text-slate-300 group-hover:text-pink-400 group-hover:translate-x-1 transition-all">arrow_forward_ios</span>
            </div>
        </div>`;
    }).join('');

    // Make similar cards clickable — click shows that tip as the main result
    container.querySelectorAll('.similar-card').forEach(card => {
        card.addEventListener('click', () => {
            const idx = parseInt(card.dataset.idx);
            populateResult(similar[idx]);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Navigation Back
document.addEventListener('click', (e) => {
    if (e.target.closest('.back-to-home')) {
        showView('view-home');
    }
});

// --- Toast Notification ---
function showToast(msg, icon = 'check_circle', iconColor = 'text-yellow-400') {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').textContent = msg;
    const toastIcon = document.getElementById('toast-icon');
    toastIcon.textContent = icon;
    toastIcon.className = `material-symbols-outlined text-xl ${iconColor}`;
    toast.classList.remove('opacity-0', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-4');
        toast.classList.remove('opacity-100', 'translate-y-0');
    }, 2500);
}

// --- LocalStorage: Saved Ideas ---
const SAVED_KEY = 'careacts_saved_ideas';
let currentResult = null; // tracks the tip currently shown on result page

function getSavedIdeas() {
    try { return JSON.parse(localStorage.getItem(SAVED_KEY)) || []; }
    catch { return []; }
}

function isIdeaSaved(tip) {
    return getSavedIdeas().some(s => s.tip === tip);
}

function saveIdea(tipObj) {
    const saved = getSavedIdeas();
    if (!saved.some(s => s.tip === tipObj.tip)) {
        saved.unshift({ ...tipObj, savedAt: Date.now() });
        localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    }
}

function unsaveIdea(tip) {
    const saved = getSavedIdeas().filter(s => s.tip !== tip);
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
}

function updateSaveBtn() {
    if (!currentResult) return;
    const saved = isIdeaSaved(currentResult.tip);
    const icon = document.getElementById('save-btn-icon');
    const label = document.getElementById('save-btn-label');
    const btn = document.getElementById('save-idea-btn');
    if (saved) {
        icon.textContent = 'favorite';
        label.textContent = 'Saved!';
        btn.classList.add('bg-pink-600');
        btn.classList.remove('bg-pink-400');
    } else {
        icon.textContent = 'favorite';
        label.textContent = 'Save Idea';
        btn.classList.remove('bg-pink-600');
        btn.classList.add('bg-pink-400');
    }
}

// Save button
const saveIdeaBtn = document.getElementById('save-idea-btn');
if (saveIdeaBtn) {
    saveIdeaBtn.addEventListener('click', () => {
        if (!currentResult) return;
        if (isIdeaSaved(currentResult.tip)) {
            unsaveIdea(currentResult.tip);
            showToast('Removed from saved ideas', 'heart_broken', 'text-pink-400');
        } else {
            saveIdea(currentResult);
            showToast('Idea saved! ❤️', 'favorite', 'text-pink-400');
        }
        updateSaveBtn();
    });
}

// Share button
const shareBtn = document.getElementById('share-btn');
if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
        if (!currentResult) return;
        const text = `💡 CareActs Idea (${currentResult.relation} / ${currentResult.category}):\n\n${currentResult.tip}\n\nFind more at CareActs!`;
        try {
            if (navigator.share) {
                await navigator.share({ title: 'CareActs Idea', text });
            } else {
                await navigator.clipboard.writeText(text);
                showToast('Copied to clipboard!', 'content_copy', 'text-blue-400');
            }
        } catch (e) {
            // Fallback for browsers that block clipboard
            showToast('Could not copy — try manually!', 'error', 'text-red-400');
        }
    });
}

// My Saved Ideas — global function
function openSavedIdeas() {
    console.log("Opening Saved Ideas view...");
    renderSavedIdeas();
    showView('view-saved');
}
window.openSavedIdeas = openSavedIdeas; // ensure global accessibility

// --- Mobile Menu Logic ---
function toggleMobileMenu(open) {
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;
    if (open) {
        menu.classList.remove('translate-x-full');
        menu.classList.add('translate-x-0');
        document.body.style.overflow = 'hidden'; // prevent scrolling app when menu is open
    } else {
        menu.classList.add('translate-x-full');
        menu.classList.remove('translate-x-0');
        document.body.style.overflow = '';
    }
}
window.toggleMobileMenu = toggleMobileMenu;

document.getElementById('mobile-menu-toggle')?.addEventListener('click', () => toggleMobileMenu(true));
document.getElementById('mobile-menu-close')?.addEventListener('click', () => toggleMobileMenu(false));

function renderSavedIdeas() {
    const saved = getSavedIdeas();
    const grid = document.getElementById('saved-ideas-grid');
    const emptyState = document.getElementById('saved-empty-state');
    const clearRow = document.getElementById('saved-clear-row');

    if (!grid || !emptyState || !clearRow) return; // safety guard

    if (saved.length === 0) {
        grid.innerHTML = '';
        emptyState.classList.remove('hidden');
        emptyState.classList.add('flex');
        clearRow.classList.add('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    emptyState.classList.remove('flex');
    clearRow.classList.remove('hidden');

    grid.innerHTML = saved.map((s, idx) => {
        if (!s || !s.tip) return ''; // Skip invalid entries

        const previewMatch = s.tip.match(/[:–—]| - /);
        const title = previewMatch
            ? s.tip.substring(0, s.tip.indexOf(previewMatch[0])).trim()
            : s.tip.split(' ').slice(0, 8).join(' ') + '...';
        const desc = previewMatch
            ? s.tip.substring(s.tip.indexOf(previewMatch[0]) + previewMatch[0].length).trim()
            : '';
        const effortLabel = s.effort === 1 ? 'Low Effort' : s.effort === 2 ? 'Medium Effort' : 'Big Adventure';
        const relationLabel = s.relation || 'Relation';
        const categoryLabel = s.category || 'Idea';

        return `
        <div class="saved-card level-card p-8 rounded-[2rem] border-4 border-white bg-white/80 flex flex-col gap-4 cursor-pointer hover:border-pink-300 hover:shadow-xl transition-all group" data-idx="${idx}">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="size-10 rounded-xl bg-pink-50 flex items-center justify-center group-hover:bg-pink-100 transition-colors">
                        <span class="material-symbols-outlined text-pink-400 font-variation-fill">${s.icon || 'lightbulb'}</span>
                    </div>
                    <div>
                        <span class="text-[10px] font-black uppercase tracking-widest text-blue-500">${relationLabel} · ${categoryLabel}</span>
                        <p class="text-xs text-slate-400 font-bold">${effortLabel}</p>
                    </div>
                </div>
                <button class="remove-saved-btn text-slate-300 hover:text-red-400 transition-colors p-2" data-idx="${idx}" onclick="event.stopPropagation()">
                    <span class="material-symbols-outlined pointer-events-none">delete</span>
                </button>
            </div>
            <h3 class="font-black text-slate-900 text-lg leading-tight group-hover:text-pink-600 transition-colors">${title}</h3>
            ${desc ? `<p class="text-slate-600 text-sm font-medium leading-relaxed">${desc}</p>` : ''}
            <div class="mt-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <span class="text-pink-400 text-xs font-black uppercase tracking-widest flex items-center gap-1">
                    View Tip <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
            </div>
        </div>`;
    }).join('');

    grid.querySelectorAll('.saved-card').forEach(card => {
        card.addEventListener('click', () => {
            const idx = parseInt(card.dataset.idx);
            const item = saved[idx];
            if (!item) return;

            // Sync app state to this tip
            selectedRelation = item.relation || selectedRelation;
            selectedVibe = item.category || selectedVibe;
            initRelations(); // Update UI
            updateVibesUI();

            populateResult(item);
            showView('view-result');
        });
    });

    grid.querySelectorAll('.remove-saved-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent card click
            const idx = parseInt(btn.dataset.idx);
            unsaveIdea(saved[idx].tip);
            showToast('Removed', 'delete', 'text-red-400');
            renderSavedIdeas();
            updateSaveBtn();
        });
    });

    // Clear all
    const clearAllBtn = document.getElementById('clear-all-btn');
    if (clearAllBtn) {
        clearAllBtn.onclick = () => {
            if (confirm('Remove all saved ideas?')) {
                localStorage.removeItem(SAVED_KEY);
                showToast('All ideas cleared', 'delete_sweep', 'text-red-400');
                renderSavedIdeas();
                updateSaveBtn();
            }
        };
    }
}


// --- Blog & Journal Logic ---
function openBlog() {
    renderBlogPosts();
    showView('view-blog');
    updateMetaTags("The Journal | CareActs", "Scientific insights & heartfelt stories about human connection.");
    window.location.hash = 'blog';
}
function openAbout() {
    showView('view-about');
    updateMetaTags("About Us | CareActs", "Our mission to strengthen relationships through small, scientific, and intentional acts of care.");
    window.location.hash = 'about';
}
window.openAbout = openAbout;

function openPrivacy() {
    console.log("Opening Privacy Policy view...");
    showView('view-privacy');
    updateMetaTags("Privacy Policy | CareActs", "Our commitment to protecting your privacy and maintaining transparency.");
    window.location.hash = 'privacy';
}
window.openPrivacy = openPrivacy;

function openTerms() {
    console.log("Opening Terms and Conditions view...");
    showView('view-terms');
    updateMetaTags("Terms & Conditions | CareActs", "The rules and regulations for using the CareActs website.");
    window.location.hash = 'terms';
}
window.openTerms = openTerms;

function openDisclaimer() {
    console.log("Opening Disclaimer view...");
    showView('view-disclaimer');
    updateMetaTags("Disclaimer | CareActs", "Important legal information and disclaimers for using the CareActs website.");
    window.location.hash = 'disclaimer';
}
window.openDisclaimer = openDisclaimer;

function openContact() {
    console.log("Opening Contact Us view...");
    showView('view-contact');
    updateMetaTags("Contact Us | CareActs", "Get in touch with the CareActs team for feedback, suggestions, or inquiries.");
    window.location.hash = 'contact';
}
window.openContact = openContact;

function renderBlogPosts() {
    const grid = document.getElementById('blog-posts-grid');
    if (!grid) return;

    if (typeof blogPosts === 'undefined' || blogPosts.length === 0) {
        grid.innerHTML = '<p class="text-slate-400 font-bold text-center col-span-full py-20">New stories coming soon...</p>';
        return;
    }

    grid.innerHTML = blogPosts.map((post) => `
        <a href="blog/${post.slug}.html" class="blog-card level-card rounded-[2rem] overflow-hidden flex flex-col h-full bg-white transition-all hover:shadow-xl hover:-translate-y-1">
            <div class="h-60 w-full overflow-hidden">
                <img src="${post.image}" class="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt="${post.title}">
            </div>
            <div class="p-8 flex flex-col flex-1">
                <div class="flex items-center gap-3 mb-4">
                    <span class="bg-blue-50 text-blue-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">${post.category}</span>
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${post.readTime}</span>
                </div>
                <h3 class="text-2xl font-black text-slate-900 leading-tight mb-4">${post.title}</h3>
                <p class="text-slate-500 font-medium text-sm line-clamp-3 mb-6">${post.excerpt}</p>
                <div class="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Read Article</span>
                    <span class="material-symbols-outlined text-slate-300">arrow_forward</span>
                </div>
            </div>
        </a>
    `).join('');
}

function openArticle(slug) {
    const post = blogPosts.find(p => p.slug === slug);
    if (!post) {
        openBlog();
        return;
    }

    // Populate UI
    document.getElementById('article-category').textContent = post.category;
    document.getElementById('article-title').textContent = post.title;
    document.getElementById('article-author').textContent = post.author;
    document.getElementById('article-date').textContent = `${post.date} • ${post.readTime}`;
    document.getElementById('article-header-image').querySelector('img').src = post.image;
    document.getElementById('article-body').innerHTML = post.content;

    showView('view-article');
    updateMetaTags(post.title, post.seoDescription, post.keywords);
    window.location.hash = `blog/${slug}`;
}
window.openArticle = openArticle;

// SEO Helper
function updateMetaTags(title, desc, keywords = []) {
    document.title = title;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', desc);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
        const keywordString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
        metaKeywords.setAttribute('content', keywordString || "relationship tips, activity ideas, bonding, care acts, family connection");
    }
}

// --- Hash-based Routing (for SEO & Persistence) ---
function handleHashRouting() {
    const hash = window.location.hash.substring(1);
    if (!hash) {
        // Only reset to home if we are specifically at / (no hash)
        // and current view is not something we want to persist.
        return;
    }

    if (hash === 'blog') {
        openBlog();
    } else if (hash.startsWith('blog/')) {
        const slug = hash.split('/')[1];
        openArticle(slug);
    } else if (hash === 'saved') {
        openSavedIdeas();
    } else if (hash === 'about') {
        openAbout();
    } else if (hash === 'privacy') {
        openPrivacy();
    } else if (hash === 'terms') {
        openTerms();
    } else if (hash === 'disclaimer') {
        openDisclaimer();
    } else if (hash === 'contact') {
        openContact();
    }
}

// Listen for back/forward buttons
window.addEventListener('hashchange', handleHashRouting);

// Check hash on initial load
window.addEventListener('load', () => {
    setTimeout(handleHashRouting, 500); // Give defer scripts a moment
});


// --- Reset Me: Minimalist Logic ---
let selectedMood = null;

const cardResetMe = document.getElementById('card-reset-me');
if (cardResetMe) {
    cardResetMe.addEventListener('click', () => {
        showView('view-reset-me');
        initMoods();
    });
}

function initMoods() {
    const moodGrid = document.getElementById('mood-grid');
    if (!moodGrid) return;

    moodGrid.innerHTML = moodTips.map((item, idx) => {
        const isSelected = item.mood === selectedMood;
        const delay = (idx * 0.05).toFixed(2);

        return `
            <button class="mood-btn p-8 rounded-[2.5rem] border-4 transition-all font-black text-lg bg-white/60 backdrop-blur-md flex flex-col items-center justify-center gap-4 ${isSelected ? 'border-pink-400 ring-4 ring-pink-100 scale-105 z-10' : 'border-[#F4C430] hover:border-[#FFD700] hover:translate-y-[-4px]'}" 
                data-mood="${item.mood}" 
                style="transition-delay: ${delay}s;">
                <div class="size-14 rounded-2xl flex items-center justify-center transition-all" style="background-color: ${item.color}15; color: ${item.color}">
                    <span class="material-symbols-outlined text-3xl">${item.icon}</span>
                </div>
                <span class="tracking-tight ${isSelected ? 'text-slate-900' : 'text-slate-600'}">${item.mood}</span>
            </button>
        `;
    }).join('');

    document.querySelectorAll('.mood-btn').forEach((btn) => {
        setTimeout(() => btn.classList.add('reveal'), 50);

        btn.onclick = () => {
            selectedMood = btn.dataset.mood;
            const match = moodTips.find(t => t.mood === selectedMood);

            // Re-render UI
            initMoods();

            // Update Instruction
            const instruction = document.getElementById('mood-instruction');
            instruction.textContent = `You're feeling ${selectedMood}. Ready for a reset?`;
            instruction.style.color = "#475569";
        };
    });
}

// Result Spin Logic
const resetSpinBtn = document.getElementById('get-reset-idea-btn');
const resetResultArea = document.getElementById('reset-result-area');

if (resetSpinBtn) {
    resetSpinBtn.addEventListener('click', () => {
        console.log("Reset Idea Clicked. Selected Mood:", selectedMood);

        if (!selectedMood) {
            alert("Please select a mood like 'overwhelmed' or 'lonely' first!");
            return;
        }

        const match = moodTips.find(t => t.mood === selectedMood);
        if (!match) {
            console.error("No tip match found for mood:", selectedMood);
            alert("Sorry, we couldn't find a tip for this mood. Please try another.");
            return;
        }

        // UI Loading State
        resetSpinBtn.disabled = true;
        resetSpinBtn.innerHTML = '<span class="material-symbols-outlined animate-spin mr-2">refresh</span> Thinking...';

        // Hide previous result if any
        resetResultArea.classList.add('hidden', 'opacity-0');

        setTimeout(() => {
            // Populate Content
            const tipText = document.getElementById('reset-tip-text');
            const tipIcon = document.getElementById('reset-icon');

            // Handle multiple tips if present, otherwise fallback to single tip
            let selectedTip = match.tip;
            if (match.tips && Array.isArray(match.tips) && match.tips.length > 0) {
                selectedTip = match.tips[Math.floor(Math.random() * match.tips.length)];
            }

            if (tipText) tipText.textContent = selectedTip;
            if (tipIcon) tipIcon.textContent = match.icon || 'auto_awesome';

            // Show Result
            resetResultArea.classList.remove('hidden');

            // Fade In & Particles
            setTimeout(() => {
                resetResultArea.classList.remove('opacity-0');
                resetResultArea.classList.add('opacity-100');

                try {
                    createParticles(match.color || '#3b82f6');
                } catch (e) {
                    console.error("Particle error:", e);
                }
            }, 50);

            // Reset Button State
            resetSpinBtn.disabled = false;
            resetSpinBtn.innerHTML = '<span class="material-symbols-outlined">restart_alt</span> Get More Ideas';
        }, 600);
    });
}

function createParticles(color) {
    const container = document.getElementById('reset-result-area');
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 8 + 4;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.backgroundColor = color;
        p.style.left = `${centerX}px`;
        p.style.top = `${centerY}px`;

        const dX = (Math.random() - 0.5) * 400;
        const dY = (Math.random() - 0.5) * 400;

        document.body.appendChild(p);

        p.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(calc(-50% + ${dX}px), calc(-50% + ${dY}px)) scale(0)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'cubic-bezier(0, .9, .57, 1)',
            fill: 'forwards'
        });

        setTimeout(() => p.remove(), 1500);
    }
}

initRelations();
updateVibesUI();
window.addEventListener('resize', () => {
    if (document.getElementById('view-reset-me').classList.contains('active')) {
        initMoods();
    }
});

// --- BOND HEALTH METER LOGIC ---

// State
let currentBondRelation = null;
let currentBondQuestions = [];
let currentQuestionIndex = 0;
let bondScore = 0;

// Elements
const viewBondMeter = document.getElementById('view-bond-meter');
const bondStepSelect = document.getElementById('bond-step-select');
const bondStepQuiz = document.getElementById('bond-step-quiz');
const bondStepResult = document.getElementById('bond-step-result');

// 1. Select Relationship
document.querySelectorAll('.bond-relation-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const relation = btn.dataset.relation;
        startBondQuiz(relation);
    });
});

function startBondQuiz(relation) {
    currentBondRelation = relation;
    currentBondQuestions = (typeof bondQuestionsData !== 'undefined' && bondQuestionsData[relation]) ? bondQuestionsData[relation] : [];

    // Safety check if data isn't loaded
    if (currentBondQuestions.length === 0 && typeof bondQuestionsData !== 'undefined') {
        currentBondQuestions = bondQuestionsData["Father"];
    }

    currentQuestionIndex = 0;
    bondScore = 0;

    // UI Switch
    if (bondStepSelect) {
        bondStepSelect.classList.remove('block');
        bondStepSelect.classList.add('hidden');
    }

    if (bondStepQuiz) {
        bondStepQuiz.classList.remove('hidden');
        bondStepQuiz.classList.add('block');
    }

    // Load first question
    loadBondQuestion();
}

function loadBondQuestion() {
    const question = currentBondQuestions[currentQuestionIndex];
    if (!question) {
        finishBondQuiz();
        return;
    }

    // Update Progress
    const total = currentBondQuestions.length;
    const pct = ((currentQuestionIndex) / total) * 100;

    const countEl = document.getElementById('bond-q-current');
    if (countEl) countEl.textContent = currentQuestionIndex + 1;

    const progText = document.getElementById('bond-progress-text');
    if (progText) progText.textContent = `${Math.round(pct)}%`;

    const progBar = document.getElementById('bond-progress-bar');
    if (progBar) progBar.style.width = `${pct}%`;

    // Render Question
    const qText = document.getElementById('bond-question-text');
    if (qText) qText.textContent = question.text;

    const optionsContainer = document.getElementById('bond-options-container');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        question.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = "w-full text-left p-6 rounded-2xl border-4 border-slate-100 bg-white hover:bg-orange-50 hover:border-orange-300 font-bold text-slate-700 transition-all active:scale-95";
            btn.textContent = opt.text;
            btn.onclick = () => handleAnswer(opt.score);
            optionsContainer.appendChild(btn);
        });
    }
}

function handleAnswer(score) {
    bondScore += score;
    currentQuestionIndex++;
    loadBondQuestion();
}

function finishBondQuiz() {
    if (bondStepQuiz) {
        bondStepQuiz.classList.remove('block');
        bondStepQuiz.classList.add('hidden');
    }

    if (bondStepResult) {
        bondStepResult.classList.remove('hidden');
        bondStepResult.classList.add('block');
    }

    // Final Score Calculation
    let finalScore = Math.min(100, Math.round(bondScore));

    // Animate Score
    animateScore(finalScore);

    // Set Message
    const titleEl = document.getElementById('bond-result-title');
    const msgEl = document.getElementById('bond-result-msg');

    if (titleEl && msgEl) {
        if (finalScore >= 80) {
            titleEl.textContent = "Unbreakable Bond! 💎";
            titleEl.className = "text-3xl font-black text-blue-600 mb-4";
            msgEl.textContent = "You have a deep, resilient connection. Keep nurturing it with small acts of kindness!";
        } else if (finalScore >= 50) {
            titleEl.textContent = "Solid Connection 🌱";
            titleEl.className = "text-3xl font-black text-green-600 mb-4";
            msgEl.textContent = "Your bond is healthy but has room to grow. Try asking more open-ended questions next time you talk.";
        } else {
            titleEl.textContent = "Needs Care ❤️‍🩹";
            titleEl.className = "text-3xl font-black text-orange-500 mb-4";
            msgEl.textContent = "It looks like you've drifted apart. Don't worry—small, consistent efforts can rebuild this bridge.";
        }
    }
}

function animateScore(target) {
    const circle = document.getElementById('bond-score-circle');
    const scoreText = document.getElementById('bond-final-score');

    if (!circle || !scoreText) return;

    // Circumference = 2 * pi * 110 ~= 691
    const radius = 110;
    const circumference = 2 * Math.PI * radius;

    const offset = circumference - (target / 100) * circumference;

    // CSS transition handles the circle animation
    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 100);

    // Number counter animation
    let current = 0;
    const duration = 1000;
    const stepTime = target > 0 ? Math.abs(Math.floor(duration / target)) : 10;

    const timer = setInterval(() => {
        if (current < target) {
            current++;
            scoreText.textContent = current;
        } else {
            clearInterval(timer);
        }
    }, stepTime);
}
