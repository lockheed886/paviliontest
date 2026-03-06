$content = Get-Content -Path 'src/app/globals.css' -Raw

# Hex replacements
$content = $content -replace '#34d399', '#C49A38'
$content = $content -replace '#10b981', '#A67C2E'
$content = $content -replace '#6ee7b7', '#D4AF5C'
$content = $content -replace '#059669', '#8B6914'
$content = $content -replace '#f1f5f9', '#F5F0E1'
$content = $content -replace '#e2e8f0', '#E8DCC8'

# RGBA replacements
$content = $content -replace '52, 211, 153', '196, 154, 56'
$content = $content -replace '16, 185, 129', '166, 124, 46'
$content = $content -replace '5, 150, 105', '139, 105, 20'

# Green-tinted dark backgrounds to warm dark
$content = $content -replace '#0a140f', '#0f0c06'
$content = $content -replace '#02130a', '#0f0a02'

# Comment/name updates
$content = $content -replace 'Sapphire & Platinum Palette', 'Pavilion Gold & Charcoal Palette'
$content = $content -replace 'champagne tones', 'gold tones'
$content = $content -replace 'Emerald', 'Gold'
$content = $content -replace 'emerald', 'gold'

Set-Content -Path 'src/app/globals.css' -Value $content -NoNewline
Write-Host 'globals.css updated successfully'
