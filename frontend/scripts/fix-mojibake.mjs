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

let modifiedCount = 0;

directories.forEach((dir) => {
  const files = getAllFiles(dir);
  files.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    let updated = content;
    
    updated = updated
      .replaceAll('Ã¢’', '’')
      .replaceAll('Ã‚·', '·')
      .replaceAll('â‚¬â„¢', '’')
      .replaceAll('Ã¢”â‚¬', '─')
      .replaceAll('â‚¬Ã', '─')
      .replaceAll(/â‚¬(?=─|-)/g, '─')
      .replaceAll('â”€', '─')
      .replaceAll('â€”', '—')
      .replaceAll('â€“', '–')
      .replaceAll('â€œ', '“')
      .replaceAll('â€¢', '•')
      .replaceAll('â€™', '’')
      .replaceAll('â€˜', '‘')
      .replaceAll('â†’', '→')
      .replaceAll('â†\u0090', '←')
      .replaceAll('âœ“', '✓')
      .replaceAll('â‚±', '₱')
      .replaceAll('Â·', '·')
      .replaceAll('â€\u009D', '”')
      .replaceAll('â€', '”');

    updated = updated.replace(/(\/\/\s*)(([âÃ‚¬â„¢]|─|-){4,})/g, (match, prefix) => `${prefix}${'─'.repeat(50)}`);

    if (updated !== content) {
      const relPath = path.relative(rootDir, filePath);
      console.log(`Fixed mojibake in: ${relPath}`);
      fs.writeFileSync(filePath, updated, { encoding: 'utf8', flag: 'w' });
      modifiedCount++;
    }

    const leftoverMatch = updated.match(/(â|Â|Ã|œ)[^\s,.;:)<>"'\]}]*/g);
    if (leftoverMatch && leftoverMatch.length > 0) {
      const relPath = path.relative(rootDir, filePath);
      console.warn(`WARNING: Possible unhandled mojibake in ${relPath}: ${Array.from(new Set(leftoverMatch)).join(', ')}`);
    }
  });
});

console.log(`\nTotal files modified in this pass: ${modifiedCount}`);
