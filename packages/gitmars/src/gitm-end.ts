#!/usr/bin/env ts-node
import type {
    CommandType,
    FetchDataType,
    GitmarsOptionOptionsType
} from '../typings'
const { program } = require('commander')
const sh = require('shelljs')
const { red } = require('chalk')
const getType = require('js-cool/lib/getType')
const { queue } = require('@gitmars/core/lib/queue')
const getIsGitProject = require('@gitmars/core/lib/git/getIsGitProject')
const getCurrentBranch = require('@gitmars/core/lib/git/getCurrentBranch')
const getGitConfig = require('@gitmars/core/lib/git/getGitConfig')
const getIsMergedTargetBranch = require('@gitmars/core/lib/git/getIsMergedTargetBranch')
const getIsBranchOrCommitExist = require('@gitmars/core/lib/git/getIsBranchOrCommitExist')
const checkGitStatus = require('@gitmars/core/lib/git/checkGitStatus')
const searchBranches = require('@gitmars/core/lib/git/searchBranches')
const { createArgs } = require('@gitmars/core/lib/utils/command')
const {
    isNeedUpgrade,
    upgradeGitmars
} = require('@gitmars/core/lib/versionControl')
if (!getIsGitProject()) {
    sh.echo(red('当前目录不是git项目目录'))
    process.exit(1)
}
const getConfig = require('@gitmars/core/lib/getConfig')
const getUserToken = require('@gitmars/core/lib/api/getUserToken')
const { defaults } = require('@gitmars/core/lib/global')
const { options, args } = require('./conf/end')
const config = getConfig()
const { appName } = getGitConfig()
const mergeRequestModule = require.resolve('@gitmars/core/lib/api/mergeRequest')

interface GitmBuildOption {
    combine?: boolean
    asFeature?: boolean
    description?: string
}

/**
 * gitm end
 */
program
    .name('gitm end')
    .usage(
        '[type] [name] [--description [description]] [--as-feature] [--no-combine]'
    )
    .description(
        '合并bugfix任务分支、合并feature功能开发分支，合并完成后将删除对应分支'
    )
