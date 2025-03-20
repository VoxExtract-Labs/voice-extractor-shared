#!/usr/bin/env node
import { existsSync, symlinkSync } from 'node:fs';
import { join } from 'node:path';
import prompts from '@inquirer/prompts';

(async () => {
    // Determine the root of the consuming project (assumes the script is run from the project root)
    const projectRoot = process.cwd();

    // The shared config directory inside the shared dependency
    const sharedConfigDir = join(__dirname, '..', 'config');

    // Files to symlink
    const files = ['biome.json', 'commitlint.config.cjs', 'lefthook.yml'];

    for (const file of files) {
        const target = join(projectRoot, file);
        const source = join(sharedConfigDir, file);

        // Skip if the target already exists
        if (existsSync(target)) {
            console.log(`Skipping ${file} because it already exists at ${target}`);
            continue;
        }

        // Ask the user for confirmation
        const response = await prompts({
            type: 'confirm',
            name: 'create',
            message: `Create symlink for ${file}: ${target} -> ${source}?`,
            initial: true,
        });

        if (response.create) {
            try {
                symlinkSync(source, target, 'file');
                console.log(`Created symlink for ${file}: ${target} -> ${source}`);
            } catch (error) {
                console.error(`Failed to create symlink for ${file}:`, error);
            }
        } else {
            console.log(`Skipped creating symlink for ${file}.`);
        }
    }
})();
