/**
 * CareActs Blog Page Generator
 * Reads blog_data.js and generates individual HTML files for each post.
 * Run with: node generate_blog.js
 */

const fs = require('fs');
const path = require('path');

// Read blog_data.js as text
const blogDataRaw = fs.readFileSync(path.join(__dirname, 'blog_data.js'), 'utf8');

// Execute the file content to get blogPosts
// We replace 'const blogPosts' with 'global.blogPosts' to make it accessible
let blogPosts;
try {
    const code = blogDataRaw.replace(/const\s+blogPosts\s*=/g, 'global.blogPosts =');
    eval(code);
    blogPosts = global.blogPosts;
} catch (e) {
    console.error('Error parsing blog_data.js:', e.message);
    process.exit(1);
}

if (!blogPosts || !Array.isArray(blogPosts)) {
    console.error('Could not find blogPosts array in blog_data.js');
    process.exit(1);
}

// Create blog directory if it doesn't exist
const blogDir = path.join(__dirname, 'blog');
if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir);
    console.log('Created /blog directory');
}

// HTML template for each blog post
function generateHTML(post) {
    const canonicalUrl = `https://careacts.netlify.app/blog/${post.slug}.html`;
    const imageUrl = post.image && post.image.startsWith('http')
        ? post.image
        : `../${post.image}`;
    const ogImage = post.image && post.image.startsWith('http')
        ? post.image
        : `https://careacts.netlify.app/${post.image}`;
    const keywordsStr = (post.keywords || []).join(', ');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${post.title} | CareActs</title>
  <meta name="description" content="${post.seoDescription || post.excerpt}" />
  <meta name="keywords" content="${keywordsStr}" />
  <meta name="author" content="${post.author || 'CareActs Team'}" />
  <link rel="canonical" href="${canonicalUrl}" />

  <!-- Open Graph / Social -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${post.title}" />
  <meta property="og:description" content="${post.seoDescription || post.excerpt}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:site_name" content="CareActs" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${post.title}" />
  <meta name="twitter:description" content="${post.seoDescription || post.excerpt}" />
  <meta name="twitter:image" content="${ogImage}" />

  <!-- Styles -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .blog-hero-image { object-fit: cover; width: 100%; height: 400px; }
    @media (max-width: 768px) { .blog-hero-image { height: 240px; } }
  </style>
</head>
<body class="bg-slate-50 min-h-screen">

  <!-- Navigation -->
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-slate-100">
    <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
      <a href="../index.html" class="flex items-center gap-2 font-black text-xl text-slate-900 tracking-tighter uppercase">
        <svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 48 48"><path d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"></path></svg>
        CareActs
      </a>
      <nav class="flex items-center gap-6 text-sm font-black text-slate-600">
        <a href="../index.html#blog" class="hover:text-blue-500 transition-colors">Journal</a>
        <a href="../index.html" class="bg-slate-900 text-white px-5 py-2 rounded-xl hover:scale-105 transition-transform">
          Try It
        </a>
      </nav>
    </div>
  </header>

  <!-- Article -->
  <article class="max-w-4xl mx-auto px-6 py-12 pb-20">

    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm text-slate-400 font-bold mb-8">
      <a href="../index.html" class="hover:text-blue-500 transition-colors">Home</a>
      <span>/</span>
      <a href="../index.html#blog" class="hover:text-blue-500 transition-colors">Journal</a>
      <span>/</span>
      <span class="text-slate-600">${post.category}</span>
    </nav>

    <!-- Category Badge -->
    <span class="inline-block bg-blue-50 text-blue-600 font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-6">${post.category}</span>

    <!-- Title -->
    <h1 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight mb-6">${post.title}</h1>

    <!-- Excerpt -->
    <p class="text-xl text-slate-500 font-medium leading-relaxed mb-8">${post.excerpt}</p>

    <!-- Meta Info -->
    <div class="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-400 mb-10 pb-10 border-b-2 border-slate-100">
      <span class="flex items-center gap-2">
        <span class="material-symbols-outlined text-base">calendar_today</span>
        ${post.date}
      </span>
      <span class="flex items-center gap-2">
        <span class="material-symbols-outlined text-base">schedule</span>
        ${post.readTime}
      </span>
      <span class="flex items-center gap-2">
        <span class="material-symbols-outlined text-base">person</span>
        ${post.author}
      </span>
    </div>

    <!-- Hero Image -->
    ${post.image ? `<div class="rounded-[2rem] overflow-hidden mb-12 shadow-lg">
      <img src="${imageUrl}" alt="${post.title}" class="blog-hero-image" loading="lazy" onerror="this.style.display='none'" />
    </div>` : ''}

    <!-- Article Content -->
    <div class="prose max-w-none text-slate-700 text-lg leading-relaxed">
      ${post.content}
    </div>

    <!-- Back to Journal -->
    <div class="mt-16 pt-10 border-t-2 border-slate-100 flex items-center justify-between">
      <a href="../index.html#blog" class="flex items-center gap-2 text-slate-500 font-bold hover:text-blue-500 transition-colors">
        <span class="material-symbols-outlined">arrow_back</span>
        Back to Journal
      </a>
      <a href="../index.html" class="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform flex items-center gap-2">
        <span class="material-symbols-outlined">favorite</span>
        Try CareActs
      </a>
    </div>
  </article>

  <!-- Footer -->
  <footer class="border-t-4 border-slate-900 bg-white py-10 px-6 text-center">
    <div class="flex items-center justify-center gap-2 font-black text-xl text-slate-900 tracking-tighter uppercase mb-3">
      <svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 48 48"><path d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"></path></svg>
      CareActs
    </div>
    <p class="text-slate-400 text-sm font-bold">Made with heart for better human connections.</p>
    <div class="flex justify-center gap-6 mt-6 text-sm font-black text-slate-500">
      <a href="../index.html#privacy" class="hover:text-blue-500 transition-colors">Privacy</a>
      <a href="../index.html#terms" class="hover:text-blue-500 transition-colors">Terms</a>
      <a href="../index.html#contact" class="hover:text-yellow-500 transition-colors">Contact</a>
      <a href="../index.html#disclaimer" class="hover:text-slate-900 transition-colors">Disclaimer</a>
    </div>
  </footer>

</body>
</html>`;
}

// Generate HTML for each post
let count = 0;
blogPosts.forEach(post => {
    if (!post.slug) {
        console.warn('Skipping post with no slug:', post.title);
        return;
    }
    const filename = path.join(blogDir, `${post.slug}.html`);
    const html = generateHTML(post);
    fs.writeFileSync(filename, html, 'utf8');
    console.log(`✅ Generated: blog/${post.slug}.html`);
    count++;
});

console.log(`\n🎉 Done! Generated ${count} blog pages in /blog folder.`);

// Generate updated sitemap entries
console.log('\n📋 Sitemap URLs to add:');
blogPosts.forEach(post => {
    if (post.slug) {
        console.log(`  <url><loc>https://careacts.netlify.app/blog/${post.slug}.html</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
    }
});
