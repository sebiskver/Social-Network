class UI {
  constructor() {
    this.profileNav = '.fb-profile-nav';
    this.profilePersonal = '.fb-personal';
    this.profileCover = '.fb-pg-main__cover';
    this.profileContact = '.fb-contact';
    this.profilePost = '.fb-post';
    this.chat = '.fb-chat-show';

    this.text = '#text';
  }

  profileNavRender(user) {
    const nav = document.querySelector(this.profileNav);

    const li = document.createElement('li');
    li.className = 'fb-profile-nav__item';

    const anchor = document.createElement('a');
    anchor.className = 'fb-profile-nav__item__info';
    anchor.setAttribute('href', '#');

    const img = document.createElement('img');
    img.src = user.image;

    const span = document.createElement('span');
    span.textContent = user.name;

    anchor.appendChild(img);
    anchor.appendChild(span);

    li.appendChild(anchor);

    nav.insertBefore(li, nav.firstElementChild);
  }

  profilePersonalRender(user) {
    const person = document.querySelector(this.profilePersonal);

    const img = document.createElement('img');
    img.className = 'fb-personal__image';
    img.src = user.image;

    const h2 = document.createElement('h2');
    h2.className = 'fb-personal__name';
    h2.textContent = `${user.name} ${user.lastname}`;

    const h3 = document.createElement('h3');
    h3.className = 'fb-personal__username';
    h3.textContent = `@${user.username}`;

    person.insertBefore(h3, person.firstElementChild);
    person.insertBefore(h2, person.firstElementChild);
    person.insertBefore(img, person.firstElementChild);
  }

  profileCoverRender(user) {
    const cover = document.querySelector(this.profileCover);

    const img = document.createElement('img');
    img.src = user.cover;

    cover.appendChild(img);
  }

  profileContactRender(user) {
    const contact = document.querySelector(this.profileContact);

    user.friends.forEach((friend) => {
      const item = document.createElement('div');
      item.className = 'fb-contact__item';

      const info = document.createElement('div');
      info.className = 'fb-contact__item__info';

      const img = document.createElement('img');
      img.src = friend.image;

      const span = document.createElement('span');
      span.textContent = `${friend.name} ${friend.lastname}`;

      info.appendChild(img);
      info.appendChild(span);

      item.appendChild(info);

      if(friend.active) {
        const span = document.createElement('span');
        span.className = 'green-dot';
        item.appendChild(span);
      }

      contact.appendChild(item);
    });
  }

  profilePostRender(user) {
    const pts = document.querySelector(this.profilePost);

    const name = user.name;
    const lastname = user.lastname;
    const image = user.image;

    pts.innerHTML = '';

    user.posts.forEach((post) => {
      const item = document.createElement('div');
      item.className = 'fb-post__item';

      // Header
      const header = document.createElement('div');
      header.className = 'fb-post__header';

      const user = document.createElement('div');
      user.className = 'fb-post__header__user';

      const userImg = document.createElement('img');
      userImg.src = image;

      const info = document.createElement('div');
      info.className = 'fb-post__header__info';

      const userName = document.createElement('p');
      userName.className = 'fb-post__header__info__name';
      userName.innerHTML = `<a href="#">${name} ${lastname}</a>`;

      const date = document.createElement('p');
      date.className = 'fb-post__header__info__date';
      date.textContent = post.date;

      info.appendChild(userName);
      info.appendChild(date);

      user.appendChild(userImg);
      user.appendChild(info);

      const dlt = document.createElement('div');
      dlt.className = 'fb-post__header__delete';
      dlt.innerHTML = `<i>&times</i>`;

      header.appendChild(user);
      header.appendChild(dlt);

      // Content
      const content = document.createElement('div');
      content.className = 'fb-post__content';
      content.innerHTML = `<p>${post.body}</p>`;

      // Photo
      const photo = document.createElement('div');
      photo.className = 'fb-post__photo';
      photo.innerHTML = `<a href="#"><img src="${post.image}" alt="Post Photo"></a>`;

      // Footer
      const footer = document.createElement('div');
      footer.className = 'fb-post__footer';
      footer.innerHTML = `
        <a href="#"><i class="fa fa-thumbs-o-up"></i> Like</a>
        <a href="#"><i class="fa fa-comment-o"></i> Comments</a>
        <a href="#"><i class="fa fa-share"></i> Share</a>
      `;

      item.appendChild(header);
      item.appendChild(content);
      item.appendChild(photo);
      item.appendChild(footer);

      pts.insertBefore(item, pts.firstElementChild);
    });

    this.clearTextArea();
  }

  profileChatRender(image, name) {
    const chatArea = document.querySelector(this.chat);

    const chat = document.createElement('div');
    chat.className = 'fb-chat';

    // Header
    const header = document.createElement('div');
    header.className = 'fb-chat__header';

    const user = document.createElement('div');
    user.className = 'fb-chat__header__user';

    const img = document.createElement('img');
    img.className = 'fb-chat__header__user__image';
    img.src = image;

    const details = document.createElement('div');
    details.className = 'fb-chat__header__user__details';
    details.innerHTML = `
      <a href="#" class="fb-chat__header__user__details__link">${name}</a>
      <span class="fb-chat__header__user__details__active">Active now</span>
    `;

    user.appendChild(img);
    user.appendChild(details);

    const options = document.createElement('div');
    options.className = 'fb-chat__header__options';
    options.innerHTML = `
      <a href="#"><i class="fa fa-phone"></i></a>
      <a href="#"><i class="fa fa-video-camera"></i></a>
      <a href="#" id="fb-chat-close"><i class="fa fa-times"></i></a>
    `;

    header.appendChild(user);
    header.appendChild(options);

    // Content
    const content = document.createElement('div');
    content.className = 'fb-chat__content';
    content.innerHTML = `
      <p class="fb-chat__content__message">Hello ${name}</p>
    `;

    // Bottom
    const bottom = document.createElement('div');
    bottom.className = 'fb-chat__bottom';

    const input = document.createElement('div');
    input.className = 'fb-chat__bottom__input';
    input.innerHTML = `<input class="fb-chat__bottom__input__field" type="text" placeholder="Type a message">`;

    const bottomOptions = document.createElement('div');
    bottomOptions.className = 'fb-chat__bottom__options';
    bottomOptions.innerHTML = `
      <div class="fb-chat__bottom__options__left">
        <i class="fa fa-file-image-o"></i>
        <i class="fa fa-video-camera"></i>
        <i class="fa fa-paperclip"></i>
        <i class="fa fa-gift"></i>
        <i class="fa fa-smile-o"></i>
        <i class="fa fa-gamepad"></i>
      </div>
      <div class="fb-chat__bottom__options__right">
        <i class="fa fa-thumbs-up"></i>
      </div>
    `;

    bottom.appendChild(input);
    bottom.appendChild(bottomOptions);

    chat.appendChild(header);
    chat.appendChild(content);
    chat.appendChild(bottom);

    chatArea.innerHTML = '';

    chatArea.appendChild(chat);
  }

  clearTextArea() {
    document.querySelector(this.text).value = '';
  }

  closeChat() {
    document.querySelector(this.chat).innerHTML = '';
  }
}

const ui = new UI;

export default ui;