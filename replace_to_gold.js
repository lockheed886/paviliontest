const fs = require('fs');
const path = require('path');

const replacements = [
    // Hex replacements
    ['#34d399', '#C49A38'],
    ['#10b981', '#A67C2E'],
    ['#6ee7b7', '#D4AF5C'],
    ['#059669', '#8B6914'],
    ['#f1f5f9', '#F5F0E1'],
    ['#e2e8f0', '#E8DCC8'],
    // RGBA replacements (spaced)
    ['52, 211, 153', '196, 154, 56'],
    ['16, 185, 129', '166, 124, 46'],
    ['5, 150, 105', '139, 105, 20'],
    // RGBA replacements (no space)
    ['52,211,153', '196,154,56'],
    ['16,185,129', '166,124,46'],
    ['5,150,105', '139,105,20'],
    // ScrollProgress specific
    ['4, 120, 87', '139, 105, 20'],
    // Green-tinted backgrounds
    ['#0a140f', '#0f0c06'],
    ['#02130a', '#0f0a02'],
];

const nameReplacements = [
    ['Sapphire & Platinum Palette', 'Pavilion Gold & Charcoal Palette'],
    ['Primary champagne tones', 'Primary gold tones'],
    ['Emerald', 'Gold'],
    ['emerald', 'gold'],
];

const classReplacements = [
    ['text-stroke-emerald', 'text-stroke-gold'],
    ['text-shadow-emerald-glow', 'text-shadow-gold-glow'],
    ['btn-emerald', 'btn-gold'],
    ['btn-ghost-emerald', 'btn-ghost-gold'],
];

const files = [
    'src/app/globals.css',
    'src/components/sections/UnitLayouts.tsx',
    'src/components/sections/LocationFacts.tsx',
    'src/components/sections/Facilities.tsx',
    'src/components/sections/Concierge.tsx',
    'src/components/sections/Hero.tsx',
    'src/components/sections/Contact.tsx',
    'src/components/layout/Navbar.tsx',
    'src/components/layout/ScrollProgress.tsx',
    'src/app/icon.tsx',
    'src/app/layout.tsx',
    'src/app/page.tsx',
];

for (const file of files) {
    const fullPath = path.resolve(file);
    if (!fs.existsSync(fullPath)) {
        console.log(`Skipped (not found): ${file}`);
        continue;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    const original = content;

    // Apply color replacements
    for (const [from, to] of replacements) {
        content = content.split(from).join(to);
    }

    // Apply class name replacements (only for TSX files)
    if (file.endsWith('.tsx')) {
        for (const [from, to] of classReplacements) {
            content = content.split(from).join(to);
        }
    }

    // Apply name replacements (only for CSS)
    if (file.endsWith('.css')) {
        for (const [from, to] of nameReplacements) {
            content = content.split(from).join(to);
        }
    }

    if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${file}`);
    } else {
        console.log(`No changes: ${file}`);
    }
}

console.log('Done!');
