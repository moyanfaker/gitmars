import sh from 'shelljs'
import chalk from 'chalk'
import request from '@jssj/request'
import type {
    ApolloBranchList,
    ApolloConfigBranchType,
    ApolloConfigType
} from '../../typings'
import mapTemplate from '../utils/mapTemplate'
import { debug } from '../utils/debug'
import { getBuildConfig } from './buildConfig'

export interface RunJenkinsOptionType {
    env: ApolloBranchList
    project: string
    app: string
}

/**
 * 调起Jenkins构建
 *
 * @param option - 配置
 */
async function runJenkins({
    env,
    project,
    app = 'all'
}: RunJenkinsOptionType): Promise<void | unknown> {
    const buildConfig = (await getBuildConfig()) as ApolloConfigType
    const cfg: ApolloConfigBranchType = buildConfig[env]
    debug('runJenkins-buildConfig', env, project, app, buildConfig)
    if (!cfg) {
        sh.echo(chalk.red('请输入正确的环境名称'))
        process.exit(1)
        return
    }
    const p = cfg.list.find(el => el.name === project)
    if (!p) {
        sh.echo(chalk.red('请输入正确的项目名称'))
        process.exit(1)
        return
    }
    if (app && p.apps) {
        const appList = app.split(',')
        for (const item of appList) {
            if (!p.apps.includes(item)) {
                sh.echo(chalk.red('请输入正确的应用名称'))
                process.exit(1)
                return
            }
        }
    }
    if (!buildConfig.template) {
        sh.echo(chalk.red('请配置Jenkins构建地址模板'))
        process.exit(1)
        return
    }
    const url = mapTemplate(
        p.apps && p.apps.length > 0
            ? buildConfig.templateWithParam
            : buildConfig.template,
        {
            line: cfg.line,
            project: p.project,
            token: cfg.token,
            app
        }
    )
    const auth = `Basic ${Buffer.from(
        buildConfig.username + ':' + buildConfig.password
    ).toString('base64')}`
    await request
        .get({
            url,
            headers: { Authorization: auth }
        })
        .then(() => {
            sh.echo(chalk.green('成功调起Jenkins构建'))
        })
}

export default runJenkins
