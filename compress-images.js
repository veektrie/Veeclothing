const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const targets = [
  'kaftan01.jpg',
  'kaftan02.jpg',
  'kaftan03.jpg',
];

const publicDir = path.join(__dirname, 'public');

(async () => {
  for (const file of targets) {
    const input = path.join(publicDir, file);
    const outputName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const output = path.join(publicDir, outputName);

    if (!fs.existsSync(input)) {
      console.log(`⚠ Skipping ${file} — not found`);
      continue;
    }

    await sharp(input)
      .webp({ quality: 82 })
      .toFile(output);

    const before = (fs.statSync(input).size / 1024 / 1024).toFixed(2);
    const after = (fs.statSync(output).size / 1024 / 1024).toFixed(2);
    console.log(`✅ ${file}: ${before} MB → ${outputName}: ${after} MB`);
  }
})();
