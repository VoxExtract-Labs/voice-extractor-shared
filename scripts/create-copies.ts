#!/usr/bin/env bun
import { join } from 'node:path';
import { confirm } from '@inquirer/prompts';
import fs from 'fs-extra';

(async () => {
    // Determine the root of the consuming project (assumes the script is run from the project root)
    const projectRoot = process.cwd();

    // The shared config directory inside the shared dependency
    const sharedConfigDir = join(__dirname, '..', 'config');

    // Files to symlink
    const files = ['biome.json', 'commitlint.config.cjs', 'lefthook.yml', '.coderabbit.yaml'];

    for (const file of files) {
        const target = join(projectRoot, file);
        const source = join(sharedConfigDir, file);

        // Skip if the target already exists
        if (await fs.pathExists(target)) {
            console.log(`Skipping ${file} because it already exists at ${target}`);
            continue;
        }

        // Ask the user for confirmation
        const confirmed = await confirm({
            message: `Copy ${file}: ${target} -> ${source}?`,
            default: false,
        });

        if (confirmed) {
            try {
                await fs.copyFile(source, target);
                console.log(`Created ${file}: ${target} -> ${source}`);
            } catch (error) {
                console.error(`Failed to create ${file}:`, error);
            }
        } else {
            console.log(`Skipped creating ${file}.`);
        }
    }
})();
