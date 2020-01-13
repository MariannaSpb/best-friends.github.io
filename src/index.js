import "./style.css";
import Swiper from 'swiper';
import '../node_modules/swiper/css/swiper.min.css';

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
// console.log(budgetSection.offsetTop)

document.addEventListener('scroll', function() {
  let position = budgetSection.offsetTop;
  const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled >= 5150) { //position 
      header.style.position = 'static';
  } else {
    header.style.position = 'fixed';
  }
});


//video 
 const video = document.querySelector("#video");
 const playButton = document.querySelector('.about__video-play');

 playButton.addEventListener('click', function () {
  if (video.paused) {
    video.play();
    
    video.muted=false;
    video.currentTime = 0;
  
  }   
  if (video.played) {
    video.play();
    
    video.muted=false;
    video.currentTime = 0;
  
  }
  else {
    video.pause();
    video.play();
  }
});


 //slider
const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });


//validation 
const REQUIRED_FIELD = "Пожалуйста, заполните поле";
const EMAIL_ERROR = "Адрес почты указан в неверном формате";
const form = document.forms.payment;
const modalForm = document.forms.modal;
const inputs = document.querySelectorAll('.payment-form__user-input');
const sendButton = document.querySelectorAll('.payment-form__button');

inputs.forEach(item => {
  item.addEventListener('input', () => {

    if (item.value !== '') {
      item.classList.add('focused')
    } else {
      item.classList.remove('focused')
    }
  });
  item.addEventListener('blur', () => {
    if(item.value.length) {
      item.classList.remove('focused');
      item.classList.remove('error');
    }
  })
});

inputs.forEach((item) => {
  item.addEventListener('blur', () => {
    if (item.value.length) {
      item.classList.remove('focused');
      item.classList.remove('error');
      item.closest('.payment-form__input-box').querySelector('.payment-form__user-label').classList.remove('error-text');
      item.closest('.payment-form__input-box').querySelector('.payment-form__error').textContent = '';
    } 
  });
});

inputs.forEach((item) => {
  item.addEventListener('input', () => {
    if (item.value.length) {
      item.classList.remove('error');
      item.closest('.payment-form__input-box').querySelector('.payment-form__user-label').classList.remove('error-text');
      item.closest('.payment-form__input-box').querySelector('.payment-form__error').textContent = '';
    } 
  });
});


const validateEmail = (email) => {
  const pattern = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
  return pattern.test(email);
}



const validationForm = (event) => { 
  event.preventDefault();
  const inputEmail = document.querySelector('#email-form');
  const email = inputEmail.value;
  inputs.forEach(item => {
    if (item.value.length === 0) {
      item.classList.add('error');
      item.closest('.payment-form__input-box').querySelector('.payment-form__user-label').classList.add('error-text');
      item.closest('.payment-form__input-box').querySelector('.payment-form__error').textContent = REQUIRED_FIELD;
     
      event.preventDefault();

    }
    if (item.value.length > 0 && !validateEmail(email)) {
      event.preventDefault();
      item.classList.remove('error');
      item.closest('.payment-form__input-box').querySelector('.payment-form__user-label').classList.remove('error-text');
      item.closest('.payment-form__input-box').querySelector('.payment-form__error').textContent = '';
      document.querySelector('.payment-form__error--email').textContent = EMAIL_ERROR;
    }

    if (!validateEmail(email)) {
      inputEmail.classList.add('error');
      document.querySelector('.payment-form__user-label--email').classList.add('error-text');
    }

  });
}


sendButton.forEach(button => {
  button.addEventListener('click', validationForm)
});


//modal

const closeButton = document.querySelector('.modal__close');
const popup = document.querySelector('.modal');
const openPopupButtons = document.querySelectorAll('.button');

const popupClose = () => {
  popup.classList.add('hidden');
};

const popupOpen = () =>  {
  popup.classList.remove('hidden');
}

closeButton.addEventListener('click', popupClose);

openPopupButtons.forEach(item => {
  item.addEventListener('click', popupOpen);
});

//validation modal
const sendButtonModal = document.querySelectorAll('.payment-form__button--modal');
const inputsModal = document.querySelectorAll('.payment-form__modal-input');


inputsModal.forEach(item => {
  item.addEventListener('input', () => {

    if (item.value !== '') {
      item.classList.add('focused')
    } else {
      item.classList.remove('focused')
    }
  });
  item.addEventListener('blur', () => {
    if(item.value.length) {
      item.classList.remove('focused');
      item.classList.remove('error');
    }
  })
});


inputsModal.forEach((item) => {
  item.addEventListener('blur', () => {
    if (item.value.length) {
      item.classList.remove('focused');
      item.classList.remove('error');
      item.closest('.payment-form__input-box--modal').querySelector('.payment-form__user-label--modal').classList.remove('error-text');
      item.closest('.payment-form__input-box--modal').querySelector('.payment-form__error-modal').textContent = '';
    } 
  });
});

