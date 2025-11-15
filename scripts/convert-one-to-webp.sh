#!/bin/bash

# Script to convert testimonial_bg.png to WebP format
# Usage: chmod +x scripts/convert-one-to-webp.sh && ./scripts/convert-one-to-webp.sh

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "cwebp is not installed. Please install it first:"
    echo "brew install webp"
    exit 1
fi

# Navigate to the project root
cd "$(dirname "$0")/.."

# Define the specific file to convert
INPUT_FILE="public/why_choose_2.png"

# Check if the file exists
if [ ! -f "$INPUT_FILE" ]; then
    echo "❌ File not found: $INPUT_FILE"
    exit 1
fi

# Convert the testimonial background image to WebP
OUTPUT_FILE="public/why_choose_2.webp"

echo "🔄 Converting testimonial background image to WebP..."
echo "📁 Input: $INPUT_FILE"
echo "📁 Output: $OUTPUT_FILE"
echo ""

# Convert to WebP with 80% quality (good balance of size/quality)
if cwebp -q 80 "$INPUT_FILE" -o "$OUTPUT_FILE"; then
    echo "✅ Successfully converted: $OUTPUT_FILE"
    
    # Get file sizes for comparison
    original_size=$(du -h "$INPUT_FILE" | cut -f1)
    webp_size=$(du -h "$OUTPUT_FILE" | cut -f1)
    echo "📊 File size comparison:"
    echo "   Original PNG: $original_size"
    echo "   WebP: $webp_size"
    
    # Calculate compression ratio
    original_bytes=$(stat -f%z "$INPUT_FILE" 2>/dev/null || stat -c%s "$INPUT_FILE")
    webp_bytes=$(stat -f%z "$OUTPUT_FILE" 2>/dev/null || stat -c%s "$OUTPUT_FILE")
    reduction=$(( (original_bytes - webp_bytes) * 100 / original_bytes ))
    echo "   Size reduction: ${reduction}%"
    
else
    echo "❌ Failed to convert: $INPUT_FILE"
    exit 1
fi
