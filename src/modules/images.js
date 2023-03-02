// Images
import enter from '../assets/enter.png';
import refresh from '../assets/refresh.png';
import trash from '../assets/trash.svg';

// const refreshImg = document.getElementById('refreshImg');
// const enterImg = document.getElementById('enter');
const displayImages = () => {
  document.querySelector('#enter').src = enter;
  document.getElementById('refreshImg').src = refresh;
  document.querySelectorAll('.trashImg').forEach((img) => {
    img.src = trash;
  });
};

export default displayImages;
