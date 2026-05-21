#!/usr/bin/env python3
"""
SVG to PNG Converter using Pillow and manual SVG rendering
"""

import os
import sys
import xml.etree.ElementTree as ET
from PIL import Image, ImageDraw
import re

def parse_path_data(path_data):
    """Parse SVG path data and extract commands"""
    # This is a simplified parser for FontAwesome SVG paths
    # Format: M x y L x y C x1 y1 x2 y2 x y Z etc.
    
    commands = []
    # Match commands followed by numbers
    tokens = re.findall(r'([MmLlHhVvCcSsQqTtAaZz])|(-?\d*\.?\d+)', path_data)
    
    current_cmd = None
    current_nums = []
    
    for token in tokens:
        if token[0]:  # It's a command
            if current_cmd and current_nums:
                commands.append((current_cmd, current_nums))
            current_cmd = token[0]
            current_nums = []
        elif token[1]:  # It's a number
            current_nums.append(float(token[1]))
    
    if current_cmd and current_nums:
        commands.append((current_cmd, current_nums))
    
    return commands

def svg_to_png_simple(svg_path, png_path, size=64, color="#666666"):
    """
    Convert simple SVG to PNG using Pillow
    This works for FontAwesome icons which have simple path data
    """
    try:
        # Parse SVG
        tree = ET.parse(svg_path)
        root = tree.getroot()
        
        # Get viewBox
        viewbox = root.get('viewBox', '0 0 512 512').split()
        vb_width = float(viewbox[2]) if len(viewbox) > 2 else 512
        vb_height = float(viewbox[3]) if len(viewbox) > 3 else 512
        
        # Create image with transparent background
        img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        
        # Convert hex color to RGB
        color = color.lstrip('#')
        rgb = tuple(int(color[i:i+2], 16) for i in (0, 2, 4))
        fill_color = rgb + (255,)  # Add alpha
        
        # Calculate scale
        scale_x = size / vb_width
        scale_y = size / vb_height
        scale = min(scale_x, scale_y)
        
        # Center the icon
        offset_x = (size - vb_width * scale) / 2
        offset_y = (size - vb_height * scale) / 2
        
        # Find all path elements
        for path_elem in root.findall('.//{http://www.w3.org/2000/svg}path'):
            path_data = path_elem.get('d', '')
            if path_data:
                # For FontAwesome icons, we'll use a simpler approach
                # Convert path to polygons (simplified)
                points = extract_points_from_path(path_data, scale, offset_x, offset_y)
                if points:
                    draw.polygon(points, fill=fill_color)
        
        img.save(png_path, 'PNG')
        print(f"✓ Converted: {os.path.basename(svg_path)} -> {os.path.basename(png_path)}")
        return True
        
    except Exception as e:
        print(f"Error converting {svg_path}: {e}")
        return False

def extract_points_from_path(path_data, scale, offset_x, offset_y):
    """Extract points from SVG path data (simplified for FontAwesome icons)"""
    points = []
    
    # Simple parsing for M and L commands
    nums = re.findall(r'-?\d+\.?\d*', path_data)
    nums = [float(n) for n in nums]
    
    # Extract pairs of coordinates
    for i in range(0, len(nums) - 1, 2):
        x = nums[i] * scale + offset_x
        y = nums[i + 1] * scale + offset_y
        points.append((x, y))
    
    return points

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
    
    print("=" * 50)
    print("SVG to PNG Converter (Pillow Version)")
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
        
        if svg_to_png_simple(svg_path, png_path, size):
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
