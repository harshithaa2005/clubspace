const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/HARI/.gemini/antigravity/scratch/clubspace/frontend/src';

function replaceInDir(dirPath) {
  const files = fs.readdirSync(dirPath);
  for(const file of files) {
    const fullPath = path.join(dirPath, file);
    if(fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if(fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if(content.includes('http://localhost:5000/api/')) {
        content = content.replace(/'http:\/\/localhost:5000\/api\/([^']+)'/g, "`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/$1`");
        content = content.replace(/`http:\/\/localhost:5000\/api\/([^`]+)`/g, "`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/$1`");
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}
replaceInDir(dir);
console.log('URLs updated successfully.');