inputsModal.forEach((item) => {
  item.addEventListener('input', () => {
    if (item.value.length) {
      item.classList.remove('error');
      item.closest('.payment-form__input-box--modal').querySelector('.payment-form__user-label--modal').classList.remove('error-text');
      item.closest('.payment-form__input-box--modal').querySelector('.payment-form__error-modal').textContent = '';
    } 
  });
});



const validationModal = (event) => { 
  const inputEmailModal = document.querySelector('#email');
  const emailModal = inputEmailModal.value;
  inputsModal.forEach(item => {
    if (item.value.length === 0) {
      item.classList.add('error');
      item.closest('.payment-form__input-box--modal').querySelector('.payment-form__user-label--modal').classList.add('error-text');
      item.closest('.payment-form__input-box--modal').querySelector('.payment-form__error-modal').textContent = REQUIRED_FIELD;
     
      event.preventDefault();

    }
    if (item.value.length > 0 && !validateEmail(emailModal)) {
      event.preventDefault();
      item.classList.remove('error');
      item.closest('.payment-form__input-box--modal').querySelector('.payment-form__user-label--modal').classList.remove('error-text');
      item.closest('.payment-form__input-box--modal').querySelector('.payment-form__error-modal').textContent = '';
      document.querySelector('.payment-form__error--email-modal').textContent = EMAIL_ERROR;
    }
  });
}


sendButtonModal.forEach(button => {
  button.addEventListener('click', validationModal)
});




ownAmountModal.addEventListener('input', () => {
  amountsModal.forEach(item => {
    item.removeAttribute('checked');
  })
});

ownAmountPage.addEventListener('input', () => {
  amountsPage.forEach(item => {
    item.removeAttribute('checked');
  })
});


// console.log(input.closest('.payment-form__input-box').querySelector('.payment-form__user-label')); //closest вернет для input ближайший родительский
//элемент - контейнер P и затем в контейнере найдёт лейбл. 

const linkUp = document.querySelector('.scroll');
// const header = document.querySelector('.header');


function handleButtonClick(evt) {
  evt.preventDefault();
  header.scrollIntoView({block: "start", behavior: "smooth"});
}

linkUp.addEventListener('click', handleButtonClick);




//cloudpayments

const progress = document.querySelector("#bar");
const moveProgress = (money) => {
  let width = 8;
  let newWidth = (money * 100) / 764536;
  progress.style.width = width + newWidth + '%';

}

const pay = (amount, email) => {
  const widget = new cp.CloudPayments();
  widget.charge ({ // options
          publicId: 'test_api_00000000000000000000001',  //id из личного кабинета
          description: 'Пример оплаты (деньги сниматься не будут)', //назначение
          amount:  parseFloat(amount, 10), //сумма
          currency: 'RUB', //валюта
          invoiceId: '1234567', //номер заказа  (необязательно)
          accountId: email, //идентификатор плательщика (необязательно)
          skin: "mini", //дизайн виджета
          data: {
              myProp: 'myProp value' //произвольный набор параметров
          }
      },
      function (options) { // success
          //действие при успешной оплате
          console.log('success')
          const money = document.querySelector('.payment-form__progress-amount');
          const num1 = +"3374"; //3374
          const sum = num1 + +amount;
          money.textContent = sum.toLocaleString('ru-RU', { minimumSignificantDigits: 1});

          moveProgress(amount);
      },
      function (reason, options) { // fail
          //действие при неуспешной оплате
          console.log('fail')
      });
      
}


sendButton.forEach(button => {
  button.addEventListener('click', function() {
    const email = document.querySelector('#email-form').value;
    const getAmount = () => {
      let amount;
      const checkboxContainer = document.querySelector('.payment-form__field--checkbox')
      const money = document.querySelector('.payment-form__progress-amount')
      if(checkboxContainer.querySelector('input[type=radio]:checked')) {
         amount = checkboxContainer.querySelector('input[type=radio]:checked').value;
      }
      else {
        amount = checkboxContainer.querySelector('.payment-form__input--price').value;
      }
      return amount;
    }

    pay(getAmount(), email);
    document.querySelector('.payment-form__form').reset();
  })
});


//modal
sendButtonModal.forEach(button => {
  button.addEventListener('click', function() {
    const email = document.querySelector('#email').value;
    const getAmount = () => {
      let amount;
      const checkboxContainer = document.querySelector('.payment-form__field--checkbox-modal')
      if(checkboxContainer.querySelector('input[type=radio]:checked')) {
         amount = checkboxContainer.querySelector('input[type=radio]:checked').value;
      }
      else {
        amount = checkboxContainer.querySelector('.payment-form__input--price').value;
      }
      return amount;
    }

    pay(getAmount(), email);

    document.querySelector('.payment-form__form--modal').reset();
    popupClose();
  })
});
