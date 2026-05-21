#!/usr/bin/env python3
"""
SVG to PNG Converter using Playwright
Renders SVG in a browser and takes a screenshot
"""

import os
import sys
import asyncio

async def convert_svg_to_png(svg_path, png_path, size=64, color="#666666"):
    """Convert SVG to PNG using Playwright"""
    from playwright.async_api import async_playwright
    
    # Read SVG content
    with open(svg_path, 'r', encoding='utf-8') as f:
        svg_content = f.read()
    
    # Modify SVG to set color
    if 'fill="' not in svg_content and "fill='" not in svg_content:
        svg_content = svg_content.replace('<path', f'<path fill="{color}"')
    
    # Create HTML page with SVG
    html_content = f'''
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                background: transparent;
            }}
            svg {{
                width: {size}px;
                height: {size}px;
            }}
        </style>
    </head>
    <body>
        {svg_content}
    </body>
    </html>
    '''
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_content(html_content)
        
        # Take screenshot of the SVG element
        svg_element = await page.query_selector('svg')
        if svg_element:
            await svg_element.screenshot(path=png_path, type='png')
            print(f"✓ Converted: {os.path.basename(svg_path)} -> {os.path.basename(png_path)}")
        
        await browser.close()
        return True

def main():
    icons = [
        ("copy.svg", "copy.png", "复制"),
        ("thumbs-up.svg", "thumbs-up.png", "赞"),
        ("rotate-right.svg", "rotate-right.png", "重答"),
        ("volume-high.svg", "volume-high.png", "朗读"),
        ("pen-to-square.svg", "pen-to-square.png", "编辑"),
    ]
    
    base_dir = os.path.dirname(os.path.abspath(__file__))
    size = 64
    color = "#666666"  # Default icon color
    
    print("=" * 50)
    print("SVG to PNG Converter (Playwright Version)")
    print("=" * 50)
    print(f"Output size: {size}x{size} pixels")
    print()
    
    success_count = 0
    
    async def run_conversions():
        nonlocal success_count
        for svg_file, png_file, name in icons:
            svg_path = os.path.join(base_dir, svg_file)
            png_path = os.path.join(base_dir, png_file)
            
            if not os.path.exists(svg_path):
                print(f"✗ Not found: {svg_file}")
                continue
            
            try:
                await convert_svg_to_png(svg_path, png_path, size, color)
                success_count += 1
            except Exception as e:
                print(f"✗ Failed to convert {svg_file}: {e}")
    
    asyncio.run(run_conversions())
    
    print()
    print("=" * 50)
    print(f"Conversion complete: {success_count}/{len(icons)} icons converted")
    print("=" * 50)
    
    return success_count == len(icons)

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
