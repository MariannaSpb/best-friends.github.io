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
const sendButton = document.querySelectorAll('.payment-form__button--form');

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



// const validationForm = (event) => { 
//   event.preventDefault();
//   const inputEmail = document.querySelector('#email-form');
//   const email = inputEmail.value;

//   inputs.forEach(item => {
//     if (item.value.length === 0) {
//       item.classList.add('error');
//       item.closest('.payment-form__input-box').querySelector('.payment-form__user-label').classList.add('error-text');
//       item.closest('.payment-form__input-box').querySelector('.payment-form__error').textContent = REQUIRED_FIELD;
     
//       event.preventDefault();

//     }
//     if (item.value.length > 0 && !validateEmail(email)) {
//       event.preventDefault();
//       item.classList.remove('error');
//       item.closest('.payment-form__input-box').querySelector('.payment-form__user-label').classList.remove('error-text');
//       item.closest('.payment-form__input-box').querySelector('.payment-form__error').textContent = '';
//       document.querySelector('.payment-form__error--email').textContent = EMAIL_ERROR;
//     }

//     if (!validateEmail(email)) {
//       inputEmail.classList.add('error');
//       document.querySelector('.payment-form__user-label--email').classList.add('error-text');
//     }
//   });
//   return;
// }


// sendButton.forEach(button => {
//   button.addEventListener('click', validationForm)
// });


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
    const checkboxContainer = document.querySelector('.payment-form__field--checkbox')
      item.removeAttribute('checked');
  })
});


// console.log(input.closest('.payment-form__input-box').querySelector('.payment-form__user-label')); //closest вернет для input ближайший родительский
//элемент - контейнер P и затем в контейнере найдёт лейбл. 

const linkUp = document.querySelector('.scroll');

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
          console.log('success')
          const money = document.querySelector('.payment-form__progress-amount'); // span
          
          console.log('money.textContent', money.textContent) //string
          
          const string =  money.textContent;
          const noString = parseInt(string.replace(/\s/g, ''));
          console.log('noString', noString)
          const sum = +amount + noString; //число

          // проверка, если noString строка,  то преобразовать в число 
          if(typeof noString == "string" ) {
            newnNoString = parseInt(noString.replace(/\s/g, ''));
            console.log('noStringPARSE', newnNoString)
            const sum = +amount + newnNoString;
            return sum;
          }

         money.textContent = sum.toLocaleString('ru-RU', { minimumSignificantDigits: 1}); //превратили в строку 
         
          fetch(`https://v2-api.sheety.co/b06233755f2a73d063e8e49f126b0a1d/newProject/emails`, {
            method: 'POST',
            headers: {
            authorization: 'd5211b32-cadd-445e-acab-fa3717d536',
            'Content-Type': 'application/json'
          },
      
            body: JSON.stringify({
              email: {
                summa: +amount,
                email: email
              }
            }) 
          })
    
        .then(res => {
          if (res.ok) {
            console.log('amount', amount)
            return res.json();
            }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
      
        .then((result) => { //обрабатываем рузультат
          if (result) {
            console.log('result', result) // объект email: {email: ----, summa:-----}
            return result
            }
          })
        .catch(err => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        })

          moveProgress(sum);
      },
      function (reason, options) { // fail
          //действие при неуспешной оплате
          console.log('fail')
      });
      
}


sendButton.forEach(button => {
  button.addEventListener('click', function(event) {
    const inputEmail = document.querySelector('#email-form');
    const email = inputEmail.value;
    const inputsArray = Array.from(inputs);
    const res =  inputsArray.every((item) => {
      console.log('inputsArray', item)
      if (item.value.length === 0) {
        item.classList.add('error');
        item.closest('.payment-form__input-box').querySelector('.payment-form__user-label').classList.add('error-text');
        item.closest('.payment-form__input-box').querySelector('.payment-form__error').textContent = REQUIRED_FIELD;
        //event.preventDefault();
        return true;
      }
      if (item.value.length > 0 && !validateEmail(email)) {
        item.classList.remove('error');
        item.closest('.payment-form__input-box').querySelector('.payment-form__user-label').classList.remove('error-text');
        item.closest('.payment-form__input-box').querySelector('.payment-form__error').textContent = '';
        inputEmail.classList.add('error');
        document.querySelector('.payment-form__user-label--email').classList.add('error-text');
        document.querySelector('.payment-form__error--email').textContent = EMAIL_ERROR;
        return true;
      }
      if (!validateEmail(email)) {
        inputEmail.classList.add('error');
        document.querySelector('.payment-form__user-label--email').classList.add('error-text');
        return true;
      }
      
        return false;
    })
 
    if(res) {
      event.preventDefault();
      return;
    } else {
      event.preventDefault();
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

    } 
    
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


  //получаю данные из таблицы
  const sumContainer = document.querySelector(`.payment-form__progress-amount`);
  console.log('sumContainer', sumContainer)
  class Sum {
    constructor(sumData) {
      this.sum = sumData.sum[0].sum;
     
    }

    create() {
      
      return `${this.sum.toLocaleString('ru-RU', { minimumSignificantDigits: 1})}`;
      // return `${this.sum}`;
      
    }
  }

//new
  class SumRender {
    constructor(container, obj) {
      this.container = container;
      this.obj = obj;
    }

    render() {
      const sum = new Sum(this.obj);
      this.container.textContent= sum.create();
      // console.log('this.containe', this.container)
      return this.container
    }

  }


  const getData = () => {
    
  fetch(`https://v2-api.sheety.co/b06233755f2a73d063e8e49f126b0a1d/newProject/sum`, {
    headers: {
      authorization: 'd5211b32-cadd-445e-acab-fa3717d536',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    
    .then((data) => {
      console.log('data', data);
     
      let newSumRender= new SumRender(sumContainer, data); //
      newSumRender.render();
      console.log('render',  newSumRender.render())

    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  }



  const span = document.querySelector('#progress-amount');
  console.log('span', span)

  getData();
 









