import { getImagePlaceholder } from '@/lib/helpers/PlaceholderHelper';
import fs from 'fs';
import path from 'path';

// Manually define all the image paths from all property classes
const IMAGES = [
    '/img/property_empty.svg',
];

async function generatePlaceholders() {
    console.log('🎨 Generating placeholders...');

    const placeholders = [];

    for (let i = 0; i < IMAGES.length; i++) {
        const imagePath = IMAGES[i];
        console.log(`Processing ${i + 1}/${IMAGES.length}: ${imagePath}`);

        try {
            const placeholder = await getImagePlaceholder(imagePath);
            placeholders.push({
                src: imagePath,
                ...placeholder
            });
            console.log(`✅ Generated placeholder for ${imagePath}`);
        } catch (error) {
            console.error(`❌ Failed to generate placeholder for ${imagePath}:`, error);
            // Add fallback
            // placeholders.push({
            //     src: imagePath,
            //     blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
            //     width: 800,
            //     height: 600,
            // });
        }
    }

    // Save to a JSON file
    const outputPath = path.join(process.cwd(), 'src/data/placeholders.json');
    const outputDir = path.dirname(outputPath);

    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(placeholders, null, 2));
    console.log(`🎉 Generated ${placeholders.length} placeholders and saved to ${outputPath}`);
}

generatePlaceholders().catch(console.error);