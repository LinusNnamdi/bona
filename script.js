/**
 * BONAVEE REAL ESTATE SERVICES - SPA Core Application Engine
 * Pure Vanilla JavaScript (ES6+)
 */

"use strict";

// Global Application State Architecture
const AppState = {
    cart: JSON.parse(localStorage.getItem('bonavee_cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('bonavee_wishlist')) || [],
    currency: localStorage.getItem('bonavee_currency') || 'NGN',
    exchangeRate: 1500, // Mock conversion: 1 USD = 1500 NGN
    theme: localStorage.getItem('bonavee_theme') || 'dark',
    activeCoupon: localStorage.getItem('bonavee_coupon') || null,
    discountPercent: 0.10 // 10% discount rate
};

// Business Master Metadata
const BUSINESS_DATA = {
    name: "BONAVEE REAL ESTATE SERVICES",
    owner: "Nnamani Bonaventure chiemelie",
    phone: "08168242474",
    email: "bonaveerealestateservices@gmail.com",
    city: "Awka",
    country: "Nigeria",
    earndeePhone: "08148478414"
};

// Demo Product & Estate Catalog Data (20 Listings)
const PRODUCTS_DATA = [
    {
        id: "property-001",
        name: "Luxury 5-Bedroom Duplex Blueprint & Build",
        category: "Property Development",
        priceNGN: 85000000,
        description: "Contemporary 5-bedroom detached duplex development package complete with architectural plans, structural engineering, and smart home provisions in Awka.",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        reviewsCount: 14,
        featured: true
    },
    {
        id: "property-002",
        name: "Commercial High-Rise Civil Construction",
        category: "Construction",
        priceNGN: 250000000,
        description: "Turnkey reinforced concrete structural execution service for multi-story office spaces and commercial plazas.",
        image: "images/construction.jpg",
        rating: 5.0,
        reviewsCount: 8,
        featured: true
    },
    {
        id: "property-003",
        name: "Full Estate Management Plan (Annual)",
        category: "Property Management",
        priceNGN: 1500000,
        description: "Comprehensive property asset management including tenant screening, facility maintenance, legal lease auditing, and rent collection.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        reviewsCount: 22,
        featured: false
    },
    {
        id: "property-004",
        name: "3D Architectural Blueprint Suite",
        category: "Architectural Services",
        priceNGN: 1200000,
        description: "Complete architectural plan set featuring floor plans, structural calculations, MEP schematics, and 4K photorealistic 3D interior/exterior renders.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        reviewsCount: 31,
        featured: true
    },
    {
        id: "property-005",
        name: "Penthouse Modern Interior Decoration",
        category: "Interior Works",
        priceNGN: 18000000,
        description: "Bespoke interior execution including acoustic ceiling plastering, mood lighting design, marble flooring, and custom woodwork cabinetry.",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        reviewsCount: 19,
        featured: false
    },
    {
        id: "property-006",
        name: "Perimeter Fencing & Gatehouse Engineering",
        category: "Exterior Works",
        priceNGN: 4500000,
        description: "Heavy-duty perimeter retaining block walls, security wire installation, and automated motorized gatehouse installation.",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
        rating: 4.6,
        reviewsCount: 11,
        featured: false
    },
    {
        id: "property-007",
        name: "4-Bedroom Terrace Housing Development",
        category: "Property Development",
        priceNGN: 62000000,
        description: "Gated estate housing units with modern sewage systems, paved access roads, and solar street lighting solutions.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        reviewsCount: 27,
        featured: true
    },
    {
        id: "property-008",
        name: "Residential Roof Truss & Covering Works",
        category: "Construction",
        priceNGN: 6800000,
        description: "High-grade aluminium roofing sheet framework, steel truss engineering, and leak-proof guttering systems.",
        image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        reviewsCount: 15,
        featured: false
    },
    {
        id: "property-009",
        name: "Luxury Villa Exterior Cladding & Facade",
        category: "Exterior Works",
        priceNGN: 9500000,
        description: "Architectural wall cladding, natural stone finishing, glass curtain installation, and exterior weatherproofing.",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80",
        rating: 5.0,
        reviewsCount: 9,
        featured: true
    },
    {
        id: "property-010",
        name: "Smart Office Space Interior Fit-out",
        category: "Interior Works",
        priceNGN: 14000000,
        description: "Corporate office interior planning with glass partition walls, ergonomic spatial design, integrated network cabling, and climate control layout.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        reviewsCount: 12,
        featured: false
    }
];

// Core Services List (8 Services)
const SERVICES_DATA = [
    { name: "Property Development", icon: "🏗️", desc: "Turnkey residential and commercial development projects from site acquisition to delivery." },
    { name: "Construction Execution", icon: "🚜", desc: "Civil engineering, structural framing, concrete works, and project supervision." },
    { name: "Estate Management", icon: "🔑", desc: "Facility maintenance, tenant oversight, asset valuation, and revenue optimization." },
    { name: "Architectural Services", icon: "📐", desc: "Detailed 2D blueprints, 3D photorealistic renderings, and urban planning compliance." },
    { name: "Interior Decoration", icon: "🛋️", desc: "Luxury interior styling, furniture curation, mood lighting, and plastering." },
    { name: "Exterior Decoration", icon: "🌿", desc: "Facade cladding, hardscaping, outdoor living spaces, and security lighting." },
    { name: "Interior Works", icon: "🔨", desc: "Custom cabinetry, ceiling systems, wall partitions, and tile installations." },
    { name: "Exterior Works", icon: "🧱", desc: "Drainage networks, perimeter security walls, paving stones, and roof trusses." }
];

// Demo Projects / Portfolio Data
const PORTFOLIO_DATA = [
    { title: "Grand Awka Heights Estate", category: "Construction", location: "Awka, Anambra", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80" },
    { title: "The Royal Crest Villa Blueprint", category: "Architecture", location: "Enugu, Nigeria", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" },
    { title: "Minimalist Penthouse Renovation", category: "Interior", location: "Lagos, Nigeria", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80" },
    { title: "Commercial Plaza Stone Facade", category: "Exterior", location: "Port Harcourt, Nigeria", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80" }
];

// Demo Testimonials Data
const TESTIMONIALS_DATA = [
    { name: "Chief Emeka Nwoye", role: "Property Investor", text: "BONAVEE REAL ESTATE SERVICES delivered our residential duplex development in Awka ahead of schedule. Their attention to structural structural framing is world-class." },
    { name: "Dr. Chidera Okonkwo", role: "Diaspora Client (UK)", text: "Managing my construction project from London was stress-free thanks to Bonaventure and his team. Regular video logs and transparent budget tracking." },
    { name: "Engr. Nnamdi", role: "Software Engineer", text: "The interior and exterior decoration work executed on Biggy's House at Mgbakwu completely is Unmatch. I really like you diligency to satisfy your clients." }
];

// Blog Posts Data
const BLOG_DATA = [
    { title: "5 Key Factors Before Building in Eastern Nigeria", date: "August 20, 2026", category: "Construction", excerpt: "Essential land verification and soil test considerations before initiating structural foundation works in Anambra State." },
    { title: "Why Professional Property Management Preserves Equity", date: "August 14, 2026", category: "Estate Management", excerpt: "How proactive maintenance schedules and rigorous lease auditing enhance long-term real estate yield." },
    { title: "Modern Architectural Trends in West African Luxury Homes", date: "August 02, 2026", category: "Architecture", excerpt: "Integrating natural lighting, solar energy efficiency, and modern stone cladding into contemporary tropical designs." }
];

/* ============================================================
   APPLICATION INITIALIZATION & EVENT LISTENERS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRouter();
    initCurrency();
    renderAllViews();
    initNavigation();
    initCartDrawer();
    initForms();
    initEarnDeeLink();
});

/* ============================================================
   SINGLE-PAGE ROUTER SYSTEM
   ============================================================ */

function initRouter() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute(); // Trigger initial routing check
}

function handleRoute() {
    const hash = window.location.hash || '#home';
    const views = document.querySelectorAll('.page-view');
    views.forEach(view => view.classList.remove('active'));

    // Handle dynamic detail route e.g. #product/property-001
    if (hash.startsWith('#product/')) {
        const productId = hash.replace('#product/', '');
        renderProductDetails(productId);
        document.getElementById('view-product-details').classList.add('active');
    } else {
        const targetViewId = `view-${hash.replace('#', '')}`;
        const targetView = document.getElementById(targetViewId);
        if (targetView) {
            targetView.classList.add('active');
        } else {
            document.getElementById('view-home').classList.add('active');
        }
    }

    // Update Navigation Active Links
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================================
   THEME SWITCHER SYSTEM (LocalStorage Persisted)
   ============================================================ */

function initTheme() {
    document.documentElement.setAttribute('data-theme', AppState.theme);
    const themeBtn = document.getElementById('theme-toggle');
    updateThemeIcon();

    themeBtn.addEventListener('click', () => {
        AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', AppState.theme);
        localStorage.setItem('bonavee_theme', AppState.theme);
        updateThemeIcon();
        showToast(`Switched to ${AppState.theme} theme`);
    });
}

function updateThemeIcon() {
    const iconSpan = document.querySelector('.theme-icon');
    if (iconSpan) {
        iconSpan.textContent = AppState.theme === 'dark' ? '🌙' : '☀️';
    }
}

/* ============================================================
   CURRENCY SYSTEM & FORMATTING
   ============================================================ */

function initCurrency() {
    const select = document.getElementById('currency-select');
    select.value = AppState.currency;

    select.addEventListener('change', (e) => {
        AppState.currency = e.target.value;
        localStorage.setItem('bonavee_currency', AppState.currency);
        renderAllViews();
        updateCartDrawerUI();
        showToast(`Currency changed to ${AppState.currency}`);
    });
}

function formatPrice(priceInNGN) {
    if (AppState.currency === 'USD') {
        const converted = (priceInNGN / AppState.exchangeRate).toFixed(0);
        return `$${Number(converted).toLocaleString()}`;
    }
    return `₦${Number(priceInNGN).toLocaleString()}`;
}

/* ============================================================
   RENDER CORE CONTENT & VIEWS
   ============================================================ */

function renderAllViews() {
    renderHomeServices();
    renderHomeFeaturedProducts();
    renderHomeTestimonials();
    renderFullServices();
    renderShopProducts();
    renderPortfolio();
    renderBlog();
    renderWishlist();
    updateBadges();
    initWhatsAppLinks();
}

function renderHomeServices() {
    const container = document.getElementById('home-services-grid');
    if (!container) return;
    container.innerHTML = SERVICES_DATA.slice(0, 4).map(s => `
        <div class="card card-body">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">${s.icon}</div>
            <h3 style="font-size: 1.1rem; margin-bottom: 0.4rem;">${s.name}</h3>
            <p class="text-muted text-sm">${s.desc}</p>
            <a href="#services" class="btn btn-outline btn-sm margin-top-sm">Learn More</a>
        </div>
    `).join('');
}

function renderFullServices() {
    const container = document.getElementById('services-full-grid');
    if (!container) return;
    container.innerHTML = SERVICES_DATA.map(s => `
        <div class="card card-body">
            <div style="font-size: 2.2rem; margin-bottom: 0.8rem;">${s.icon}</div>
            <h3>${s.name}</h3>
            <p class="text-muted text-sm margin-top-xs">${s.desc}</p>
            <div class="margin-top-md flex-between">
                <a href="#contact" class="btn btn-accent btn-sm">Request Quote</a>
                <a href="${generateWhatsAppLink(`Hello ${BUSINESS_DATA.name}, I would like to request a quote for your ${s.name} service.`)}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm">WhatsApp</a>
            </div>
        </div>
    `).join('');
}

function renderHomeFeaturedProducts() {
    const container = document.getElementById('home-featured-products');
    if (!container) return;
    const featured = PRODUCTS_DATA.filter(p => p.featured).slice(0, 3);
    container.innerHTML = featured.map(p => createProductCardHTML(p)).join('');
}

function renderShopProducts() {
    const container = document.getElementById('shop-products-grid');
    if (!container) return;

    const searchInput = document.getElementById('shop-search-input').value.toLowerCase();
    const catFilter = document.getElementById('filter-category').value;
    const sortBy = document.getElementById('sort-by').value;

    let filtered = PRODUCTS_DATA.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchInput) || p.description.toLowerCase().includes(searchInput) || p.category.toLowerCase().includes(searchInput);
        const matchesCat = catFilter === 'all' || p.category === catFilter;
        return matchesSearch && matchesCat;
    });

    if (sortBy === 'price-low') filtered.sort((a,b) => a.priceNGN - b.priceNGN);
    if (sortBy === 'price-high') filtered.sort((a,b) => b.priceNGN - a.priceNGN);
    if (sortBy === 'rating') filtered.sort((a,b) => b.rating - a.rating);

    const emptyState = document.getElementById('shop-empty-state');
    if (filtered.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        container.innerHTML = filtered.map(p => createProductCardHTML(p)).join('');
    }
}

function createProductCardHTML(p) {
    const isWishlist = AppState.wishlist.includes(p.id);
    return `
        <div class="card">
            <div class="product-card-img">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
                ${p.featured ? `<span class="card-badge">Featured</span>` : ''}
            </div>
            <div class="card-body">
                <span class="product-category">${p.category}</span>
                <h3 class="product-title"><a href="#product/${p.id}">${p.name}</a></h3>
                <div class="product-rating">★ ${p.rating} (${p.reviewsCount} reviews)</div>
                <div class="product-price">${formatPrice(p.priceNGN)}</div>
                <div class="card-actions">
                    <button onclick="addToCart('${p.id}')" class="btn btn-accent btn-sm full-width">Add to Cart</button>
                    <button onclick="toggleWishlist('${p.id}')" class="btn btn-outline btn-sm" aria-label="Wishlist">
                        ${isWishlist ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderProductDetails(productId) {
    const container = document.getElementById('product-detail-container');
    const product = PRODUCTS_DATA.find(p => p.id === productId);

    if (!product) {
        container.innerHTML = `<div class="empty-state"><h3>Listing Not Found</h3><a href="#shop" class="btn btn-outline margin-top-sm">Return to Catalog</a></div>`;
        return;
    }

    const isWishlist = AppState.wishlist.includes(product.id);
    const waMsg = encodeURIComponent(`Hello ${BUSINESS_DATA.name},\n\nI am interested in ${product.name}.\nPlease provide more details.`);
    const waUrl = `https://wa.me/234${BUSINESS_DATA.phone.substring(1)}?text=${waMsg}`;

    container.innerHTML = `
        <div class="product-detail-img">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div>
            <span class="sub-heading">${product.category}</span>
            <h1 style="font-size: 2rem; margin-bottom: 0.5rem;">${product.name}</h1>
            <div class="product-rating margin-bottom-sm">★ ${product.rating} | 100% Verified Quality</div>
            <div style="font-size: 2rem; font-weight: 900; color: var(--brand-accent);" class="margin-bottom-sm">${formatPrice(product.priceNGN)}</div>
            <p class="text-muted margin-bottom-md">${product.description}</p>
            
            <div class="card-actions flex-wrap gap-sm">
                <button onclick="addToCart('${product.id}')" class="btn btn-accent btn-lg">Add to Cart</button>
                <button onclick="toggleWishlist('${product.id}')" class="btn btn-outline btn-lg">${isWishlist ? '❤️ Saved in Wishlist' : '🤍 Add to Wishlist'}</button>
                <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-lg">Inquire on WhatsApp</a>
            </div>
        </div>
    `;
}

function renderPortfolio() {
    const container = document.getElementById('portfolio-grid');
    if (!container) return;
    container.innerHTML = PORTFOLIO_DATA.map(item => `
        <div class="card">
            <div class="product-card-img">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="card-body">
                <span class="product-category">${item.category}</span>
                <h3>${item.title}</h3>
                <p class="text-muted text-sm">📍 ${item.location}</p>
            </div>
        </div>
    `).join('');
}

function renderHomeTestimonials() {
    const container = document.getElementById('home-testimonials-container');
    if (!container) return;
    container.innerHTML = TESTIMONIALS_DATA.map(t => `
        <div class="card card-body">
            <div class="product-rating">★★★★★</div>
            <p class="text-muted" style="font-style: italic; margin-bottom: 1rem;">"${t.text}"</p>
            <strong>${t.name}</strong>
            <span class="text-muted text-sm" style="display:block;">${t.role}</span>
        </div>
    `).join('');
}

function renderBlog() {
    const container = document.getElementById('blog-grid');
    if (!container) return;
    container.innerHTML = BLOG_DATA.map(b => `
        <div class="card card-body">
            <span class="sub-heading">${b.category}</span>
            <h3>${b.title}</h3>
            <span class="text-muted text-sm" style="display:block; margin-bottom: 0.5rem;">${b.date}</span>
            <p class="text-muted text-sm">${b.excerpt}</p>
            <a href="#contact" class="btn btn-outline btn-sm margin-top-sm">Read Full Insight</a>
        </div>
    `).join('');
}

function renderWishlist() {
    const container = document.getElementById('wishlist-grid');
    const emptyState = document.getElementById('wishlist-empty');
    if (!container) return;

    const wishlistProducts = PRODUCTS_DATA.filter(p => AppState.wishlist.includes(p.id));

    if (wishlistProducts.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
    } else {
        if (emptyState) emptyState.classList.add('hidden');
        container.innerHTML = wishlistProducts.map(p => createProductCardHTML(p)).join('');
    }
}

/* ============================================================
   CART & WISHLIST ENGINE (LocalStorage Driven)
   ============================================================ */

function addToCart(productId) {
    const existing = AppState.cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        AppState.cart.push({ id: productId, qty: 1 });
    }
    saveCart();
    updateBadges();
    updateCartDrawerUI();
    showToast('Product added to shopping cart');
}

function removeFromCart(productId) {
    AppState.cart = AppState.cart.filter(item => item.id !== productId);
    saveCart();
    updateBadges();
    updateCartDrawerUI();
    renderCheckoutSummary();
    showToast('Item removed from cart');
}

function updateQty(productId, delta) {
    const item = AppState.cart.find(i => i.id === productId);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            removeFromCart(productId);
            return;
        }
        saveCart();
        updateCartDrawerUI();
        renderCheckoutSummary();
    }
}

