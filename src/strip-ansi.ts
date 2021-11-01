/**
 * @file strip-ansi.js
 * @desc 字符
 */

/* eslint-disable max-len */
function ansiRegex({onlyFirst = false} = {}): RegExp {
    const pattern = [
        /* eslint-disable-next-line max-len */
        '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
        '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
    ].join('|');

    return new RegExp(pattern, onlyFirst ? undefined : 'g');
}

export default function stripAnsi(str: string): string {
    if (typeof str !== 'string') {
        throw new TypeError(`Expected a \`string\`, got \`${typeof str}\``);
    }

    return str.replace(ansiRegex(), '');
}
