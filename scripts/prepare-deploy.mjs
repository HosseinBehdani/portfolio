import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const deployDir = path.join(root, 'dist', 'deploy');
const stagingDir = path.join(root, 'dist', 'deploy-staging');

const angularBuild = path.join(deployDir, 'angular', 'browser');
const reactBuild = path.join(deployDir, 'react');
const sharedAssets = path.join(root, 'shared', 'assets');

function ensureExists(target, label) {
    if (!fs.existsSync(target)) {
        throw new Error(`${label} not found: ${target}`);
    }
}

function copyDirectory(source, destination) {
    fs.cpSync(source, destination, {
        recursive: true,
        force: true
    });
}

function copyFileIfExists(source, destination) {
    if (fs.existsSync(source)) {
        fs.mkdirSync(path.dirname(destination), {
            recursive: true
        });

        fs.copyFileSync(source, destination);
    }
}

ensureExists(angularBuild, 'Angular production build');
ensureExists(reactBuild, 'React production build');
ensureExists(sharedAssets, 'Shared assets');

fs.rmSync(stagingDir, {
    recursive: true,
    force: true
});

fs.mkdirSync(stagingDir, {
    recursive: true
});

copyDirectory(angularBuild, path.join(stagingDir, 'angular'));
copyDirectory(reactBuild, path.join(stagingDir, 'react'));
copyDirectory(sharedAssets, path.join(stagingDir, 'assets'));

const rootFiles = [
    'favicon.ico',
    'favicon.svg',
    'site.webmanifest',
    'robots.txt',
    'sitemap.xml',
    'llms.txt'
];

for (const file of rootFiles) {
    copyFileIfExists(
        path.join(angularBuild, file),
        path.join(stagingDir, file)
    );
}

const rootDirectories = [
    '.well-known',
    'resume'
];

for (const directory of rootDirectories) {
    const source = path.join(angularBuild, directory);

    if (fs.existsSync(source)) {
        copyDirectory(
            source,
            path.join(stagingDir, directory)
        );
    }
}

fs.rmSync(deployDir, {
    recursive: true,
    force: true
});

fs.renameSync(stagingDir, deployDir);

console.log('Deployment directory prepared successfully.');
console.log(`Angular: ${path.join(deployDir, 'angular')}`);
console.log(`React: ${path.join(deployDir, 'react')}`);
console.log(`Shared assets: ${path.join(deployDir, 'assets')}`);