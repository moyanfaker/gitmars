import sh from 'shelljs'
import type { GitmarsLogType } from '../../typings'
import getGitRevParse from '../git/getGitRevParse'
import { removeFile } from '../utils/file'

const { gitDir } = getGitRevParse()

/**
 * 存储错误日志
 *
 * @param log - 错误日志
 */
export function setLog(log: GitmarsLogType): void {
    sh.touch(gitDir + '/.gitmarslog')
    sh.sed(
        '-i',
        // eslint-disable-next-line no-control-regex
        /[\s\S\n\r\x0A\x0D]*/,
        encodeURIComponent(JSON.stringify(log)),
        gitDir + '/.gitmarslog'
    )
}

/**
 * 清理log
 */
export function cleanLog() {
    removeFile({
        name: 'Gitmars包缓存文件',
        url: gitDir + '/.gitmarslog'
    })
}

export default {
    setLog,
    cleanLog
}
