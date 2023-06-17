if (localStorage.getItem('mkey'))
    $('#key').val(localStorage.getItem('mkey'))
$('#key').change((e) => {
    console.log(e);
    localStorage.setItem('mkey', $(e.currentTarget).val())
})
$('#key').focus((e) => {
    $(e.currentTarget).select()
})
/**
 * 渲染音乐列表
 * @param {*} data 
 */
function renderMusicList(data) {
    let html = '';
    data.forEach((song) => {
        html += `
      <div class="music">
        <p>Song: ${song.name}</p>
        <audio src="${song.url}" controls></audio>
      </div>
    `;
    });
    //return html
    $("#result").show()
    document.getElementById('result').innerHTML = html;
    initAudio()
}
/**
 * 初始化音乐播放
 * @param {*} data 
 */
var nowPlayAudioIndex = 0
function initAudio() {
    $('audio').each((i, e) => {
        $(e).on('play', (e) => {
            if ($('audio')[nowPlayAudioIndex] && $('audio')[nowPlayAudioIndex] != e.currentTarget)
                $('audio')[nowPlayAudioIndex].pause()
            nowPlayAudioIndex = i


        })

        $(e).on('ended', () => {
            nowPlayAudioIndex++
            if (!$('audio')[nowPlayAudioIndex])
                nowPlayAudioIndex = 0

            $('audio')[nowPlayAudioIndex].play()
        })
    })
    $('audio')[0].play()
}


/**
 * 获取实时的未来24小时天气数据
 * @param {*} data 
 */
function getWeatherForecast(data, title) {
    let r = document.createElement('div');
    r.innerHTML = "<h4>未来24小时</h4>"
    r.className = 'hourList'
    for (var hour in data) {
        let weather = data[hour];
        let degree = weather.degree + '℃';
        let time = weather.update_time.slice(-6, -4) + ':' + weather.update_time.slice(-4, -2);
        let imgSrc = 'https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/' + weather.weather_code + '.png';
        let info = weather.weather_short + ' | ' + weather.wind_direction + weather.wind_power + '级';

        let div = document.createElement('div');
        div.className = 'weather2';
        div.innerHTML = `
                <img src="${imgSrc}" alt="${weather.weather}">
                <div class="weather2-info">
                    <p>${degree}</p>
                    <p>${time}</p>
                    <p>${info}</p>
                </div>
                `;

        r.append(div)
    }
    return r
}
/**
 * 获取实时的当前天气数据，并存入到一个dom中
 * @param {*} data 
 */
