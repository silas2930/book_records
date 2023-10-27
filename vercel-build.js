const { execSync } = require('child_process');

// Generate Prisma Client
execSync('npx prisma generate', { stdio: 'inherit' });