function saveCart() {
    localStorage.setItem('bonavee_cart', JSON.stringify(AppState.cart));
}

function toggleWishlist(productId) {
    const idx = AppState.wishlist.indexOf(productId);
    if (idx > -1) {
        AppState.wishlist.splice(idx, 1);
        showToast('Removed from Wishlist');
    } else {
        AppState.wishlist.push(productId);
        showToast('Saved to Wishlist');
    }
    localStorage.setItem('bonavee_wishlist', JSON.stringify(AppState.wishlist));
    updateBadges();
    renderWishlist();
    renderShopProducts();
}

function updateBadges() {
    const totalCartQty = AppState.cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cart-count').textContent = totalCartQty;
    document.getElementById('wishlist-count').textContent = AppState.wishlist.length;
}

/* ============================================================
   CART DRAWER & CHECKOUT CALCULATIONS
   ============================================================ */

function initCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    const toggleBtn = document.getElementById('cart-drawer-toggle');
    const closeBtn = document.getElementById('close-cart-drawer');
    const clearBtn = document.getElementById('drawer-clear-btn');

    toggleBtn.addEventListener('click', () => {
        drawer.classList.add('open');
        overlay.classList.add('open');
        updateCartDrawerUI();
    });

    const closeCart = () => {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
    };

    closeBtn.addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);

    clearBtn.addEventListener('click', () => {
        AppState.cart = [];
        saveCart();
        updateBadges();
        updateCartDrawerUI();
        showToast('Cart cleared');
    });
}