function generateWeatherHTML(data) {
    var container = document.createElement('div'); container.className = 'container2'; var pubTime = document.createElement('p'); pubTime.id = 'txt-pub-time'; pubTime.innerText = '中央气象台' + data.update_time.slice(8, -2) + '发布'; container.appendChild(pubTime); var main = document.createElement('div'); main.id = 'ct-main'; container.appendChild(main); var temperature = document.createElement('p'); temperature.id = 'txt-temperature'; temperature.innerText = data.degree + '°'; main.appendChild(temperature); var name = document.createElement('p'); name.id = 'txt-name'; name.innerText = data.weather; main.appendChild(name); var aqi = document.createElement('div'); aqi.id = 'ct-aqi'; aqi.className = 'air-level1'; var infoAqi = document.createElement('p'); infoAqi.className = 'info-aqi'; infoAqi.innerText = data.weather_code + ' 优'; var airWindow = document.createElement('div'); airWindow.className = 'popwindow'; airWindow.id = 'air-window'; var header = document.createElement('div'); header.className = 'header'; header.innerText = '空气质量指数 ' + data.weather_code + ' 优'; var detail = document.createElement('div'); detail.className = 'detail'; var inner = document.createElement('div'); inner.className = 'inner'; var table = document.createElement('table'); table.id = 'tb-detail'; var tbody = document.createElement('tbody'); var tr1 = document.createElement('tr'); tr1.className = 'line1'; var td1 = document.createElement('td'); var val1 = document.createElement('p'); val1.className = 'val'; val1.innerText = '21'; var titl1 = document.createElement('p'); titl1.className = 'titl'; titl1.innerText = 'PM2.5'; td1.appendChild(val1); td1.appendChild(titl1); var td2 = document.createElement('td'); td2.className = 'nth-2'; var val2 = document.createElement('p'); val2.className = 'val'; val2.innerText = '31'; var titl2 = document.createElement('p'); titl2.className = 'titl'; titl2.innerText = 'PM10'; td2.appendChild(val2); td2.appendChild(titl2); var td3 = document.createElement('td'); var val3 = document.createElement('p'); val3.className = 'val'; val3.innerText = '5'; var titl3 = document.createElement('p'); titl3.className = 'titl'; titl3.innerText = 'SO2'; td3.appendChild(val3); td3.appendChild(titl3); tr1.appendChild(td1); tr1.appendChild(td2); tr1.appendChild(td3); var tr2 = document.createElement('tr'); var td4 = document.createElement('td'); var val4 = document.createElement('p'); val4.className = 'val'; val4.innerText = '12'; var titl4 = document.createElement('p'); titl4.className = 'titl'; titl4.innerText = 'NO2'; td4.appendChild(val4); td4.appendChild(titl4); var td5 = document.createElement('td'); td5.className = 'nth-2'; var val5 = document.createElement('p'); val5.className = 'val'; val5.innerText = '114'; var titl5 = document.createElement('p'); titl5.className = 'titl'; titl5.innerText = 'O3'; td5.appendChild(val5); td5.appendChild(titl5); var td6 = document.createElement('td'); var val6 = document.createElement('p'); val6.className = 'val'; val6.innerText = '0'; var titl6 = document.createElement('p'); titl6.className = 'titl'; titl6.innerText = 'CO'; td6.appendChild(val6); td6.appendChild(titl6); tr2.appendChild(td4); tr2.appendChild(td5); tr2.appendChild(td6); tbody.appendChild(tr1); tbody.appendChild(tr2); table.appendChild(tbody); inner.appendChild(table); detail.appendChild(inner); airWindow.appendChild(header); airWindow.appendChild(detail); aqi.appendChild(infoAqi); aqi.appendChild(airWindow); main.appendChild(aqi); var warning = document.createElement('ul'); warning.id = 'ls-warning'; main.appendChild(warning); var other = document.createElement('div'); other.id = 'ct-other'; container.appendChild(other); var itemWind = document.createElement('p'); itemWind.className = 'item'; var iconWind = document.createElement('i'); iconWind.className = 'icon wind-' + data.wind_direction; iconWind.id = 'icon-wind'; var txtWind = document.createElement('span'); txtWind.className = 'txt'; txtWind.id = 'txt-wind'; txtWind.innerText = data.wind_direction + '级'; itemWind.appendChild(iconWind); itemWind.appendChild(txtWind); other.appendChild(itemWind); var itemHumidity = document.createElement('p'); itemHumidity.className = 'item'; var iconHumidity = document.createElement('i'); iconHumidity.className = 'icon'; iconHumidity.id = 'icon-humidity'; var txtHumidity = document.createElement('span'); txtHumidity.className = 'txt'; txtHumidity.id = 'txt-humidity'; txtHumidity.innerText = '湿度 ' + data.humidity + '%'; itemHumidity.appendChild(iconHumidity); itemHumidity.appendChild(txtHumidity); other.appendChild(itemHumidity); var itemKpa = document.createElement('p'); itemKpa.className = 'item'; var iconKpa = document.createElement('i'); iconKpa.className = 'icon'; iconKpa.id = 'icon-kPa'; var txtKpa = document.createElement('span'); txtKpa.className = 'txt'; txtKpa.id = 'txt-kPa'; txtKpa.innerText = '气压 ' + data.pressure + 'hPa'; itemKpa.appendChild(iconKpa); itemKpa.appendChild(txtKpa); other.appendChild(itemKpa); var infoLimit = document.createElement('p'); infoLimit.className = 'item'; infoLimit.id = 'info-limit'; var iconLimit = document.createElement('i'); iconLimit.className = 'icon'; iconLimit.id = 'icon-limit'; var txtLimit = document.createElement('span'); txtLimit.className = 'txt'; txtLimit.id = 'txt-limit'; txtLimit.innerText = ''; infoLimit.appendChild(iconLimit); infoLimit.appendChild(txtLimit); other.appendChild(infoLimit); var tips = document.createElement('div'); tips.id = 'ct-tips'; container.appendChild(tips); var txtTips = document.createElement('p'); txtTips.id = 'txt-tips'; txtTips.innerText = '现在的温度比较舒适~'; tips.appendChild(txtTips); var btnTipSwitch = document.createElement('a'); btnTipSwitch.href = 'javascript:;'; btnTipSwitch.id = 'btn-tip-switch'; tips.appendChild(btnTipSwitch); var currentWeather = document.createElement('div'); currentWeather.id = 'ct-current-weather'; container.appendChild(currentWeather); var iconWeather = document.createElement('img'); iconWeather.className = 'icon'; iconWeather.src = '//mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/currentweather/day/' + data.weather_code + '.png'; currentWeather.appendChild(iconWeather); return container;
}
/**
 * 搜索网易云音乐API数据
 * @param {*} data 
 */
