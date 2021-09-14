/* used a class to have all the features here, easy to handle manage and update */

class Color {
  constructor (hex, element){
    this.hex = hex;
    this.element = element;
    this.locked = false;
  }

  setHex (hex) {
    this.hex = hex;
    this.element.style.backgroundColor = hex;
    this.element.querySelector('.color-input').value = hex;
    /* changes the value of the color */
  }

  setLocked (locked) {
    this.locked = locked;

    /* checks if locked,*/
    if (locked){
      /* if unlocked, locks the color */
      this.element.classList.add('locked');

      /* changes the icon */
      this.element.querySelector('img').src = 'icons/lock-closed.svg'

    } else {
      /* if locked, unlocks the color */
      this.element.classList.remove('locked');

      /* changes the icon */
      this.element.querySelector('img').src = 'icons/lock-open.svg'
    }
  }

  toggleLocked () {
    this.setLocked(!this.locked);
  }

  generateHex () {
    if (this.locked){
      return;
    }

    const chars = '0123456789ABCDEF';

    let hex = '#';

    for (let i = 0; i < 6; i++){
      hex += chars[Math.floor(Math.random() * 16)];
    }

    this.setHex(hex);
  }

  copyToClipboard(){
    const input = this.element.querySelector('.color-input');
    input.select();
    document.execCommand('copy');
    input.blur();

    this.element.classList.add('copied');
    setTimeout(() => {
      this.element.classList.remove('copied');
    }, 1000);
  }
} 

const color_elements = document.querySelectorAll('.colors .color');

const colors = [];

for (let i = 0; i < color_elements.length; i++){
  const color_element = color_elements[i];

  const input = color_element.querySelector('.color-input');

  const lock_toggle = color_element.querySelector('.lock-toggle');

  const copy_hex = color_element.querySelector('.copy-hex');

  const hex = input.value;

  /* declare new color */
  const color = new Color(hex, color_element);

  /* anytime we change anything a new value is set*/
  input.addEventListener('input', ()=> color.setHex(e.target.value));

  /* uses the toggle func to lock/unlock */
  lock_toggle.addEventListener('click', ()=> color.toggleLocked());

  /* copy to clipboard function */
  copy_hex.addEventListener('click', ()=> color.copyToClipboard());

  /* new color is generated */
  color.generateHex();

  colors.push(color);
}

