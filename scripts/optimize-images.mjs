import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = path.join(root, 'shared', 'assets', 'images');

/** Keep image dimensions close to their largest measured display size. */
const maxWidths = {
    'Logo.webp': 240,
    'daneshjooyar-logo.webp': 96,
    'Portfolio.webp': 336,
    'Tech Stack.webp': 384,
    'My photo hero.webp': 800,
    'My photo offcanvas.webp': 256,
    'Science and technology park.webp': 800,
    'Ali Akbar Rehabilitation.webp': 800,
    'Spare parts.webp': 800,
    'dotinschool.webp': 96,
    'Solo Learn.webp': 96
};

const files = fs.readdirSync(imagesDir).filter(
    (name) => name.endsWith('.webp') && !name.includes('.tmp.webp')
);
const highQualityImages = new Set([
    'Science and technology park.webp',
    'Ali Akbar Rehabilitation.webp',
    'Spare parts.webp'
]);

for (const file of files) {
    const input = path.join(imagesDir, file);
    const source = fs.readFileSync(input);
    const before = source.length;
    const pipeline = sharp(source);
    const meta = await pipeline.metadata();
    const maxWidth = maxWidths[file] ?? 800;
    const width = Math.min(meta.width ?? maxWidth, maxWidth);

    pipeline.resize({
        width,
        withoutEnlargement: true
    });

    if (file === 'My photo hero.webp') {
        pipeline.sharpen(0.6);
    }

    const output = await pipeline
        .webp({
            quality: highQualityImages.has(file) ? 90 : file === 'My photo hero.webp' ? 88 : 72,
            effort: 6,
            smartSubsample: true
        })
        .toBuffer();

    fs.writeFileSync(input, output);

    const afterMeta = await sharp(output).metadata();
    console.log(
        `${file}: ${meta.width}x${meta.height} ${(before / 1024).toFixed(1)}KiB -> ${afterMeta.width}x${afterMeta.height} ${(output.length / 1024).toFixed(1)}KiB`
    );
}
