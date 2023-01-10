import { galleryItems } from './gallery-items.js';

// adding elements from items array to html
const gallery = document.querySelector('.gallery');
const markup = galleryItems.reduce(
  (acc, { preview, original, description }) =>
    acc +
    `<div class="gallery__item">
       <a class="gallery__link" href="${original}" onclick="return false">
         <img
         class="gallery__image"
         src="${preview}"
         data-source="${original}"
         alt="${description}"
         /> 
        </a> 
      </div>`,
  ''
);
gallery.insertAdjacentHTML('beforeend', markup);

// open loghtbox modal on click
gallery.addEventListener('click', onClick);
let instance;
function onClick(evt) {
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
  evt.preventDefault();

  const source = evt.target.dataset.source;
  instance = basicLightbox.create(`
    <div class="modal">
      <img src='${source}' />
    </div>
    `);
  instance.show();

  return instance;
}

// close lightbox modal on esc
gallery.addEventListener('keydown', onEsc);
function onEsc(event) {
  if (instance.visible()) {
    if (event.keyCode === 27) {
      instance.close();
    }
  }
}
