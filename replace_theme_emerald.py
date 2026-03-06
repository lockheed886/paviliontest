import os
import re

directory = "src"

replacements = {
    # Backgrounds
    r"bg-\[\#040b16\]": "bg-black",
    r"from-\[\#040b16\]": "from-black",
    r"via-\[\#040b16\]": "via-black",
    r"to-\[\#040b16\]": "to-black",
    
    # Text
    r"text-\[\#040b16\]": "text-black",
    r"text-\[\#cbd5e1\]": "text-[#34d399]",
    r"text-\[\#f1f5f9\]": "text-[#34d399]",
    
    # Background accents
    r"bg-\[\#cbd5e1\]": "bg-[#34d399]",
    r"from-\[\#cbd5e1\]": "from-[#34d399]",
    r"via-\[\#cbd5e1\]": "via-[#34d399]",
    r"to-\[\#cbd5e1\]": "to-[#34d399]",
    
    # Borders
    r"border-\[\#cbd5e1\]": "border-[#34d399]",
    
    # Any other raw hex
    r"#040b16": "#000000",
    r"#cbd5e1": "#34d399",
    r"#94a3b8": "#10b981", # Darker emerald for gradients
    r"#0a1220": "#050505", # Slightly lighter black for depth
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
                print(f"Updated: {filepath}")

print("Theme change to Emerald & Black completed.")
