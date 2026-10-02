import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const source = path.join(root, 'shared', 'assets');
const targets = [
    path.join(root, 'apps', 'angular', 'public', 'assets'),
    path.join(root, 'apps', 'react', 'public', 'assets'),
    path.join(root, 'apps', 'next', 'public', 'assets')
];

function copyDirectory(sourceDir, targetDir) {
    fs.mkdirSync(targetDir, { recursive: true });

    const entries = fs.readdirSync(sourceDir, {
        withFileTypes: true
    });

    for (const entry of entries) {
        const sourcePath = path.join(sourceDir, entry.name);
        const targetPath = path.join(targetDir, entry.name);

        if (entry.isDirectory()) {
            copyDirectory(sourcePath, targetPath);
        } else {
            fs.copyFileSync(sourcePath, targetPath);
        }
    }
}

for (const target of targets) {
    if (fs.existsSync(target)) {
        fs.rmSync(target, {
            recursive: true,
            force: true
        });
    }

    copyDirectory(source, target);
    console.log(`Assets synced: ${target}`);
}