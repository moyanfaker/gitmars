import type {
    SpawnOptions,
    SpawnSyncOptions,
    SpawnSyncReturns
} from 'child_process'
import crossSpawn from 'cross-spawn'
import { debug } from './utils/debug'

/**
 * 异步执行脚本
 *
 * @param client - 执行脚本的宿主，名称
 * @param argv - 参数
 * @param options - 透传配置
 * @returns result - 返回执行状态
 */
export function spawn(
    client: string,
    argv: string[],
    options: SpawnOptions = {}
): Partial<SpawnSyncReturns<string>> {
    let len = argv.length
    while (len--) {
        !argv[len] && argv.splice(len, 1)
    }
    const program = crossSpawn.sync(client, argv, {
        // stdio: 'inherit',
        shell: process.platform === 'win32',
        ...options
    })
    debug(client, argv)
    return {
        pid: program.pid,
        stdout: program.stdout
            ? program.stdout.toString().replace(/\s+$/, '')
            : '',
        stderr: program.stderr ? program.stderr.toString() : '',
        status: program.status,
        signal: program.signal,
        error: program.error
    }
}

/**
 * 同步执行脚本
 *
 * @param client - 执行脚本的宿主，名称
 * @param argv - 参数
 * @param options - 透传配置
 * @returns result - 返回执行状态
 */
export function spawnSync(
    client: string,
    argv: string[],
    options: SpawnSyncOptions = {}
): Partial<SpawnSyncReturns<string>> {
    let len = argv.length
    while (len--) {
        !argv[len] && argv.splice(len, 1)
    }
    const program = crossSpawn.sync(client, argv, {
        // stdio: 'inherit',
        shell: process.platform === 'win32',
        ...options
    })
    debug(client, argv)
    return {
        pid: program.pid,
        stdout: program.stdout
            ? program.stdout.toString().replace(/\s+$/, '')
            : '',
        stderr: program.stderr ? program.stderr.toString() : '',
        status: program.status,
        signal: program.signal,
        error: program.error
    }
}

export default {
    spawnSync,
    spawn
}