if (args.length > 0) program.arguments(createArgs(args))
options.forEach((o: GitmarsOptionOptionsType) => {
    program.option(o.flags, o.description, o.defaultValue)
})
// .option('--no-combine', '不合并主干分支（请确保分支已经上线）')
// .option('--as-feature', 'bug分支合并到release')
// .option('--description [description]', '本次提交的原因描述', '')
program.action(
    async (type: string, name: string, opt: GitmBuildOption): Promise<void> => {
        const userInfoApi =
            (config.apis && config.apis.userInfo && config.apis.userInfo.url) ||
            config.api
        // 检测是否需要升级版本
        const needUpgrade = await isNeedUpgrade()
        needUpgrade && upgradeGitmars()
        const allow = ['bugfix', 'feature', 'support'] // 允许执行的指令
        const deny = [
            defaults.master,
            defaults.develop,
            defaults.release,
            defaults.bugfix,
            defaults.support
        ]
        const {
            token,
            level,
            nickname = ''
        } = userInfoApi ? await getUserToken() : ({} as FetchDataType)
        const status = checkGitStatus()
        let _nameArr: string[] = [], // 分支名称数组
            isDescriptionCorrect = true // 本次提交的原因描述是否符合规范
        if (!status) process.exit(1)
        // 有配置descriptionValidator时需要校验描述信息
        if (config.descriptionValidator) {
            // 校验本次提交的原因描述
            const reg =
                getType(config.descriptionValidator) === 'regexp'
                    ? config.descriptionValidator
                    : new RegExp(config.descriptionValidator)
            isDescriptionCorrect = opt.description && reg.test(opt.description)
        }
        if (!type) {
            // type和name都没传且当前分支是开发分支
            ;[type, ..._nameArr] = getCurrentBranch().split('/')
            name = _nameArr.join('/')
            if (!name) {
                deny.includes(type) &&
                    sh.echo(
                        red(`骚年，你在${type}分支执行这个指令是什么骚操作？`)
                    )
                process.exit(1)
            }
        } else if (!name) {
            // 传了type没传name
            if (allow.includes(type)) {
                sh.echo('请输入分支名称')
                process.exit(1)
            }
            const branches = searchBranches({ type })
            if (branches.length === 1) {
                ;[type, ..._nameArr] = branches[0].split('/')
                name = _nameArr.join('/')
            } else {
                sh.echo(
                    branches.length > 1
                        ? `查询到多条名称包含${type}的分支，请输入分支类型`
                        : red('分支不存在，请正确输入')
                )
                process.exit(1)
            }
        }
        const isRemoteBranchExist = getIsBranchOrCommitExist(
            `${type}/${name}`,
            true
        )
        if (allow.includes(type) && name) {
            const base: string = opt.asFeature
                ? config.release
                : type === 'bugfix'
                ? config.bugfix
                : config.release
            let cmd: Array<CommandType | string> = []
            // 是否需要合并dev
            const isNeedCombineDevelop = !getIsMergedTargetBranch(
                `${type}/${name}`,
                config.develop,
                true
            )
            // 是否需要合并base
            const isNeedCombineBase = !getIsMergedTargetBranch(
                `${type}/${name}`,
                base,
                true
            )
            // 是否需要合并bug
            const isNeedCombineBugfix = !getIsMergedTargetBranch(
                `${type}/${name}`,
                config.bugfix,
                true
            )
            if (opt.combine && isNeedCombineDevelop) {
                // 需要合并代码到dev
                cmd = [
                    'git fetch',
                    `git checkout ${config.develop}`,
                    'git pull',
                    {
                        cmd: `git merge --no-ff ${type}/${name}`,
                        config: {
                            again: false,
                            success: `${type}/${name}合并到${config.develop}成功`,
                            fail: `${type}/${name}合并到${config.develop}出错了，请根据提示处理`
                        }
                    },
                    {
                        cmd: 'git push',
                        config: {
                            again: true,
                            success: '推送成功',
                            fail: '推送失败，请根据提示处理'
                        }
                    },
                    `git checkout ${type}/${name}`
                ]
            }
            // support分支需要合到bugfix
            if (type === 'support' && opt.combine && isNeedCombineBugfix) {
                if (!level || level < 3) {
                    cmd = cmd.concat([
                        'git fetch',
                        `git checkout ${config.bugfix}`,
                        'git pull',
                        {
                            cmd: `git merge --no-ff ${type}/${name}`,
                            config: {
                                again: false,
                                success: `${type}/${name}合并到${config.bugfix}成功`,
                                fail: `${type}/${name}合并到${config.bugfix}出错了，请根据提示处理`
                            }
                        },
                        {
                            cmd: 'git push',
                            config: {
                                again: true,
                                success: '推送成功',
                                fail: '推送失败，请根据提示处理'
                            }
                        },
                        `git checkout ${type}/${name}`
                    ])
                } else {
                    if (!isDescriptionCorrect) {
                        sh.echo(red('提交的原因描述不符合规范'))
                        process.exit(1)
                    }
                    cmd = cmd.concat([
                        {
                            cmd: `git push --set-upstream origin ${type}/${name}`,
                            config: {
                                again: true,
                                success: '推送远程并关联远程分支成功',
                                fail: '推送远程失败，请根据提示处理'
                            }
                        },
                        {
                            cmd: {
                                module: mergeRequestModule,
                                entry: 'createMergeRequest',
                                options: {
                                    source_branch: `${type}/${name}`,
                                    target_branch: config.bugfix,
                                    token,
                                    description: opt.description
                                }
                            },
                            config: {
                                again: true,
                                success: '成功创建合并请求',
                                fail: '创建合并请求出错了，请根据提示处理'
                            }
                        },
                        `gitm postmsg "${nickname}在${appName}项目提交了${type}/${name}分支合并到${config.bugfix}分支的merge请求"`
                    ])
                }
            }
            if (!opt.combine || !isNeedCombineBase) {
                // 不合并代码
                cmd = cmd.concat([
                    `git checkout ${config.develop}`,
                    `git branch -D ${type}/${name}`,
                    {
                        cmd: 'git remote prune origin',
                        config: {
                            again: true,
                            success: '清理远程分支成功',
                            fail: '清理远程分支失败，请根据提示处理'
                        }
                    }
                ])
                // 判断远程是否存在分支
                if (isRemoteBranchExist) {
                    cmd = cmd.concat([
                        {
                            cmd: `git push origin --delete ${type}/${name}`,
                            config: {
                                again: true,
                                success: '成功删除远程分支',
                                fail: '删除失败，请联系管理员'
                            }
                        }
                    ])
                }
            } else {
                // 需要合并代码
                if (!level || level < 3) {
                    cmd = cmd.concat([
                        'git fetch',
                        `git checkout ${base}`,
                        'git pull',
                        {
                            cmd: `git merge --no-ff ${type}/${name}`,
                            config: {
                                again: false,
                                success: `${type}/${name}合并到${base}成功`,
                                fail: `${type}/${name}合并到${base}出错了，请根据提示处理`
                            }
                        },
                        {
                            cmd: 'git push',
                            config: {
                                again: true,
                                success: '推送成功',
                                fail: '推送失败，请根据提示处理'
                            }
                        },
                        `git checkout ${config.develop}`,
                        `git branch -D ${type}/${name}`,
                        {
                            cmd: 'git remote prune origin',
                            config: {
                                again: true,
                                success: '清理远程分支成功',
                                fail: '清理远程分支失败，请根据提示处理'
                            }
                        }
                    ])
                    // 判断远程是否存在分支
                    if (isRemoteBranchExist) {
                        cmd = cmd.concat([
                            {
                                cmd: `git push origin --delete ${type}/${name}`,
                                config: {
                                    again: true,
                                    success: '成功删除远程分支',
                                    fail: '删除失败，请联系管理员'
                                }
                            }
                        ])
                    }
                } else {
                    if (!isDescriptionCorrect) {
                        sh.echo(red('提交的原因描述不符合规范'))
                        process.exit(1)
                    }
                    cmd = cmd.concat([
                        {
                            cmd: `git push --set-upstream origin ${type}/${name}`,
                            config: {
                                again: true,
                                success: '推送远程并关联远程分支成功',
                                fail: '推送远程失败，请根据提示处理'
                            }
                        },
                        {
                            cmd: {
                                module: mergeRequestModule,
                                entry: 'createMergeRequest',
                                options: {
                                    source_branch: `${type}/${name}`,
                                    target_branch: base,
                                    token,
                                    description: opt.description
                                }
                            },
                            config: {
                                again: true,
                                success: '成功创建合并请求',
                                fail: '创建合并请求出错了，请根据提示处理'
                            }
                        },
                        `gitm postmsg "${nickname}在${appName}项目提交了${type}/${name}分支合并到${base}分支的merge请求"`
                    ])
                }
            }
            queue(cmd)
        } else {
            sh.echo(red('type只允许输入：' + JSON.stringify(allow)))
            process.exit(1)
        }
    }
)
program.parse(process.argv)
export {}
