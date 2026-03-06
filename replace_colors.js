const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('src', function (filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.css')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content
            .replace(/#d4af37/gi, '#cbd5e1')
            .replace(/#f3e5ab/gi, '#f1f5f9')
            .replace(/#e6c27a/gi, '#e2e8f0')
            .replace(/#aa8c2c/gi, '#94a3b8')
            .replace(/rgba\(212,175,55/gi, 'rgba(203,213,225')
            .replace(/rgba\(212, 175, 55/gi, 'rgba(203, 213, 225')
            .replace(/rgba\(243, 229, 171/gi, 'rgba(241, 245, 249')
            .replace(/rgba\(243,229,171/gi, 'rgba(241,245,249')
            .replace(/rgba\(230, 194, 122/gi, 'rgba(226, 232, 240')
            .replace(/rgba\(230,194,122/gi, 'rgba(226,232,240');

        // Replace text wording
        newContent = newContent.replace(/Sapphire & Champagne/gi, 'Sapphire & Platinum');
        newContent = newContent.replace(/Champagne Gold/gi, 'Platinum Silver');

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log('Updated:', filePath);
        }
    }
});
