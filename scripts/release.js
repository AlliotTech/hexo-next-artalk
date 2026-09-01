'use strict';

const { execFileSync } = require('node:child_process');
const { readFileSync, writeFileSync } = require('node:fs');
const { resolve } = require('node:path');

const root = resolve(__dirname, '..');
const packagePath = resolve(root, 'package.json');
const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
const requested = process.argv[2];

if (!requested || !['major', 'minor', 'patch'].includes(requested) && !/^v?\d+\.\d+\.\d+$/.test(requested)) {
  console.error('Usage: npm run release -- <major|minor|patch|x.y.z>');
  process.exit(1);
}

function run(command, args) {
  execFileSync(command, args, { cwd: root, stdio: 'inherit' });
}

function capture(command, args) {
  return execFileSync(command, args, { cwd: root, encoding: 'utf8' }).trim();
}

if (capture('git', ['status', '--porcelain'])) {
  console.error('Release requires a clean working tree.');
  process.exit(1);
}

const branch = capture('git', ['branch', '--show-current']);
if (branch !== 'main') {
  console.error(`Release must run on main; current branch is ${branch || '(detached)'}.`);
  process.exit(1);
}

run('git', ['pull', '--ff-only', 'origin', 'main']);

const versionArg = requested.startsWith('v') ? requested.slice(1) : requested;
run('npm', ['version', versionArg, '--no-git-tag-version']);
const version = JSON.parse(readFileSync(packagePath, 'utf8')).version;
const tag = `v${version}`;

run('git', ['add', 'package.json']);
run('git', ['commit', '-m', `chore: release ${tag}`]);
run('git', ['push', 'origin', 'main']);
run('git', ['push', 'origin', tag]);
run('gh', ['release', 'create', tag, '--title', tag, '--generate-notes']);
