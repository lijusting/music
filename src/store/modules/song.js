
const song = {
    namespaced: true,
    state: {
        //当前播放歌曲在歌单列表里的下标
        currentIndex: -1,
        // 当前播放时长
        currentTime: 0,
        //歌曲总时长
        totalTime: 0,
        // 播放状态
        playing: false,
        //歌单
        songlist: [],
        mode: 'sequence',
        lyc: "",

    },
    mutations: {
        //设置歌词
        setLyc(state, payload) {
            state.lyc = payload;
        },
        //设置歌曲播放状态
        toSwitch(state) {
            state.playing = !state.playing
        },
        ///////////////////////////////////////////////////////////
        // 播放下一首
        playNext(state) {
            if (state.mode === 'sequence') {
                // 顺序播放
                state.currentIndex = (state.currentIndex + 1) % state.songlist.length;
            } else if (state.mode === 'random') {
                // 随机播放
                state.currentIndex = Math.floor(Math.random() * state.songlist.length);
            }
        },
        // 播放上一首
        playPrev(state) {
            if (state.mode === 'sequence') {
                // 顺序播放
                state.currentIndex = (state.currentIndex - 1 + state.songlist.length) % state.playlist.length;
            } else if (state.mode === 'random') {
                // 随机播放
                state.currentIndex = Math.floor(Math.random() * state.songlist.length);
            }
        },
        //切换播放模式
        toggleMode(state) {
            if (state.mode === 'sequence') {
                state.mode = 'random';
            } else {
                state.mode = 'sequence';
            }
        },
        //设置歌曲列表
        setSonglist(state, arr) {
            state.songlist = arr;
        },
        //设置当前播放歌曲的索引
        setCurrentIndex(state, index) {
            state.currentIndex = index;
        },

        //设置歌曲播放进度
        setCurrentTime(state, payload) {
            state.currentTime = payload
        },
        //设置歌曲时长
        setTotalTime(state, payload) {
            state.totalTime = payload
        },

    },
    actions: {
        //设置歌词
        setLyc(context, payload) {
            context.commit('setLyc', payload);
        },
        //设置歌曲总时长
        setTotalTime(context, payload) {
            context.commit('setTotaltime', payload);
        },
        //设置歌曲播放进度
        setCurrentTime(context, payload) {
            context.commit('setCurrentTime', payload);
        },
        // 切换播放模式
        toggleMode(context) {
            context.commit('toggleMode');
        },
        // 播放下一首

        playNext(context) {
            context.commit('playNext');
        },
        // 播放上一首
        playPrev({ context }) {
            context.commit('playPrev');
        },
        // 播放指定索引的音乐
        setSonglist(context, arr) {
            context.commit('setSonglist', arr)
        },
        setCurrentIndex(context, index) {
            context.commit('setCurrentIndex', index)
        },
        // ////////////////////////////////////////////////////////////


        //设置歌曲播放状态
        toSwitch(context) {
            context.commit('toSwitch');
        }
    },
}


export default song;