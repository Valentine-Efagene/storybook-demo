#!/bin/bash

# Script to convert all JPG and PNG images in property_images to WebP format
# Usage: chmod +x scripts/convert-to-webp.sh && ./scripts/convert-to-webp.sh

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "cwebp is not installed. Please install it first:"
    echo "brew install webp"
    exit 1
fi

# Navigate to the project root
cd "$(dirname "$0")/.."

# Create backup directory
mkdir -p "public/property_images_backup"

# Function to convert image to WebP
convert_to_webp() {
    local input_file="$1"
    local output_file="${input_file%.*}.webp"
    local backup_file="public/property_images_backup/$(basename "$input_file")"
    
    echo "Converting: $input_file"
    
    # Create backup
    cp "$input_file" "$backup_file"
    
    # Convert to WebP with 80% quality (good balance of size/quality)
    if cwebp -q 80 "$input_file" -o "$output_file"; then
        echo "✅ Converted: $output_file"
        
        # Get file sizes for comparison
        original_size=$(du -h "$input_file" | cut -f1)
        webp_size=$(du -h "$output_file" | cut -f1)
        echo "   Original: $original_size → WebP: $webp_size"
        
        # Optionally remove original (uncomment next line to delete originals)
        # rm "$input_file"
    else
        echo "❌ Failed to convert: $input_file"
    fi
}

# Convert all JPG and PNG files in property_images
echo "🔄 Starting WebP conversion for property images..."
echo "📁 Backing up originals to public/property_images_backup/"
echo ""

find "public/property_images" \( -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" \) -type f | while read -r file; do
    convert_to_webp "$file"
done

echo ""
echo "🎉 Conversion complete!"
echo "📊 File size comparison:"
du -sh public/property_images_backup/ public/property_images/

echo ""
echo "📝 Next steps:"
echo "1. Update your component code to use .webp extensions"
echo "2. Test the images in your application"
echo "3. If everything works, you can delete the backup folder"
echo "4. Consider adding <picture> elements for fallback support"