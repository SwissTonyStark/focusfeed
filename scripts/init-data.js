const fs = require('fs');
const path = require('path');

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Copy sample content to runtime content file
const sampleContentPath = path.join(__dirname, '..', 'data', 'sample-content.json');
const contentPath = path.join(dataDir, 'content.json');

if (fs.existsSync(sampleContentPath)) {
  fs.copyFileSync(sampleContentPath, contentPath);
  console.log('✅ Sample content copied to data/content.json');
} else {
  // Create empty content file
  fs.writeFileSync(contentPath, JSON.stringify([], null, 2));
  console.log('✅ Empty content.json created');
}

// Copy sample preferences to runtime preferences file
const samplePreferencesPath = path.join(__dirname, '..', 'data', 'sample-preferences.json');
const preferencesPath = path.join(dataDir, 'preferences.json');

if (fs.existsSync(samplePreferencesPath)) {
  fs.copyFileSync(samplePreferencesPath, preferencesPath);
  console.log('✅ Sample preferences copied to data/preferences.json');
} else {
  // Create empty preferences file
  fs.writeFileSync(preferencesPath, JSON.stringify([], null, 2));
  console.log('✅ Empty preferences.json created');
}

console.log('🎉 Data initialization completed successfully!');
console.log('📁 Data directory ready at:', dataDir); 