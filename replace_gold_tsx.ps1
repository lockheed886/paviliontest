# Replace colors in all TSX component files
$files = @(
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
    'src/app/page.tsx'
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content -Path $file -Raw
        
        # Hex replacements
        $content = $content -replace '#34d399', '#C49A38'
        $content = $content -replace '#10b981', '#A67C2E'
        $content = $content -replace '#6ee7b7', '#D4AF5C'
        $content = $content -replace '#059669', '#8B6914'
        $content = $content -replace '#f1f5f9', '#F5F0E1'
        $content = $content -replace '#e2e8f0', '#E8DCC8'
        
        # RGBA replacements
        $content = $content -replace '52, 211, 153', '196, 154, 56'
        $content = $content -replace '52,211,153', '196,154,56'
        $content = $content -replace '16, 185, 129', '166, 124, 46'
        $content = $content -replace '16,185,129', '166,124,46'
        $content = $content -replace '5, 150, 105', '139, 105, 20'
        $content = $content -replace '5,150,105', '139,105,20'
        $content = $content -replace '4, 120, 87', '139, 105, 20'
        
        # CSS class name references (keep the CSS class names matching globals.css)
        $content = $content -replace 'text-stroke-emerald', 'text-stroke-gold'
        $content = $content -replace 'text-shadow-emerald-glow', 'text-shadow-gold-glow'
        $content = $content -replace 'btn-emerald', 'btn-gold'
        $content = $content -replace 'btn-ghost-emerald', 'btn-ghost-gold'
        
        # Green-tinted background
        $content = $content -replace '#02130a', '#0f0a02'
        
        Set-Content -Path $file -Value $content -NoNewline
        Write-Host "Updated: $file"
    } else {
        Write-Host "Skipped (not found): $file"
    }
}
Write-Host 'All component files updated!'
