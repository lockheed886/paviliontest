"""Extract images from PDH brochure PDFs and save to public/pdh/ folder."""
import fitz  # PyMuPDF
import os
from pathlib import Path

BASE = Path(r"c:\G\assignment work\capstone\web_dev_malay\Pavilion_Damansara")
OUT = BASE / "public" / "pdh"
OUT.mkdir(parents=True, exist_ok=True)

pdfs = [
    BASE / "PDH_Landing_Page" / "Overview of PDH (FYI)" / "PDH Overview (Luxury Residences) Dual Language.pdf",
    BASE / "PDH_Landing_Page" / "Phase 1 (Newly Completed)" / "PDH R1 & R2 1BR e-Brochure 20260116.pdf",
    BASE / "PDH_Landing_Page" / "Phase 2  (New Launch March 2026)" / "(Feb 2026) PDH RC Royal Suites Floor Plan_260213_154718.pdf",
    BASE / "PDH_Landing_Page" / "Phase 2  (New Launch March 2026)" / "Imperial Resi E-brochure (20260211)_260211_202952.pdf",
    BASE / "PDH_Landing_Page" / "Corporate Office 10 (Under Construction)" / "CT10 E-broucher_.pdf",
]

MIN_SIZE = 15000  # Skip tiny icons/logos (< 15KB)
count = 0

for pdf_path in pdfs:
    if not pdf_path.exists():
        print(f"SKIP (not found): {pdf_path.name}")
        continue
    
    prefix = pdf_path.stem[:20].replace(" ", "_").lower()
    doc = fitz.open(str(pdf_path))
    print(f"\n=== {pdf_path.name} ({len(doc)} pages) ===")
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        images = page.get_images(full=True)
        
        for img_idx, img_info in enumerate(images):
            xref = img_info[0]
            try:
                base_image = doc.extract_image(xref)
            except Exception:
                continue
            
            img_bytes = base_image["image"]
            if len(img_bytes) < MIN_SIZE:
                continue
            
            ext = base_image["ext"]
            if ext not in ("jpeg", "jpg", "png"):
                ext = "jpeg"
            
            fname = f"{prefix}_p{page_num+1}_img{img_idx+1}.{ext}"
            out_path = OUT / fname
            with open(out_path, "wb") as f:
                f.write(img_bytes)
            
            count += 1
            w, h = base_image.get("width", 0), base_image.get("height", 0)
            print(f"  [P{page_num+1}] {fname} ({w}x{h}, {len(img_bytes)//1024}KB)")

    doc.close()

# Also render each page as a high-res image for pages that may have vector graphics
print("\n=== Rendering full pages as images ===")
RENDER_DPI = 200
for pdf_path in pdfs:
    if not pdf_path.exists():
        continue
    prefix = pdf_path.stem[:20].replace(" ", "_").lower()
    doc = fitz.open(str(pdf_path))
    for page_num in range(min(len(doc), 25)):  # cap at 25 pages
        page = doc[page_num]
        mat = fitz.Matrix(RENDER_DPI / 72, RENDER_DPI / 72)
        pix = page.get_pixmap(matrix=mat)
        fname = f"{prefix}_fullpage_p{page_num+1}.jpeg"
        out_path = OUT / fname
        pix.save(str(out_path))
        print(f"  {fname} ({pix.width}x{pix.height})")
    doc.close()

print(f"\nDone! Extracted {count} embedded images + full page renders to {OUT}")
