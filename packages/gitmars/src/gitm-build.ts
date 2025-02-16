#!/usr/bin/env ts-node
import type { GitmarsOptionOptionsType } from '../typings'
const { program } = require('commander')
const { createArgs } = require('@gitmars/core/lib/utils/command')
const runJenkins = require('@gitmars/core/lib/build/runJenkins')
const { options, args } = require('./conf/build')

interface GitmBuildOption {
    env?: string
    app?: string
}
/**
 * gitm build
 */
program
    .name('gitm build')
    .usage('<project> [-e --env [env]] [-a --app [app]]')
    .description('构建Jenkins')
if (args.length > 0) program.arguments(createArgs(args))
options.forEach((o: GitmarsOptionOptionsType) => {
    program.option(o.flags, o.description, o.defaultValue)
})
// .option('-e, --env [env]', '需要构建的环境，可选dev、prod、bug、all', 'dev')
// .option('-a, --app [app]', '需要构建的应用', 'all')
program.action((project: string, opt: GitmBuildOption): void => {
    runJenkins({
        env: opt.env,
        project,
        app: opt.app
    })
})
program.parse(process.argv)
export {}
