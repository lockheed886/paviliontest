import os
import re

directory = "src"

# Replace map
replacements = {
    # Hex Gold -> Emerald
    r'#b8943c': '#059669',  # emerald 600
    r'#c5a54a': '#10b981',  # emerald 500
    r'#d4b87a': '#34d399',  # emerald 400
    r'#8a6e2a': '#047857',  # emerald 700
    r'#e8dcc0': '#a7f3d0',  # emerald 200
    r'#d0a840': '#059669',  # emerald 600
    r'#9a7c34': '#047857',  # emerald 700

    # Hex Backgrounds -> Deep Emerald Charcoal
    r'#0c0a08': '#040906',
    r'#12100c': '#060d0a',
    r'#181410': '#0a140f',
    r'#1e1a14': '#0f1c15',
    r'#14101e': '#060d0a', # fix old purple bg
    r'#0a0910': '#040906',

    # RGBA Gold -> Emerald
    r'255,\s*215,\s*0': '16, 185, 129',     # 10b981
    r'201,\s*168,\s*76': '5, 150, 105',     # 059669
    r'196,\s*162,\s*101': '4, 120, 87',     # 047857
    r'240,\s*208,\s*112': '52, 211, 153',   # 34d399
    r'232,\s*213,\s*168': '110, 231, 183',  # 6ee7b7
    r'212,\s*175,\s*55': '16, 185, 129',    # 10b981
    r'184,\s*148,\s*60': '4, 120, 87',      # 047857

    # Champagne/Ivory text -> Platinum/Silver text
    r'#f5efe3': '#f8fafc',
    r'#f0ebe0': '#f1f5f9',

    # specific string replacements
    'gold-gradient-text': 'platinum-gradient-text',
    'btn-gold': 'btn-emerald',
    'glow-border-gold': 'glow-border-emerald',
    'pulse-gold': 'pulse-emerald',
    'text-glow-gold': 'text-glow-emerald',
    'glass-panel-gold': 'glass-panel-emerald',
    'btn-ghost-gold': 'btn-ghost-emerald',
    'gold-border-gradient': 'emerald-border-gradient',
}

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content
    for old, new in replacements.items():
        # case insensitive replace for hex codes
        if old.startswith('#'):
            new_content = re.sub(old, new, new_content, flags=re.IGNORECASE)
        else:
            new_content = re.sub(old, new, new_content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css')):
            process_file(os.path.join(root, file))

print("Done replacing colors.")
