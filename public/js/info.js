$(document).ready( function () {
    //获取json数据后生成up主列表后 生成初始的视频列表
    $.get('/ajax?type=uplist', function (data, status) {
        let html = '';
        data['uplist'].map((item) => {
            html +=`
            <tr>
                <th><img src="./images/noface.gif"}></th>
                <th data-mid="${item['mid']}">${item['name']}</th>
            </tr>
            `;
        });
        $('#table-list').append(html);
        $('#up-list').DataTable({
            "searching": false,
            "info": false,
            "lengthChange": false,
            "aLengthMenu": [25],
            "ordering": false,
            "pagingType": "numbers"
        });
        showTable(2);
    });

    //为up主列表添加点击事件 获取up主id后生成视频列表表格
    $('#up-list').click(function (e) {
        let mid = e.target.dataset['mid'];
        if (mid) {
            showTable(mid);
        }
    });
});


/**
 * 根据数据生成视频表格
 * @param  {int} mid up主id
 * @return {null}     null
 */
function showTable(mid) {
    $.get(`/ajax?type=user&mid=${mid}`, function (data, status) {
        // up基本信息
        let htmlUser = `
        <li><label>用户 :</label><span style="color:${randomColor()};">${data['user']['name']}</span></li>
        <li><label>粉丝 :</label><span style="color:${randomColor()};">${data['user']['fans']}</span></li>
        <li><label>播放 :</label><span style="color:${randomColor()};">${data['user']['playNum']}</span></li>
        <li><label>投稿 :</label><span style="color:${randomColor()};">${data['user']['submit']}</span></li>
        <li><label>经验 :</label><span style="color:${randomColor()};">${data['user']['current_exp']}</span></li>
        `;
        $('#user').empty().append(htmlUser);

        //投稿分布
        let htmlTlist = '';
        data['user']['tlist'].map((item) => {
            const percent = Math.round(Number.parseInt(item['count'])/Number.parseInt(data['user']['submit'])*10000)/100;
            htmlTlist += `<li><label>${item['name']} :</label><span style="color:${randomColor()};">${item['count']}(${percent}%)</span></li>`
        });
        $('#tlist').empty().append(htmlTlist);

        //视频列表
        let htmlVlist = '';
        data['video'].map((item) => {
            htmlVlist += `
            <tr>
            <th><a href="http://www.bilibili.com/video/av${item['aid']}" target="_blank">${item['title']}</a></th>
            <th>${item['play']}</th>
            <th>${item['coin']}</th>
            <th>${item['danmaku']}</th>
            <th>${item['favorites']}</th>
            <th>${item['share']}</th>
            </tr>
            `;
        });
        $('#table').empty().append(`
            <table id="videolist" class="display">
            <thead>
            <tr>
            <th>标题</th>
            <th>播放</th>
            <th>硬币</th>
            <th>弹幕</th>
            <th>收藏</th>
            <th>分享</th>
            </tr>
            </thead>
            <tbody id="video-table">${htmlVlist}</tbody>
            </table>
            `);

            $('#videolist').DataTable({
                'searching': false,
                "columnDefs": [
                    { "orderable": false, "targets": 0 }
                ],
                "aLengthMenu": [ 20, 50, 100 ],
                "info": false,
                "pagingType": "full_numbers"
            });
        });
}

/**
 * 随机颜色
 * @return {string} 颜色HEX
 */
function randomColor() {
    const colors = [
        '#81C2D6',
        '#8192D6',
        '#D9B3E6',
        '#DCF7A1',
        '#83FCD8',
        '#61FF69',
        '#B8F788',
        '#58D2E8',
        '#F2B6B6',
        '#E8ED51',
        '#FFE3C5',
        '#FFCEA6',
        '#6E6585',
        '#826762',
        '#F7DF83',
        '#F7B983',
        '#F79383',
        '#7774B7',
        '#595485',
        '#A5EAFF',
        '#BEFFF8',
        '#9EC4F6',
        '#E1DCFC',
        '#D2C0F9'
    ];
    return colors[Math.round(Math.random()*colors.length)];
}
