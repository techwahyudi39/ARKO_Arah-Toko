import fitz  # PyMuPDF
import os

pdf_path = r"C:\Users\Hobbitz\Documents\Laptop\Compro\MAS\katalog_new-MAS.pdf"
output_dir = r"c:\Users\Hobbitz\Documents\Lab\Project_Marketing\public\images\mas_katalog"

os.makedirs(output_dir, exist_ok=True)

try:
    doc = fitz.open(pdf_path)
    img_index = 1
    
    print("=== EXTRACTED TEXT ===")
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        
        # 1. Extract text
        text = page.get_text()
        print(f"--- PAGE {page_num + 1} ---")
        print(text.strip())
        
        # 2. Extract images
        image_list = page.get_images(full=True)
        
        for img in image_list:
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            
            image_filename = os.path.join(output_dir, f"page{page_num + 1}_img{img_index}.{image_ext}")
            with open(image_filename, "wb") as f:
                f.write(image_bytes)
            
            img_index += 1

    print("\n=== EXTRACTED IMAGES DONE ===")

except Exception as e:
    print(f"Error extracting PDF: {e}")
