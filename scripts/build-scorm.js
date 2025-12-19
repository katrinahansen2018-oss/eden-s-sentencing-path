import { execSync } from 'child_process';
import { createWriteStream, existsSync, mkdirSync, readdirSync, statSync, readFileSync } from 'fs';
import { join, relative } from 'path';
import archiver from 'archiver';

const DIST_DIR = 'dist';
const OUTPUT_FILE = 'scorm-package.zip';

console.log('🔨 Building SCORM package...\n');

// Step 1: Run Vite build in scorm mode
try {
  execSync('npx vite build --mode scorm', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}

console.log('\n📦 Creating SCORM zip package...\n');

// Step 2: Create zip archive
const output = createWriteStream(OUTPUT_FILE);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  const sizeKB = (archive.pointer() / 1024).toFixed(2);
  console.log(`\n✅ SCORM package created: ${OUTPUT_FILE} (${sizeKB} KB)`);
  console.log('\n📤 Upload instructions:');
  console.log('   1. Go to your LMS (D2L Brightspace, Moodle, etc.)');
  console.log('   2. Navigate to Content > Add Existing Activities > SCORM');
  console.log('   3. Upload scorm-package.zip');
  console.log('   4. Configure scoring options as needed\n');
});

archive.on('error', (err) => {
  console.error('❌ Zip creation failed:', err);
  process.exit(1);
});

archive.pipe(output);

// Add all files from dist directory
function addDirectoryToArchive(dirPath, archivePath = '') {
  const items = readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = join(dirPath, item);
    const archiveFilePath = archivePath ? join(archivePath, item) : item;
    
    if (statSync(fullPath).isDirectory()) {
      addDirectoryToArchive(fullPath, archiveFilePath);
    } else {
      archive.file(fullPath, { name: archiveFilePath });
    }
  }
}

addDirectoryToArchive(DIST_DIR);

archive.finalize();