function updateCartDrawerUI() {
    const body = document.getElementById('drawer-cart-items');
    if (!body) return;

    if (AppState.cart.length === 0) {
        body.innerHTML = `<div class="empty-state"><p class="text-muted">Your cart is currently empty.</p></div>`;
        document.getElementById('drawer-subtotal').textContent = formatPrice(0);
        document.getElementById('drawer-discount').textContent = formatPrice(0);
        document.getElementById('drawer-total').textContent = formatPrice(0);
        return;
    }

    let subtotalNGN = 0;
    body.innerHTML = AppState.cart.map(cartItem => {
        const product = PRODUCTS_DATA.find(p => p.id === cartItem.id);
        if (!product) return '';
        const itemTotal = product.priceNGN * cartItem.qty;
        subtotalNGN += itemTotal;

        return `
            <div class="drawer-item">
                <img src="${product.image}" class="drawer-item-img" alt="${product.name}">
                <div class="drawer-item-details">
                    <div class="drawer-item-title">${product.name}</div>
                    <div class="drawer-item-price">${formatPrice(product.priceNGN)}</div>
                    <div class="qty-controls">
                        <button onclick="updateQty('${product.id}', -1)" class="qty-btn">-</button>
                        <span>${cartItem.qty}</span>
                        <button onclick="updateQty('${product.id}', 1)" class="qty-btn">+</button>
                        <button onclick="removeFromCart('${product.id}')" class="qty-btn" style="margin-left:auto; color:red;">×</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    const discountNGN = AppState.activeCoupon ? subtotalNGN * AppState.discountPercent : 0;
    const totalNGN = subtotalNGN - discountNGN;

    document.getElementById('drawer-subtotal').textContent = formatPrice(subtotalNGN);
    document.getElementById('drawer-discount').textContent = `-${formatPrice(discountNGN)}`;
    document.getElementById('drawer-total').textContent = formatPrice(totalNGN);
}

/* ============================================================
   CHECKOUT INQUIRY PAGE RENDER
   ============================================================ */

function renderCheckoutSummary() {
    const container = document.getElementById('checkout-items-list');
    if (!container) return;

    let subtotalNGN = 0;
    container.innerHTML = AppState.cart.map(cartItem => {
        const p = PRODUCTS_DATA.find(prod => prod.id === cartItem.id);
        if (!p) return '';
        const lineTotal = p.priceNGN * cartItem.qty;
        subtotalNGN += lineTotal;
        return `
            <div class="flex-between text-sm margin-bottom-sm">
                <span>${p.name} (x${cartItem.qty})</span>
                <strong>${formatPrice(lineTotal)}</strong>
            </div>
        `;
    }).join('');

    const discountNGN = AppState.activeCoupon ? subtotalNGN * AppState.discountPercent : 0;
    const totalNGN = subtotalNGN - discountNGN;

    document.getElementById('chk-subtotal').textContent = formatPrice(subtotalNGN);
    document.getElementById('chk-discount').textContent = `-${formatPrice(discountNGN)}`;
    document.getElementById('chk-total').textContent = formatPrice(totalNGN);
}

/* ============================================================
   FORMS & SIMULATED CHECKOUT SUBMISSIONS
   ============================================================ */

function initForms() {
    // Search & Filter Listeners
    const searchInput = document.getElementById('shop-search-input');
    const catFilter = document.getElementById('filter-category');
    const sortSelect = document.getElementById('sort-by');
    const resetBtn = document.getElementById('reset-shop-filters');

    if (searchInput) searchInput.addEventListener('input', renderShopProducts);
    if (catFilter) catFilter.addEventListener('change', renderShopProducts);
    if (sortSelect) sortSelect.addEventListener('change', renderShopProducts);
    if (resetBtn) resetBtn.addEventListener('click', () => {
        searchInput.value = '';
        catFilter.value = 'all';
        sortSelect.value = 'featured';
        renderShopProducts();
    });

    // Coupon Code Application
    const applyCouponBtn = document.getElementById('chk-apply-coupon');
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', () => {
            const input = document.getElementById('chk-coupon-input').value.trim();
            if (input.toUpperCase() === 'BONAVEE10') {
                AppState.activeCoupon = 'BONAVEE10';
                localStorage.setItem('bonavee_coupon', 'BONAVEE10');
                renderCheckoutSummary();
                updateCartDrawerUI();
                showToast('10% Coupon Applied Successfully!');
            } else {
                showToast('Invalid Coupon Code');
            }
        });
    }

    // Checkout Order Form Submission -> Direct WhatsApp Redirect
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('chk-name').value;
            const phone = document.getElementById('chk-phone').value;
            const address = document.getElementById('chk-address').value;

            let msg = `Hello ${BUSINESS_DATA.name},\n\nI wish to submit an order request:\nClient: ${name}\nPhone: ${phone}\nAddress: ${address}\n\nSelected Items:\n`;
            AppState.cart.forEach(item => {
                const p = PRODUCTS_DATA.find(prod => prod.id === item.id);
                if (p) msg += `- ${p.name} (Qty: ${item.qty})\n`;
            });

            const waUrl = generateWhatsAppLink(msg);
            AppState.cart = [];
            saveCart();
            updateBadges();
            showToast('Order Request Created. Redirecting to WhatsApp...');
            setTimeout(() => { window.location.href = waUrl; }, 1500);
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('cnt-name').value;
            const service = document.getElementById('cnt-service').value;
            const message = document.getElementById('cnt-message').value;

            const msg = `Hello ${BUSINESS_DATA.name},\n\nName: ${name}\nService Needed: ${service}\nMessage: ${message}`;
            showToast('Thank you! Redirecting your message to WhatsApp...');
            setTimeout(() => { window.location.href = generateWhatsAppLink(msg); }, 1500);
        });
    }

    // Booking Form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('bk-name').value;
            const service = document.getElementById('bk-service').value;
            const date = document.getElementById('bk-date').value;
            const time = document.getElementById('bk-time').value;

            const msg = `Hello ${BUSINESS_DATA.name},\n\nI wish to schedule a consultation booking:\nClient: ${name}\nService: ${service}\nPreferred Date: ${date} at ${time}`;
            showToast('Consultation request generated. Redirecting to WhatsApp...');
            setTimeout(() => { window.location.href = generateWhatsAppLink(msg); }, 1500);
        });
    }
}

/* ============================================================
   WHATSAPP INTEGRATION & FOOTER ATTRIBUTION CREDIT
   ============================================================ */

function generateWhatsAppLink(textMessage) {
    const encoded = encodeURIComponent(textMessage);
    return `https://wa.me/234${BUSINESS_DATA.phone.substring(1)}?text=${encoded}`;
}

function initWhatsAppLinks() {
    const heroBtn = document.getElementById('hero-whatsapp-btn');
    if (heroBtn) {
        heroBtn.href = generateWhatsAppLink(`Hello ${BUSINESS_DATA.name}, I would like to inquire about your property development and construction services.`);
    }

    const contactDirect = document.getElementById('contact-wa-direct');
    if (contactDirect) {
        contactDirect.href = generateWhatsAppLink(`Hello ${BUSINESS_DATA.name}, I want to speak directly with your engineering team.`);
    }
}

function initEarnDeeLink() {
    const earndeeBtn = document.getElementById('earndee-link');
    if (earndeeBtn) {
        const msg = encodeURIComponent("Hello! EarnDee\n\nI want to create a website.");
        earndeeBtn.href = `https://wa.me/234${BUSINESS_DATA.earndeePhone.substring(1)}?text=${msg}`;
    }
}

/* ============================================================
   NAVIGATION & UTILITY UI
   ============================================================ */

function initNavigation() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    mobileToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
        });
    });
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3500);
}