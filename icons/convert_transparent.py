#!/usr/bin/env python3
"""
SVG to PNG Converter with Transparent Background
使用 Playwright 渲染 SVG 并截图，确保透明背景
"""

import os
import sys
import asyncio

async def convert_svg_to_png(svg_path, png_path, size=64, color="#666666"):
    """Convert SVG to PNG with transparent background using Playwright"""
    from playwright.async_api import async_playwright
    
    # Read SVG content
    with open(svg_path, 'r', encoding='utf-8') as f:
        svg_content = f.read()
    
    # 提取 viewBox
    import re
    viewbox_match = re.search(r'viewBox="([^"]+)"', svg_content)
    viewbox = viewbox_match.group(1) if viewbox_match else f"0 0 {size} {size}"
    
    # 修改 SVG 添加 fill 颜色
    if 'fill="' not in svg_content and "fill='" not in svg_content:
        svg_content = svg_content.replace('<path', f'<path fill="{color}"')
    
    # 创建 HTML 页面，背景透明
    html_content = f'''
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            * {{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }}
            body {{
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                background: transparent !important;
            }}
            #svg-container {{
                width: {size}px;
                height: {size}px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: transparent !important;
            }}
            svg {{
                width: 100%;
                height: 100%;
                display: block;
            }}
        </style>
    </head>
    <body>
        <div id="svg-container">
            {svg_content}
        </div>
    </body>
    </html>
    '''
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        # 设置透明背景
        await page.set_viewport_size({'width': size, 'height': size})
        await page.set_content(html_content)
        
        # 等待 SVG 渲染
        await page.wait_for_selector('svg')
        
        # 获取 SVG 元素并截图
        svg_element = await page.query_selector('#svg-container')
        if svg_element:
            # 截图时设置透明背景
            await svg_element.screenshot(
                path=png_path, 
                type='png',
                omit_background=True  # 关键：透明背景
            )
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
    color = "#666666"  # 默认图标颜色
    
    print("=" * 50)
    print("SVG to PNG Converter (Transparent Background)")
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
