/*
 * @Author: xuxueliang
 * @Date: 2019-08-15 10:49:28
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-08-15 11:34:43
 */

let Koa = require('koa');
let app = new Koa();
let static = require('koa-static');

let data = [{
    name: 'yaowen',
    type: 'jinri',
    content: [{
        title: '讲真，谁没有逃过课1',
        pic: '../images/2.jpg',
        source: '网易上流',
        pubtime: '1小时前',
        reply: '387跟贴'
    }, {
        title: '讲真，谁没有逃过课1',
        pic: '../images/2.jpg',
        source: '网易上流',
        pubtime: '1小时前',
        reply: '387跟贴'
    }, {
        title: '讲真，谁没有逃过课1',
        pic: '../images/3.jpg',
        source: '网易上流',
        pubtime: '1小时前',
        reply: '387跟贴'
    }],
},
{
    name: 'yaowen',
    type: 'tiyu',
    content: [{
        title: '体育1',
        pic: '../images/2.jpg',
        source: '网易上流',
        pubtime: '1小时前',
        reply: '387跟贴'
    }, {
        title: '体育21',
        pic: '../images/2.jpg',
        source: '网易上流',
        pubtime: '1小时前',
        reply: '387跟贴'
    }, {
        title: '讲真，谁没有逃过课1',
        pic: '../images/3.jpg',
        source: '网易上流',
        pubtime: '1小时前',
        reply: '387跟贴'
    }]
},
{
    name: 'tuijian',
    content: [{
        title: '推荐1',
        pic: '../images/2.jpg',
        source: '网易上流',
        pubtime: '1小时前',
        reply: '387跟贴'
    }, {
        title: '推荐2',
        pic: '../images/2.jpg',
        source: '网易上流',
        pubtime: '1小时前',
        reply: '387跟贴'
    }]
},
{
    name: 'yuanchuang',
    content: [{
        title: '原创1',
        pic: '../images/2.jpg',
        source: '网易上流',
        pubtime: '1小时前',
        reply: '387跟贴'
    }, {
        title: '原创2',
        pic: '../images/2.jpg',
        source: '网易上流',
        pubtime: '1小时前',
        reply: '387跟贴'
    }]
}
];
app.use(static(__dirname));
app.use(async (ctx, next) => {
    if (ctx.path == '/getData') {
        let name = ctx.query.name;
        let curData = data.filter(m => m.name == name);
        ctx.body = curData;
    }
    await next();
})
app.listen(3006);