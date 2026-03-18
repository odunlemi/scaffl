#!/usr/bin/env node

const path = require("path");
const { scaffold } = require("../index");

const args = process.argv.slice(2);
const targetDir = args[0] ? path.resolve(args[0]) : process.cwd();

console.log(`Scaffolding MVC structure in: ${targetDir}\n`);

const { created, skipped } = scaffold(targetDir);

console.log(`Done!`);
console.log(`   ${created} file(s) created`);
if (skipped > 0) {
  console.log(`   ${skipped} file(s) skipped (already exist)`);
}

console.log(`\nGenerated structure:`);
console.log(`
  app.js
  ├── models/
  │   ├── index.js
  │   └── UserModel.js
  ├── views/
  │   ├── index.js
  │   └── userView.js
  ├── controllers/
  │   ├── index.js
  │   └── userController.js
  └── routes/
      ├── index.js
      └── userRoutes.js
`);
console.log(`Happy building!\n`);