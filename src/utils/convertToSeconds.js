export function convertToSeconds(timeString) {
    const timeArray = timeString.split(":"); // 将时间字符串以 ":" 分割成数组
    const seconds = timeArray.reduce((acc, timePart, index) => {
        // 将每个时间部分转换为秒
        let timeInSeconds = parseInt(timePart);
        if (index === 0) {
            timeInSeconds *= 3600; // 将小时转换为秒
        } else if (index === 1) {
            timeInSeconds *= 60; // 将分钟转换为秒
        }
        return acc + timeInSeconds; // 累加每个时间部分的秒数
    }, 0);
    return seconds;
}


