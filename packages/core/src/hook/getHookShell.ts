import fs from 'fs'
import { resolve } from 'path'
import readPkg from '../utils/readPkg'
import getHookComment from './getHookComment'
import { SH_PATH } from '../utils/paths'

/**
 * 生成hook主程序
 *
 * @returns arr 返回对象
 */
function getHookShell(): string {
    const pkg = readPkg()
    const hookShell = fs
        .readFileSync(resolve(SH_PATH, 'gitmars.sh'), 'utf-8')
        .replace('gitmarsVersion="0.0.0"', `gitmarsVersion="${pkg.version}"`)
    return [getHookComment(), '', hookShell].join('\n')
}

export default getHookShell
