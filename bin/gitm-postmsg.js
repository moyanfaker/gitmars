#!/usr/bin/env node
const program = require('commander')
const { options, args } = require('./conf/postmsg')
const sendGroupMessage = require('./js/sendGroupMessage')
const { createArgs } = require('./js/tools')
/**
 * gitm postmsg
 */
program.name('gitm postmsg').usage('[message]').description('发送群消息消息')
if (args.length > 0) program.arguments(createArgs(args))
options.forEach(o => {
    program.option(o.flags, o.description, o.defaultValue)
})
program.action(message => {
	sendGroupMessage(message)
})
program.parse(process.argv)
