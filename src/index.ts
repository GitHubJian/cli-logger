/**
 * @file logger.js
 * @desc CLI logger 日志方法
 */
/* eslint-disable no-console */
import chalk from 'chalk';
import stripAnsi from './strip-ansi';

/**
 * 格式化
 * @param {string} label 标签
 * @param {string} msg 信息
 * @returns {string} 格式化后信息
 */
const format = (label: string, msg: string): string => {
    return msg
        .split('\n')
        .map((line, i) => {
            return i === 0
                ? `${label} ${line}`
                : line.padStart(stripAnsi(label).length);
        })
        .join('\n');
};

/**
 * 上色
 * @param {string} msg
 * @returns {string} 加入背景色
 */
const chalkTag = function (msg: string): string {
    return chalk.bgBlackBright.white.dim(` ${msg} `);
};

/**
 * 普通日志
 * @param {string} msg 信息
 * @param {string} tag 标签
 */
export function log(msg: string = '', tag = ''): void {
    tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg);
}

/**
 * 消息日志
 * @param {string} msg 信息
 * @param {string} tag 标签
 */
export function info(msg: string, tag = ''): void {
    console.log(
        format(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), msg)
    );
}

/**
 * 完成日志
 * @param {string} msg 信息
 * @param {string} tag 标签
 */
export function done(msg: string, tag: string = ''): void {
    console.log(
        format(chalk.bgGreen.black(' DONE ') + (tag ? chalkTag(tag) : ''), msg)
    );
}

/**
 * 警告日志
 * @param {string} msg 信息
 * @param {string} tag 标签
 */
export function warn(msg: string, tag: string = ''): void {
    console.warn(
        format(
            chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''),
            chalk.yellow(msg)
        )
    );
}

/**
 * 错误日志
 * @param {string} msg 信息
 * @param {string} tag 标签
 */
export function error(msg: Error | string, tag: string = ''): void {
    console.error(
        format(
            chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''),
            chalk.red(msg)
        )
    );

    if (msg instanceof Error) {
        console.error(msg.stack);
    }
}
