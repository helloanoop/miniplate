'use strict';

import inquirer from 'inquirer';
import chalk from 'chalk';

import nextTailwind from './next-tailwind';

const selectMiniplate = async () => {
  return new Promise((resolve, reject) =>{
    inquirer.prompt([{
      type: 'list',
      name: 'miniplate',
      message: 'Select miniplate',
      choices: ['next-tailwind'],
      default: 0
    }])
    .then((answers) => resolve(answers.miniplate))
    .catch((err) => reject(err))
  });
}
export default async (yargs) => {
  try {
    const miniplate = await selectMiniplate();
    if(!miniplate || !miniplate.length) {
      console.log(chalk.red('You need to select a minplate'));
      return;
    }

    switch(miniplate) {
      case 'next-tailwind': {
        await nextTailwind();
        break;
      }
    }
  } catch (err) {
    console.error(err)
  }
};