import { formatLyricTime } from "../utils/formatLyricTime.js";
export function formatLyric(lyricsObjArr) {
    let newLyricsObjArr = [];
    const regNewLine = /\n/;
    const lineArr = lyricsObjArr.split(regNewLine); // 每行歌词的数组
    console.log(lineArr);

    const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/;

    lineArr.forEach((item) => {
        if (item === "") return;
        const obj = {};
        const time = item.match(regTime);

        obj.lyric =
            item.split("]")[1].trim() === "" ? "" : item.split("]")[1].trim();
        obj.time = time
            ? formatLyricTime(time[0].slice(1, time[0].length - 1))
            : 0;
        obj.uid = Math.random().toString().slice(-6);
        if (obj.lyric === "") {
            console.log("这一行没有歌词");
        } else {
            newLyricsObjArr.push(obj);
        }
    });
    console.log(lyricsObjArr);
    return newLyricsObjArr;
} 