// Images
import {default as enter} from '../assets/enter.png';
import { default as refresh} from '../assets/refresh.png';
import {default as trash} from '../assets/trash.svg';

// const refreshImg = document.getElementById('refreshImg');
// const enterImg = document.getElementById('enter');
const displayImages = () => {
  document.querySelector('#enter').src = enter;
  document.getElementById('refreshImg').src = refresh;
  document.querySelectorAll('.trashImg').forEach((img) => { img.src = trash; });
};

export default displayImages;
