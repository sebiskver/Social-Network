import http from '../lib/EasyHTTP';
import ui from './UI';
import util from './Utilities';
import modal from './Modal';
import chat from './Chat';

class Profile {
  constructor() {
    this.profilePost = '.fb-post';

    this.text = '#text';
    this.publish = '#publish';
    this.contacts = '#contacts';

    this.chat = '.fb-chat-show';

    this.options = '#options';
    this.logOut = '#log-out';
    this.profileOptions = '.fb-options';
    this.user = JSON.parse(localStorage.getItem('userLogged'));
    
    this.loadEvents();
  }

  loadEvents() {
    // Post Events
    document.addEventListener('DOMContentLoaded', () => {
      this.getUser((userData) => {
        ui.profileNavRender(userData);
        ui.profilePersonalRender(userData);
        ui.profileCoverRender(userData);
        ui.profileContactRender(userData);

        ui.profilePostRender(userData);
      });
    });

    // Publish
    document.querySelector(this.publish).addEventListener('click', this.addPost.bind(this));

    // Remove Post
    document.querySelector(this.profilePost).addEventListener('click', this.removePost.bind(this));

    // Show Options
    document.querySelector(this.options).addEventListener('click', (e) => {
      document.querySelector(this.profileOptions).classList.toggle('fb-options--show');
      e.preventDefault();
    }); 
    
    // Log Out
    document.querySelector(this.logOut).addEventListener('click', this.logOutFromProfile.bind(this));

    // Chat Events
    document.querySelector(this.contacts).addEventListener('click', chat.showChat);
    document.querySelector(this.chat).addEventListener('click', chat.closeChat);
  }

  getUser(user) {
    http.get(`http://localhost:3000/users/${this.user}`, (error, data) => {
      user(JSON.parse(data));
    });
  }

  putPosts(newPost) {
    http.put(`http://localhost:3000/users/${this.user}`, newPost, (error, data) => {
      ui.profilePostRender(newPost);
    });
  }
  
  addPost() {
    let txt = document.querySelector(this.text).value;

    if(txt === '') {
      modal.openModal('Fill In Text', 'If you want to post, you must first fill with some words...');
    }else {
      const dte = util.getPostDate();
      const img = util.getRandomImage(500, 300);
  
      const information = {
        date: dte,
        image: img,
        body: txt
      }
  
      this.getUser((data) => {
        data.posts.push(information);
        this.putPosts(data);
      });
    }
  }

  removePost(e) {
    const item = e.target.parentElement.parentElement.parentElement;
    if(item.classList.contains('fb-post__item')) {

      let index = Array.from(item.parentElement.children).reverse().indexOf(item);

      this.getUser((user) => {
        user.posts.splice(index, 1);
        this.putPosts(user);
        modal.openModal('Post Deleted...', 'You successfully deleted post...');
      });
    }
  }

  logOutFromProfile() {
    localStorage.removeItem('userLogged');
    window.location.href = 'http://localhost:3001/';
  }
}

export default Profile;