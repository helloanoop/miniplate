'use strict';

import yargs from 'yargs';
import chalk from 'chalk';
import figlet from 'figlet';
import defaultCommand from './commands';

const printBanner = () => console.log(
  chalk.yellow(
    figlet.textSync('miniplate', { horizontalLayout: 'full' })
  )
);

import { CLI_EPILOGUE } from './constants'

export const run = async () => {
  let argLength = process.argv.length;
  let commandsToPrintBanner = ['--help', '-h'];
  if (argLength <= 2 || process.argv.find((arg) => commandsToPrintBanner.includes(arg))) {
    printBanner()
  }

  yargs
    .strict()
    .usage('npx miniplate')
    .command('$0', 'default command', () => {}, defaultCommand)
    .epilogue(CLI_EPILOGUE)
    .help('h')
    .alias('h', 'help').argv;
};