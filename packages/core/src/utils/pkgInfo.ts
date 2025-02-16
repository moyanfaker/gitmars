import { resolve } from 'path'
import getProperty from 'js-cool/lib/getProperty'
import { isCacheExpired, updateCacheTime } from '../cache/cache'
import { spawnSync } from '../spawn'
import { isFileExist, removeFile, writeFile } from './file'
import { CACHE_PATH } from './paths'

/**
 * 读取gitmars在线版本列表
 *
 * @param name - 需要查询的内容
 * @returns {Object} arr 返回配置对象
 */
export async function getPkgInfo(name?: string): Promise<any | void> {
    let packageInfo
    // 有配置文件且没有过期，返回配置
    if (
        !isCacheExpired('packageInfoTime') &&
        isFileExist(resolve(CACHE_PATH + 'packageInfo.json'))
    ) {
        packageInfo = require(resolve(CACHE_PATH + 'packageInfo.json'))
        return name ? getProperty(packageInfo, name) : packageInfo
    }
    const { stdout } = spawnSync('npm', ['view', 'gitmars', '--json'])
    try {
        packageInfo = JSON.parse(stdout!)
    } catch {
        throw '出错了'
    }
    await updateCacheTime('packageInfoTime')
    await writeFile(
        resolve(CACHE_PATH + 'packageInfo.json'),
        JSON.stringify(packageInfo)
    )
    return name ? getProperty(packageInfo, name) : packageInfo
}

/**
 * 清理pkgInfo缓存
 */
export function cleanPkgInfo() {
    removeFile({
        name: 'Gitmars包缓存文件',
        url: resolve(CACHE_PATH + 'packageInfo.json')
    })
}

export default {
    getPkgInfo,
    cleanPkgInfo
}
