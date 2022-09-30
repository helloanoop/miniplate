'use strict';

import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import spawn from 'cross-spawn';
import chalk from 'chalk';

const getFolderName = async () => {
  return new Promise((resolve, reject) =>{
    inquirer.prompt([{
      name: 'folderName',
      message: 'Specify a name for your app'
    }])
    .then((answers) => resolve(answers.folderName))
    .catch((err) => reject(err))
  });
}

const shouldRunNpmInstall = async () => {
  return new Promise((resolve, reject) =>{
    inquirer.prompt([{
      name: 'shouldRunNpmInstall',
      message: 'Do you want to run npm install (y/n) ?',
      default: 'y'
    }])
    .then((answers) => resolve(answers.shouldRunNpmInstall))
    .catch((err) => reject(err))
  });
}

export default async () => {
  try {
    console.log(chalk.yellow('Creating a NextJs Tailwind app'));
    const folderName = await getFolderName();
    if(!folderName || !folderName.length) {
      console.log(chalk.red('You need to choose an app name'));
      return;
    }
    console.log(chalk.green(folderName));
    const templateDir = path.join(__dirname, '../miniplates/next-tailwind');
    const appDir = path.join('.', folderName);

    await fs.copy(templateDir, appDir);
    console.log(chalk.green('✓ Copied next-tailwind miniplate'));

    const currentPath = process.cwd();
    const fqAppDir = path.join(currentPath, appDir);

    console.log(chalk.green(`✓ Entering ${appDir} directory`));
    process.chdir(fqAppDir);

    console.log(chalk.yellow(`System Node Version                        : ${process.version}`));
    console.log(chalk.yellow(`Recommended Node version for next-tailwind : v14`));

    const runNpmInstall = await shouldRunNpmInstall();
    if(['y', 'Y', 'yes', 'YES', 'Yes'].includes(runNpmInstall)) {
      spawn.sync('npm', ['install'], { stdio: 'inherit' });
    }

    console.log(chalk.green(`✓ All set. Lets write some code !!`));
  } catch (err) {
    console.error(err)
  }
};