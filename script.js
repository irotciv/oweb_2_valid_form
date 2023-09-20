const form = document.getElementById('validationForm');
const fullName = document.getElementById('fullName');
const dob = document.getElementById('dob');
const address = document.getElementById('address');
const email = document.getElementById('email');
const telegram = document.getElementById('telegram');
const output = document.getElementById('output');
const button = document.getElementById('button');

const fullNameRegex = /^[А-ЯҐЄІЇа-яґєії\s]+ [А-ЯҐЄІЇа-яґєії]\.[А-ЯҐЄІЇа-яґєії]\.$/;
const addressRegex = /^м\.\s[А-ЯҐЄІЇа-яґєії\s]+$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.com$/;
const telegramRegex = /^@\w_\w+$/;

function showError(element, message) {
    if (message.length !== 0) {
        element.parentElement.classList.add('error');
        element.parentElement.querySelector('.error').innerHTML = message;
        element.style.borderColor = 'red';
    } else {
        element.parentElement.classList.remove('error');
        element.parentElement.querySelector('.error').innerHTML = message;
        element.style.borderColor = 'green';
    }
}

function checkRegex(element, regex, message) {
    if (!regex.test(element.value)) {
        showError(element, message);
    } else {
        showError(element, '');
    }
}

function isDobValid(element, message) {
    if (new Date(element.value) - new Date() > 0) {
        showError(element, message);
    } else {
        showError(element, '');
    }
}

form.addEventListener('input', function (e) {
    e.preventDefault();

    if (fullName.value !== '') checkRegex(fullName, fullNameRegex, '<span>Перевірте правильність введених даних. Має відповідати патерну ТТТТТТ Т.Т.</span');
    if (dob.value !== '') isDobValid(dob, '<span>Дата народження не може бути майбутнім днем</span');
    if (address.value !== '') checkRegex(address, addressRegex, '<span>Перевірте правильність введених даних. Має відповідати патерну м. ТТТТТТ</span');
    if (email.value !== '') checkRegex(email, emailRegex, '<span>Перевірте правильність введених даних. Має відповідати патерну тттттт@ттттт.com</span');
    if (telegram.value !== '') checkRegex(telegram, telegramRegex, '<span>Тег може містити тільки букви, цифри та _</span');

    if (fullName.value !== '' && dob.value !== '' && address.value !== '' && email.value !== '' && telegram.value !== '') {
        button.disabled = form.querySelectorAll('div.form-floating.error').length !== 0;
    }
});

button.addEventListener('click', function () {
    output.innerHTML = (`<h2>Результат</h2>` +
        `<p><span class="bold-label">ПІБ: </span>${fullName.value}<br>` +
        `<span class="bold-label">Дата народження: </span>${dob.value}<br>` +
        `<span class="bold-label">Адреса: </span>${address.value}<br>` +
        `<span class="bold-label">Email: </span>${email.value}<br>` +
        `<span class="bold-label">Telegram: </span>${telegram.value}</p>`);
});
