/**
 * 延迟执行
 *
 * @param millisecond - 毫秒
 * @returns {String} 返回字符串
 */
function delay(millisecond = 0): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, millisecond)
    })
}

export default delay
