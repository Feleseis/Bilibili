/**
 * 生成视频
 * @param  {json} data      视频相关数据
 * @param  {string} key       json key
 * @param  {string} valueName key描述
 * @param  {string} domStr    dom选择字符串
 * @return {null}           null
 */
function showVideo(data, key, valueName, domStr) {
    data.slice(0, 20).map((item) => {
        let html =
        `
        <div class="content-item-v">
        <figure>
        <a href="http://www.bilibili.com/video/av${item['aid']}" target="_blank"><img src=${item['pic']} title=${item['title']}></a>
        </figure>
        <div class="description">
        <span>${item['title']}</span>
        <br>
        <span>AV号: ${item['aid']}</span>
        <br>
        <span>${valueName}: ${item[key]}</span>
        </div>
        </div>
        `;
        document.querySelector(domStr).innerHTML += html;
    });
}

window.onload = () => {
    (() => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:4000/ajax?type=ranking', true);
        xhr.send(null);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const worldUser = [];
                const worldVidoe = [];
                //转换为jqcloud wold要求格式
                data['top']['fans'].map((item) => {
                    worldUser.push({
                        text : item['name'],
                        weight : Number.parseFloat((Math.random() * 15 + 10).toFixed(1))
                    });
                });
                $('#words-cloud-users').jQCloud(worldUser);

                //top fans
                const maxValue = data['max'];
                data['top']['fans'].slice(0, 5).map((item) => {
                    const ratioFans = Math.floor(item['fans'] / maxValue['fans'] * 100 * 0.8);
                    const ratioPlayNum = Math.floor(item['playNum'] / maxValue['playNum'] * 100 * 0.8);
                    const ratioExp = Math.floor(item['current_exp'] / maxValue['current_exp'] * 100 * 0.8);
                    const ratioSubmit = Math.floor(item['submit'] / maxValue['submit'] * 100 * 0.8);

                    let html =
                    `
                    <div class="content-item">
                        <figure>
                            <a href="http://space.bilibili.com/${item['mid']}" target="_blank"><img src= ${item['face']}></a>
                            <figcaption>${item['name']}</figcaption>
                        </figure>
                        <div class="exp">
                            <div class="progress">
                                <i class="fa fa-user-plus"></i>
                                <div class="progress-bar" title="粉丝" style="width: ${ratioFans}%; background-color: rgba(128, 221, 23, 0.3);"></div>
                                <label>${item['fans']}</label>
                            </div>
                            <div class="progress">
                                <i class="fa fa-play"></i>
                                <div class="progress-bar" title="播放" style="width: ${ratioPlayNum}%;  background-color: rgba(232, 39, 219, 0.3);"></div>
                                <label>${item['playNum']}</label>
                            </div>
                            <div class="progress">
                                <i class="fa fa-check" aria-hidden="true"></i>
                                <div class="progress-bar" title="经验" style="width: ${ratioExp}%;  background-color: rgba(247, 148, 57, 0.3);"></div>
                                <label>${item['current_exp']}</label>
                            </div>
                            <div class="progress">
                                <i class="fa fa-youtube-play"></i>
                                <div class="progress-bar" title="视频投稿" style="width: ${ratioSubmit}%;  background-color: rgba(38, 240, 252, 0.3);"></div>
                                <label>${item['submit']}</label>
                            </div>
                        </div>
                    </div>
                    `;
                    document.querySelector('#top-fans').innerHTML += html;
                });

                //video
                showVideo(data['top']['play'], 'play', '播放:', '#top-play');
                showVideo(data['top']['favorites'], 'favorites', '收藏:', '#top-favorites');
                showVideo(data['top']['coin'], 'coin', '硬币:', '#top-coin');
                showVideo(data['top']['danmaku'], 'danmaku', '弹幕:', '#top-danmaku');
                showVideo(data['top']['comment'], 'comment', '留言:', '#top-comment');
                showVideo(data['top']['share'], 'share', '分享:', '#top-share');

            }
        };
    })();
};
