import sh from 'shelljs'
import chalk from 'chalk'
import request from '@jssj/request'
import type { ApolloConfigType } from '../typings'
import { getBuildConfig } from './build/buildConfig'

/**
 * 发送群消息
 *
 * @param message - 消息
 * @param cfg - 配置
 */
async function sendGroupMessage(message: string, url = ''): Promise<void> {
    const config = (await getBuildConfig()) as ApolloConfigType
    let urls: string[] = []
    if (!config.gitNotificationGroupUrl && !url) {
        sh.echo(chalk.red('没有配置群消息推送地址'))
        return
    }
    if (url) urls = [url]
    else if (config.gitNotificationGroupUrl) {
        if (typeof config.gitNotificationGroupUrl === 'string') {
            urls = [config.gitNotificationGroupUrl]
        } else urls = config.gitNotificationGroupUrl
    }
    message = message.replace(/\s/g, '')
    urls.forEach(async item => {
        await request
            .post({
                url: item || config.gitNotificationGroupUrl,
                data: {
                    content: message
                },
                headers: { 'Content-Type': 'application/json' }
            })
            .then(() => {
                sh.echo(chalk.green('发送消息成功'))
            })
    })
}

export default sendGroupMessage
