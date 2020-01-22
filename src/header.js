export const headerScript = () => {

//header
const shareButton = document.querySelector('.header__wrapper-share');
const shareList = document.querySelector('.header__social');
const shareItem = document.querySelectorAll('.additional__social-item');
const shareButtonWrapper = document.querySelector('.header__wrapper--right');
const ownAmountModal = document.querySelector('#price');
const ownAmountPage = document.querySelector('#price-form');
const amountsModal = document.querySelectorAll('.payment-form__input-radio-modal');
const amountsPage = document.querySelectorAll('.payment-form__input-radio-page');


const toggleHidden = () => {
  shareList.classList.toggle('hidden');
  shareButton.classList.toggle('hidden');
};

shareButton.addEventListener('click', toggleHidden);
shareButton.addEventListener('click', () => {
  if (document.body.clientWidth < 981) {
    shareButtonWrapper.style.flexDirection = 'column-reverse';
    shareList.style.paddingTop = '15px';
  }
})


shareItem.forEach(item => {
  item.addEventListener('click', () => {
    shareList.classList.toggle('hidden');
    shareButton.classList.toggle('hidden');
    if (document.body.clientWidth < 981) {
      shareButtonWrapper.style.flexDirection = 'row';
      shareList.style.paddingTop = '0px';
    }
  });
});

document.addEventListener('click', (evt) => {
  if(evt.target !== shareButton) {
    shareList.classList.add('hidden');
    shareButton.classList.remove('hidden');
    shareButtonWrapper.style.flexDirection = 'row';
  }
})


const copyButton = document.querySelectorAll('.additional__link-copy');

const copyToClipboard = () => {
  let copytext = document.createElement('input');
  copytext.value = window.location.href;
  document.body.appendChild(copytext);
  copytext.select();
  document.execCommand('copy');
}

copyButton.forEach(item => {
  item.addEventListener('click', copyToClipboard);
});

const budgetSection = document.querySelector('#budget');
const header = document.querySelector('.header');
console.log(budgetSection.offsetTop)

document.addEventListener('scroll', function() {
  let position = budgetSection.offsetTop;
  const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled >= 3450) { //position 
      header.style.position = 'static';
  } else {
    header.style.position = 'fixed';
  }
});


};