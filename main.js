var users = [];
var data = [];

var index = 1;
var status = '';
var buttonDown = document.querySelector('button[data-e2e="arrow-right"]');
var time = 30000;

console.clear();

class main {
    constructor() {
        var usersData = localStorage.getItem("tik-tok-users");
        var mainData = localStorage.getItem("tik-tok-data");
        if(usersData != null && mainData != null) {
            this.get();
        } else {
            this.set();
        }
        console.log(`%cTikTok BruteForce by @satosempai is running\nПодписок за всё время: ${users.length}\nЗадержка: ${time/ 1000}c. (рекомендуется 30с.) \nДата: ${new Date().toLocaleString("ru")}`, 'color: yellow;');
    }

    set() {
        localStorage.setItem("tik-tok-data", JSON.stringify(data));
        localStorage.setItem("tik-tok-users", JSON.stringify(users));
    }
    
    get() {
        data = JSON.parse(localStorage.getItem("tik-tok-data"));
        users = JSON.parse(localStorage.getItem("tik-tok-users"));
        // index = users.length;
    }
    
    start() {
        var subBtns = document.querySelector('button[data-e2e="browse-follow"]');
        var usersName = document.querySelector('span[data-e2e="browse-username"]');
        var userNickName = document.querySelector('span[data-e2e="browser-nickname"]').innerText.split('\n')[0];
        var createdAt = document.querySelector('span[data-e2e="browser-nickname"]').innerText.split('\n')[2];
        var sound = document.querySelector('h4[data-e2e="browse-music"]').innerText.split('-')[1].trim();
        var likes = document.querySelector('strong[data-e2e="browse-like-count"]').innerText;
        var link = document.querySelector('p[data-e2e="browse-video-link"]').innerText.replace('\n','');
        var comments = document.querySelector('strong[data-e2e="browse-comment-count"]').innerText;
        var tags = document.querySelectorAll('div[data-e2e="browse-video-desc"] > a');
        var tagsInside = [];
        tags.forEach(tag => {
            tagsInside.push(tag.innerText.trim())
        })
        
        var goDown = document.querySelector('button[data-e2e="arrow-right"]');
        status = subBtns.innerText
        if(status == "Подписаться") {
            subBtns.click();
            console.log(`%c# ${index} | Подписка на пользователя @${usersName.innerText} оформленна.`, 'color: lime;')
        } else {
            console.log(`%c# ${index} |  Пользователь @${usersName.innerText} уже в подписках.`, 'color: crimson;')
        }
        data.push({
            username: `@${usersName.innerText}`,
            nickname: userNickName,
            status: (status == "Подписаться") ? "Успешная подписка" : "Аккаунт в подписках",
            date: new Date().toLocaleString(),
            index: data.length + 1,
            meta: {
                createdAt: createdAt,
                tags: [...tagsInside],
                sound: sound,
                likes: likes,
                comments: comments,
                linkForShare: link
            }
        })
        users.push(usersName.innerText);
        index++;
        setTimeout(function() {
            goDown.click();
            // console.warn('timeout');
        }, 1000);
        tiktok.set();
    }
}



const tiktok = new main();
const init = setInterval(tiktok.start, time);
