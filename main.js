const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];
let likedPosts = [];

posts.forEach(createPost);

const buttons = Array.from(document.getElementsByClassName('like-button'));
buttons.forEach(elem => {
    elem.addEventListener('click', function(){
        if (likedPosts.includes(this.dataset.postid)){
            this.classList.remove('like-button--liked');
            likedPosts = likedPosts.filter((id) => id != this.dataset.postid);
            updateLikes(--posts[this.dataset.postid - 1].likes, this.dataset.postid);
        } else {
            this.classList.add('like-button--liked');
            likedPosts.push(this.dataset.postid);
            updateLikes(++posts[this.dataset.postid - 1].likes, this.dataset.postid);
        }
        console.log(likedPosts);
    })
});

function createPost(elem){
    data = formatDate(elem.created);
    profileImage = checkProfileImage(elem);
    const template = `
    <div class="post">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    ${profileImage}                  
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${elem.author.name}</div>
                    <div class="post-meta__time">${data}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${elem.content}</div>
        <div class="post__image">
            <img src=${elem.media} alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#!" data-postid="${elem.id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${elem.id}" class="js-likes-counter">${elem.likes}</b> persone
                </div>
            </div> 
        </div>            
    </div>
    `
    document.getElementById('container').innerHTML += template;
}

function formatDate(data){
    const dataSplitted = data.split('-');
    return dataSplitted[2] + '/' + dataSplitted[1] + '/' + dataSplitted[0]
}

function updateLikes(number, id){
    document.getElementById('like-counter-' + id).innerText = number;
}

function checkProfileImage(elem){
    if (elem.author.image == null){
        const nameSeparated = elem.author.name.split(' ');
        return `<div class="profile-pic-default"><span>${nameSeparated[0][0]}${nameSeparated[1][0]}</span></div>`
    } else {
        return `<img class="profile-pic" src=${elem.author.image} alt=${elem.author.name}>`
    }  
}