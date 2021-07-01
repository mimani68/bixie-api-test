import chalk from "chalk";

export function log(msg: string) {
    console.log(chalk.yellowBright('info'), msg)
}

export function error(msg: string) {
    console.log(chalk.redBright('error'), msg)
}