const path = require('path');
const fs = require('fs');

function findProjectRoot(dir) {
    if (fs.existsSync(path.join(dir, 'package.json'))) {
        return dir;
    }
    const parentDir = path.resolve(dir, '..');
    if (parentDir === dir) {
        throw new Error('Project root not found');
    }
    return findProjectRoot(parentDir);
}

function getRelativePathToProjectRoot(currentFilePath) {
    const currentFileDir = path.dirname(currentFilePath);
    const projectRoot = findProjectRoot(currentFileDir);
    return path.relative(projectRoot, currentFilePath);
}

module.exports = getRelativePathToProjectRoot;