function searchMusic(op) {
    if (typeof op == 'string')
        op = JSON.parse(op)
    $("#resultNo").show()
    $.ajax({
        url: 'https://aiquickhelp.com/lifeSmart.php?command=打开音乐&para=' + op.value,
        success(e) {
            e = JSON.parse(e)
            $("#resultNo").hide()
            renderMusicList(e.urls);

        }
    })
}
/**
 * 构造微博搜索iframe
 * @param {*} data 
 */
function searchWeibo(op) {
    if (typeof op == 'string')
        op = JSON.parse(op)
    var iframe = document.createElement("iframe")
    iframe.className = "weiboFrame"
    iframe.src = 'https://s.weibo.com/weibo?q=' + op.value

    var h = document.createElement("div")
    h.className = "weiboWrap"
    h.append(iframe)
    $("#result").append(h)
    $("#result").show()
    $("#resultNo").show()
    iframe.addEventListener('load', () => {
        $("#resultNo").hide()
    })

}
/**
 * 构造gitHub搜索
 * @param {*} data 
 */
function searchGithub(op) {
    if (typeof op == 'string')
        op = JSON.parse(op)
    var act = function (q, p) {
        var src = 'https://aiquickhelp.com/gptFun/getGitHub.php?q=' + q + (p ? ('&p=' + p) : '')

        $.ajax({
            url: src,
            success(e) {
                var h = document.createElement("div")
                h.innerHTML = e
                var d = $(h).find('[data-hpc]')
                d.find('.repo-list a,details a').click((e) => {
                    e.preventDefault()
                    open(e.currentTarget.href.replace('https://aiquickhelp.com/', 'https://github.com/'))
                })
                d.find('.paginate-container a').click((e) => {
                    e.preventDefault()
                    $("#result")[0].innerHTML = ''

                    const regex = /[\?&]p=([^&#]*)/.exec(e.currentTarget.href);
                    const page = regex === null ? "" : regex[1];
                    act(q, page)
                })
                $("#result").append(d)
                $("#result").show()
                $("#resultNo").hide()
            }
        })
    }

    act(op.value, op.page)





}
/**
 * 按省市搜索天气
 * @param {*} data 
 */
function searchWheather(op) {
    if (typeof op == 'string')
        op = JSON.parse(op)
    $("#resultNo").show()
    $.ajax({
        url: 'https://aiquickhelp.com/gptFun/getWeather.php?city=' + (op.city || '深圳') + (op.province ? ('&province=' + op.province) : ''),
        success(e) {
            e = JSON.parse(e)
            console.log(e);
            var hasSet = false
            for (let index = 0; index < e.length; index++) {
                const element = e[index];
                if (!element.observe || element.observe.length == 0)
                    continue
                var d = element.forecast_1h
                var ht = $("<h4>" + element.province + ',' + element.city + (element.county ? (',' + element.county) : '') + "</h4>")
                var h = getWeatherForecast(d)
                //var h = generateWeatherList(d)
                var h0 = document.createElement('div')
                h0.className = "now"
                h0.append(generateWeatherHTML(element.observe))
                $("#result").append(ht)
                $("#result").append(h0)
                $("#result").append(h)
                //$("#result").append(h2)
                $("#resultNo").hide()
                $("#result").show()
                hasSet = true
            }
            if (!hasSet) {
                $("#result").append('你问题中表达的地区名有误')
                $("#resultNo").hide()
                $("#result").show()
            }

        }
    })
}

$('form').on('submit', (e) => {
    e.preventDefault();
    var v = $('.search').val()
    console.log(v);
    $("#resultNo").show()
    $("#result").hide()
    $('#plug').hide()
    $("#result")[0].innerHTML = ''
    $.ajax({
        url: 'https://api.openai.com/v1/chat/completions',
        dataType: 'json',
        method: "post",
        headers: {
            'Authorization': 'Bearer ' + $('#key').val(),
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            model: 'gpt-3.5-turbo-16k-0613',
            messages: [
                {
                    "role": "system",
                    "content": "你是个说中文的智能助理"
                },
                {
                    "role": "user",
                    "content": v
                }
            ],
            functions: [
                {
                    "name": "searchMusic",
                    "description": "通过用户给出的英文关键字，搜索相关音乐",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "value": {
                                "type": "string",
                                "default": "快乐",
                                "description": "分析用户输入的文本，得出用于搜索音乐的关键字",
                            },
                        },
                        "required": ["value"],
                    },
                },
                {
                    "name": "searchWheather",
                    "description": "通过传递地区名，返回天气数据",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "city": {
                                "type": "string",
                                "default": "深圳",
                                "description": "城市关键字，如果没法得到城市关键字，默认为“深圳”",
                            },
                            "province": {
                                "type": "string",
                                "default": "广东",
                                "description": "省份关键字，如果没法得到省份关键字，默认为“广东”",
                            },
                        },
                        "required": ["city"],
                    },
                },
                {
                    "name": "searchWeibo",
                    "description": "通过用户给出的搜索关键字，返回微博平台的热门搜索结果",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "value": {
                                "type": "string",
                                "default": "热门",
                                "description": "分析用户输入的文本，得出微博搜索关键字",
                            },
                        },
                        "required": ["value"],
                    },
                },
                {
                    "name": "searchGithub",
                    "description": "通过用户给出的搜索关键字，返回gitHub上搜索结果",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "value": {
                                "type": "string",
                                "default": "newest",
                                "description": "分析用户输入的文本是否跟技术或代码有关，得出相关搜索关键字",
                            },
                            "page": {
                                "type": "number",
                                "default": 1,
                                "description": "当前搜索结果属于第几页",
                            },
                        },
                        "required": ["value"],
                    },
                }
            ]
        }),
        success: function (data) {
            console.log(data);
            if (data.choices[0].message && data.choices[0].message.function_call) {
                var f = data.choices[0].message.function_call
                console.log(f.name + '(' + f.arguments + ')');
                $('#plug').text('调用第三方方法：' + f.name + ',传递参数：' + f.arguments)
                $('#plug').show()
                eval(f.name + '(' + f.arguments + ')')
            } else {
                $("#result").show()
                $("#resultNo").hide()

                document.getElementById('result').innerHTML = data.choices[0].message.content;
            }
        },
        error: function (xhr, status, error) {
            // AJAX 请求失败后的处理函数
            $("#result").append('发生GPT请求错误，请检查你的APKEY是否有效或重试一下。')
            $("#resultNo").hide()
            $("#result").show()
        }
    });
})