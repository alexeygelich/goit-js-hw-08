import gallery from '../gallery-items.js';

const ulRef = document.querySelector('.gallery');
const modalRef = document.querySelector('.lightbox');
const bigImgRef = document.querySelector('.lightbox__image');
const btnCloseRef = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const overlayRef = document.querySelector('.lightbox__overlay');
let index = 0;

gallery.forEach((el, i) => {
  ulRef.insertAdjacentHTML(
    'beforeend',
    `<li><a
    class="gallery__link"
    href="${el.original}"
  ><img class="gallery__image" src=${el.preview} data-source='${el.original}' data-index=${i} alt='${el.description}'></li>`,
  );
});

const onOpenImg = e => {
  e.preventDefault();
  if (e.target.nodeName === 'IMG') {
    bigImgRef.src = e.target.dataset.source;
    modalRef.classList.add('is-open');
    index = +e.target.dataset.index;
    window.addEventListener('keydown', onKeyboard);
  }
};

const onCloseBtn = () => {
  modalRef.classList.remove('is-open');
  bigImgRef.src = '';
  window.removeEventListener('keydown', onKeyboard);
};

const onCloseOverlay = () => {
  modalRef.classList.remove('is-open');
  bigImgRef.src = '';
  window.removeEventListener('keydown', onKeyboard);
};

const onKeyboard = e => {
  if (e.key === 'Escape') {
    modalRef.classList.remove('is-open');
    bigImgRef.src = '';
    window.removeEventListener('keydown', onKeyboard);
  }

  if (e.key === 'ArrowRight') {
    index++;

    if (index === gallery.length) {
      index = 0;
    }

    bigImgRef.src = gallery[index].original;
  }

  if (e.key === 'ArrowLeft') {
    if (index === 0) {
      index = gallery.length;
    }

    index--;
    bigImgRef.src = gallery[index].original;
  }
};

ulRef.addEventListener('click', onOpenImg);
btnCloseRef.addEventListener('click', onCloseBtn);
overlayRef.addEventListener('click', onCloseOverlay);
