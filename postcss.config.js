module.exports = {
    "plugins": {
        "postcss-pxtorem": {
            rootValue: 20, //换算基数，将多少px转成1单位rem 
            unitPrecision: 3, //允许REM单位增长到的十进制数字,小数点后保留的位数。
            propList: ['*'],
            exclude: false, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
            minPixelValue: 1 //设置要替换的最小像素值
        },
    }
}

