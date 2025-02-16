import getIsGitProject from './getIsGitProject'
import searchBranches from './searchBranches'
import getCurrentBranch from './getCurrentBranch'
import getGitLogs from './getGitLogs'
import getGitLogsByCommitIDs from './getGitLogsByCommitIDs'
import getGitVersion from './getGitVersion'
import getGitConfig from './getGitConfig'
import getGitRevParse from './getGitRevParse'
import getAheadLogs from './getAheadLogs'
import getBehindLogs from './getBehindLogs'
import getIsBranchOrCommitExist from './getIsBranchOrCommitExist'
import getIsMergeAction from './getIsMergeAction'
import getIsMergedTargetBranch from './getIsMergedTargetBranch'
import getIsUpdatedInTime from './getIsUpdatedInTime'
import { getGitEmail, getGitUser } from './getGitUser'
import getBranchesFromID from './getBranchesFromID'
import getGitStatus from './getGitStatus'
import getCommandMessage from './getCommandMessage'
import checkGitStatus from './checkGitStatus'
import getStashList from './getStashList'

export default {
    getIsGitProject,
    searchBranches,
    getCurrentBranch,
    getGitLogs,
    getGitLogsByCommitIDs,
    getGitVersion,
    getGitConfig,
    getGitRevParse,
    getAheadLogs,
    getBehindLogs,
    getIsBranchOrCommitExist,
    getIsMergeAction,
    getIsMergedTargetBranch,
    getIsUpdatedInTime,
    getGitUser,
    getGitEmail,
    getBranchesFromID,
    getGitStatus,
    getCommandMessage,
    checkGitStatus,
    getStashList
}
