import fs from 'fs';
import path from 'path';

const directories = ['app', 'components', 'data', 'lib'];
const rootDir = path.resolve(process.cwd());

function getAllFiles(dir, fileList = []) {
  const fullPath = path.join(rootDir, dir);
  if (!fs.existsSync(fullPath)) return fileList;
  const files = fs.readdirSync(fullPath);

  files.forEach((file) => {
    const filePath = path.join(fullPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && file !== 'node_modules' && file !== '.next') {
      getAllFiles(path.join(dir, file), fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

let hasErrors = false;
const mojibakeRegex = /(â|Â|Ã|œ)/;

directories.forEach((dir) => {
  const files = getAllFiles(dir);
  files.forEach((filePath) => {
    const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
    lines.forEach((line, index) => {
      if (mojibakeRegex.test(line)) {
        const relPath = path.relative(rootDir, filePath);
        console.error(`[MOJIBAKE FAULT] ${relPath}:${index + 1} - Found invalid sequence in text: "${line.trim()}"`);
        hasErrors = true;
      }
    });
  });
});

if (hasErrors) {
  console.error('\nFAILED: Mojibake sequences detected in source code! Please normalize files to standard UTF-8.');
  process.exit(1);
} else {
  console.log('PASSED: Zero mojibake or malformed encoding sequences found across source code.');
  process.exit(0);
}
