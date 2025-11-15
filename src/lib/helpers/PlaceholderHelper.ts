import { getPlaiceholder } from 'plaiceholder';
import fs from 'fs';
import path from 'path';

// Generate placeholder for local images
export async function getImagePlaceholder(imagePath: string) {
    try {
        const fullPath = path.join(process.cwd(), 'public', imagePath);
        const file = fs.readFileSync(fullPath);

        const { base64, metadata } = await getPlaiceholder(file, { size: 10 });

        return {
            blurDataURL: base64,
            width: metadata.width,
            height: metadata.height,
        };
    } catch (error) {
        console.error('Error generating placeholder for:', imagePath, error);
        return {
            blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
            width: 800,
            height: 600,
        };
    }
}