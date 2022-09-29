'use strict';

const fs = require('fs-extra');
const path = require('path');

(async () => {
  const templateDir = path.join(__dirname, '../src/miniplates');
  const buildDir = path.join(__dirname, '../build/miniplates');

  await fs.copy(templateDir, buildDir);
})();