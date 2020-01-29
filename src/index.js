import "./style.css";
import '../node_modules/swiper/css/swiper.min.css';
import {headerScript} from "./header";
import {videoScript} from "./video";
import {sliderrScript} from "./slider";
import Api from './data';


headerScript();
videoScript();
sliderrScript();



//validation 
const REQUIRED_FIELD = "Пожалуйста, заполните поле";
const EMAIL_ERROR = "Адрес почты указан в неверном формате";
const form = document.forms.payment;
// const modalForm = document.forms.modal;
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





//validation modal------------------------------
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



const ownAmountModal = document.querySelector('#price');
const ownAmountPage = document.querySelector('#price-form');
const amountsModal = document.querySelectorAll('.payment-form__input-radio-modal');
const amountsPage = document.querySelectorAll('.payment-form__input-radio-page');

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
//-----------------------------------

//modal

const closeButton = document.querySelector('.modal__close');
const popup = document.querySelector('.modal');
const openPopupButtons = document.querySelectorAll('.button');
const modalTitle = document.querySelector('.modal__title');
const successModalTitle = document.querySelector('.modal__title--after');
const modalForm = document.querySelector('.payment-form__form--modal');
const successModalInfo = document.querySelector('.modal__container-after');

const popupOpen = () =>  {
  popup.classList.remove('hidden');
}

openPopupButtons.forEach(item => {
  item.addEventListener('click', popupOpen);
});


const successModal = () => {
    modalTitle.classList.add('hidden');
    modalForm.classList.add('hidden');
    successModalInfo.classList.remove('hidden');
    successModalTitle.classList.remove('hidden');
}


const popupClose = () => {
  popup.classList.add('hidden');
  modalTitle.classList.remove('hidden');
  modalForm.classList.remove('hidden');
  successModalInfo.classList.add('hidden');
  successModalTitle.classList.add('hidden');
};

closeButton.addEventListener('click', popupClose);

//--------------------




const linkUp = document.querySelector('.scroll');

function handleButtonClick(evt) {
  evt.preventDefault();
  header.scrollIntoView({block: "start", behavior: "smooth"});
}

linkUp.addEventListener('click', handleButtonClick);



//cloudpayments

const progress = document.querySelector("#bar");

const moveProgress = (money) => {
  let width = 0;
  let newWidth = (money * 100) / 764536;
  progress.style.width = width + newWidth + '%';

}

const pay = (amount, email, data) => {
  const widget = new cp.CloudPayments();
  widget.charge ({ // options
          publicId: 'test_api_00000000000000000000001',  //id из личного кабинета
          description: 'Пример оплаты (деньги сниматься не будут)', //назначение
          amount:  parseFloat(amount, 10), //сумма
          currency: 'RUB', //валюта
          invoiceId: '1234567', //номер заказа  (необязательно)
          accountId: email, //идентификатор плательщика (необязательно)
          skin: "mini", //дизайн виджета
          data: data,
      },
      function (options) { // success
          
          const money = document.querySelector('.payment-form__progress-amount'); // span
          const string =  money.textContent;
          const noString = parseInt(string.replace(/\s/g, ''));
          const sum = +amount + noString; //число

          // проверка, если noString строка,  то преобразовать в число 
          if(typeof noString == "string" ) {
            newnNoString = parseInt(noString.replace(/\s/g, ''));
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
            return res.json();
            }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
      
        .then((result) => { //обрабатываем рузультат
          if (result) {
            return result
            }
          })
        .catch(err => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        })

          moveProgress(sum);
          successModal();
          popupOpen()
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
    const hasError =  inputsArray.find((item) => {
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
 
    if(hasError) {
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
          if (event.target.classList.contains('form__button--form.active')) {
            const data = {};
            data.cloudPayments = {
              recurrent: { interval: 'Month', period: 1 },
            };
            pay(getAmount(), email, data);
            document.querySelector('.payment-form__form').reset();
          } else {
            pay(getAmount(), email);
            document.querySelector('.payment-form__form').reset();
          }

    } 
    
  })
});





sendButtonModal.forEach(button => {
  button.addEventListener('click', function(event) {
    const inputEmailModal = document.querySelector('#email');
    const email = document.querySelector('#email').value;
    const inputsArray = Array.from(inputsModal);
    const hasError =  inputsArray.find((item) => {
      if (item.value.length === 0) {
        item.classList.add('error');
        item.closest('.payment-form__input-box--modal').querySelector('.payment-form__user-label--modal').classList.add('error-text');
        item.closest('.payment-form__input-box--modal').querySelector('.payment-form__error-modal').textContent = REQUIRED_FIELD;
        //event.preventDefault();
        return true;
      }
      if (item.value.length > 0 && !validateEmail(email)) {
        item.classList.remove('error');
        item.closest('.payment-form__input-box--modal').querySelector('.payment-form__user-label--modal').classList.remove('error-text');
        item.closest('.payment-form__input-box--modal').querySelector('.payment-form__error-modal').textContent = '';
        inputEmailModal.classList.add('error');
       document.querySelector('.payment-form__user-label--email').classList.add('error-text');
        document.querySelector('.payment-form__error--email-modal').textContent = EMAIL_ERROR;
        return true;
      }
        return false;
    })
    if(hasError) {
      event.preventDefault();
      return;

    } else {
    event.preventDefault();
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
  }
  })
});




  //получаю данные из таблицы
  const sumContainer = document.querySelector(`.payment-form__progress-amount`);
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
     
      let newSumRender= new SumRender(sumContainer, data); //
      newSumRender.render();
      console.log('DATA', data)
      moveProgress(data.sum[0].sum)
      
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  }




  getData();
 


//при разбиении js файла на модули необходимо руководствоваться принципами ООП. 
// в вашем коде вполне можно было вынести логику оплаты и логику хранения данных для отображения прогресс бара в двух разных классах, 
// и взаимодействовать между ними используя методы экземпляров класса.






