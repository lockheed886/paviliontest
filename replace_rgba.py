import os
import re

directory = "src"

replacements = {
    # Replace Platinum RGBA spaced
    r"203,\s*213,\s*225": "52, 211, 153",
    r"203,213,225": "52,211,153",
    
    # Replace lighter platinum
    r"226,\s*232,\s*240": "16, 185, 129",
    r"226,232,240": "16,185,129",
    
    # Replace lightest platinum
    r"241,\s*245,\s*249": "5, 150, 105",
    r"241,245,249": "5,150,105",
}

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith((".tsx", ".ts", ".css")):
            filepath = os.path.join(root, file)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()

            new_content = content
            for pattern, replacement in replacements.items():
                new_content = re.sub(pattern, replacement, new_content)

            if new_content != content:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated RGBA: {filepath}")

print("RGBA glowing shadows replaced for Neon Emerald theme.")
