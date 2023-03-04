export function debounce(func, delay = 1000, immediate = false) {
    let timer = null
    //不能用箭头函数
    return function () {
        //在时间内重复调用的时候需要清空之前的定时任务
        if (timer) {
            clearTimeout(timer)
        }
        //适用于首次需要立刻执行的
        if (immediate && !timer) {
            func.apply(this, arguments)
        }
        timer = setTimeout(() => {
            func.apply(this, arguments)
        }, delay)
    }
}