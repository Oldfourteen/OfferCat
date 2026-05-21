#!/usr/bin/env python3
"""
SVG to PNG Converter
Converts FontAwesome SVG icons to PNG format using pure Python libraries
"""

import os
import sys

def convert_svg_to_png(svg_path, png_path, size=64, color="#666666"):
    """Convert SVG file to PNG using svglib and reportlab"""
    try:
        from svglib.svglib import svg2rlg
        from reportlab.graphics import renderPM
        from reportlab.lib.colors import HexColor
        
        drawing = svg2rlg(svg_path)
        if drawing:
            # Scale to desired size
            scale = size / max(drawing.width, drawing.height)
            drawing.width = drawing.width * scale
            drawing.height = drawing.height * scale
            drawing.scale(scale, scale)
            
            # Set background to transparent
            renderPM.drawToFile(drawing, png_path, fmt="PNG", bg=0x00000000)
            print(f"✓ Converted: {os.path.basename(svg_path)} -> {os.path.basename(png_path)}")
            return True
    except ImportError as e:
        print(f"Import error: {e}")
    except Exception as e:
        print(f"Error converting {svg_path}: {e}")
    
    return False

def main():
    # Icon mappings: (svg_filename, png_filename, display_name)
    icons = [
        ("copy.svg", "copy.png", "复制"),
        ("thumbs-up.svg", "thumbs-up.png", "赞"),
        ("rotate-right.svg", "rotate-right.png", "重答"),
        ("volume-high.svg", "volume-high.png", "朗读"),
        ("pen-to-square.svg", "pen-to-square.png", "编辑"),
    ]
    
    base_dir = os.path.dirname(os.path.abspath(__file__))
    size = 64  # Icon size in pixels
    
    print("=" * 50)
    print("SVG to PNG Converter for FontAwesome Icons")
    print("=" * 50)
    print(f"Output size: {size}x{size} pixels")
    print()
    
    success_count = 0
    
    for svg_file, png_file, name in icons:
        svg_path = os.path.join(base_dir, svg_file)
        png_path = os.path.join(base_dir, png_file)
        
        if not os.path.exists(svg_path):
            print(f"✗ Not found: {svg_file}")
            continue
        
        if convert_svg_to_png(svg_path, png_path, size):
            success_count += 1
        else:
            print(f"✗ Failed to convert: {svg_file}")
    
    print()
    print("=" * 50)
    print(f"Conversion complete: {success_count}/{len(icons)} icons converted")
    print("=" * 50)
    
    return success_count == len(icons)

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
