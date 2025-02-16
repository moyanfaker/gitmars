import type { Socket } from 'socket.io'
const getCurrentBranch = require('@gitmars/core/lib/git/getCurrentBranch')
const searchBranches = require('@gitmars/core/lib/git/searchBranches')
const home = require('../utils/home')

const homeDir = home()

interface SocketOption {
    name: string
    cwd: string
}

let glob = {},
    config = {},
    branch: string[] = [],
    current = '',
    interval: any = null

/**
 * getData
 *
 * @param {Socket} socket
 * @param {*} option 参数
 */
const getData = (socket: Socket, option: SocketOption) => {
    delete require.cache[require.resolve('@gitmars/core/lib/global')]
    delete require.cache[require.resolve('@gitmars/core/lib/getConfig')]
    const g = require('@gitmars/core/lib/global')
    const c = require('@gitmars/core/lib/getConfig')()
    const bh = searchBranches({ path: option.cwd || homeDir })
    const cur = getCurrentBranch()
    if (!glob || JSON.stringify(glob) !== JSON.stringify(g)) {
        glob = g
        socket.emit(option.name + '-global', g)
    }
    if (!config || JSON.stringify(config) !== JSON.stringify(c)) {
        config = c
        socket.emit(option.name + '-config', c)
    }
    if (!branch || branch.join() !== bh.join()) {
        branch = bh
        socket.emit(option.name + '-branch', bh)
    }
    if (!current || current !== cur) {
        current = cur
        socket.emit(option.name + '-current', cur)
    }
}

module.exports = (socket: Socket) => {
    socket.on('create', option => {
        process.chdir(option.cwd || homeDir)
        getData(socket, option)

        if (!interval) {
            interval = setInterval(() => getData(socket, option), 2000)
        }
    })
    socket.on('remove', name => {
        glob = {}
        config = {}
        branch = []
        current = ''
        interval && interval.unref()
        clearInterval(interval)
        interval = null
        socket.removeAllListeners(name + '-global')
        socket.removeAllListeners(name + '-config')
        socket.removeAllListeners(name + '-branch')
        socket.removeAllListeners(name + '-current')
    })
}
export {}
