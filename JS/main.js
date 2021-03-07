// Validate form 
var form1 = document.getElementById('form_1');
var form2 = document.getElementById('form_2');
var name1 = document.getElementById('fullname1');
var name2 = document.getElementById('fullname2');
var pass1 = document.getElementById('password1');
var pass2 = document.getElementById('password2');
var passConfirm = document.getElementById('password_confirmation');
var phone = document.getElementById('phone');
var add = document.getElementById('address');
var showForm = document.querySelector('.form_login');
var logout = document.querySelector('.logout');
var userList = [];


form1.addEventListener('submit', function (e) {
    e.preventDefault();
    loginUser();
})

form2.addEventListener('submit', function (e) {
    e.preventDefault();
    checkInput('form_2');
    validateF2();
})

function validateF1() {

    if (name1.value === '') {
        setError(name1, 'Enter user name!')
    } else if (name1.value !== name2.value) {
        setError(name1, 'User name is not correct');
    } else {
        setSuccess(name1, '')
    }

    if (pass1.value === '') {
        setError(pass1, 'Enter password please!');
    } else if (pass1.value !== pass2.value) {
        setError(pass1, 'Password is not correct');
    } else {
        setSuccess(pass1, '');
    }

    checkInput('form_1');
}

function validateF2() {
    if (isUserName(name2.value) && isPassword(pass2.value) && passConfirm.value === pass2.value && isPhone(phone.value) && isAddress(add.value)) {
        userList = localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')) : [];

        userList.push({
            name: name2.value,
            password: pass2.value,
            confirmPassword: passConfirm.value,
            phone: phone.value,
            address: add.value
        })
        console.log(userList)

        localStorage.setItem('userList', JSON.stringify(userList))
        alert('Account registration is successful');
    } else if (!name2.value || !pass2.value || !passConfirm.value || !phone.value || !add.value) {
        userList = []
        alert('Not correct, enter again please');
    }
}

function loginUser() {
    userList = localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')) : [];
    
    if (name1.value === '' || pass1.value === '') {
        alert('Enter your account');
        setError(name1, 'Username is not correct');
        setError(pass1, 'Password is not correct');
    }
    for (var i = 0; i < userList.length; i++) {

        if (userList[i].name === name1.value) {
            setSuccess(name1, '')
        } else {
            setError(name1, 'username is not correct')
        }

        if (userList[i].password === pass1.value) {
            setSuccess(pass1, '')
        } else {
            setError(pass1, 'Password is not correct')
        }

        if (userList[i].name === name1.value && userList[i].password === pass1.value) {
            showForm.innerText = 'Hello! ' + userList[i].name;
            logout.setAttribute('style', 'display: block; margin-left: 0;');
            logout.innerHTML = '<a class="header__navbar-item" href="./index.html">Log out</a>'
            modalForm.classList.add('out');
            setTimeout(function () {
                modalForm.setAttribute('style', 'display: none;');
                modalForm.classList.remove('out');
            }, 700);
        }
    }
    // checkInput('form_1')
}

function isUserName(username) {
    return /^[a-zA-Z0-9]([._@](?![._@])|[a-zA-Z0-9]){6,20}$/.test(username);
}

function isEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function isPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/.test(password);
}

function isPhone(phone) {
    return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(phone);
}

function isAddress(add) {
    return /^(\w[\w ]*\w)?.{22,}$/.test(add);
}

function setError(input, message) {
    var formGroup = input.parentElement;
    var spanElement = formGroup.querySelector('.form_message');
    var invalid = formGroup.querySelector('.invalid');

    spanElement.innerText = message;
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    invalid.setAttribute('style', 'display: none');
}

function setSuccess(input, message) {
    var formGroup = input.parentElement;
    var spanElement = formGroup.querySelector('.form_message');
    var invalid = formGroup.querySelector('.invalid');

    spanElement.innerText = message;
    formGroup.classList.add('success');
    formGroup.classList.remove('error');
    invalid.setAttribute('style', 'display: block');
}

function checkInput(form) {
    var formElement = document.getElementById(form)
    var inputElements = formElement.querySelectorAll('input')

    inputElements.forEach(function (item) {
        item.oninput = function () {
            item.parentElement.classList.remove('error');
            item.parentElement.classList.remove('success');
            var divElements = formElement.querySelectorAll('.form_group');
            divElements.forEach(function (item) {
                item.querySelector('i').style.display = 'none';
            })
            item.parentElement.querySelector('.form_message').innerHTML = '';

            if (name2.value === '') {
                setError(name2, 'Enter your name please!');
            } else if (name2.value.length < 6 || name2.value.length > 20) {
                setError(name2, 'Enter your name more than 6 to 20 character please!');
            } else if (!isUserName(name2.value)) {
                setError(name2, 'This is not your name');
            } else {
                setSuccess(name2, '');
            }
        
            if (pass2.value === '') {
                setError(pass2, 'Enter password please!');
            } else if (pass2.value.length < 6 || pass2.value.length > 12) {
                setError(pass2, 'Enter your password must be between 6 and 12 characters!');
            } else if (!isPassword(pass2.value)) {
                setError(pass2, 'Password must contain uppercase first letter and number');
            } else {
                setSuccess(pass2, '');
            }
        
            if (passConfirm.value === '') {
                setError(passConfirm, 'Enter your password!')
            } else if (passConfirm.value !== pass2.value) {
                setError(passConfirm, 'Enter the same password')
            } else if (passConfirm.value.length < 6 || passConfirm.value.length > 12) {
                setError(passConfirm, 'Enter the same password');
            } else {
                setSuccess(passConfirm, '');
            }
        
            if (phone.value === '') {
                setError(phone, 'Enter your phone number please!')
            } else if (!isPhone(phone.value)) {
                setError(phone, 'This is not your phone number')
            } else {
                setSuccess(phone, '')
            }
        
            if (add.value === '') {
                setError(add, 'Enter your address!')
            } else if (!isAddress(add.value)) {
                setError(add, 'Enter your address more than 20 characters')
            } else {
                setSuccess(add, '')
            }
        }
    })
}

checkInput('form_2');


// change dark and light mode
var darkModeClick = document.querySelector('.dark-mode-click');
var bodyElement = document.querySelector('body');

darkModeClick.addEventListener('click', function () {
    if (bodyElement.classList.contains('dark') === false) {
        bodyElement.classList.add('dark');
        darkModeClick.innerHTML = 'Light mode';
    } else {
        bodyElement.classList.remove('dark');
        darkModeClick.innerHTML = 'Dark mode';
    }
})


// form login animation
var modalForm = document.querySelector('.modal');
var showForm = document.querySelector('.form_login');
var closeForm = document.querySelector('.close');

showForm.addEventListener('click', function (e) {
    e.preventDefault();
    modalForm.setAttribute('style', 'display: block;');
    var formGroupList = modalForm.querySelectorAll('.form_group');
    formGroupList.forEach(function (item) {
        if (item.classList.contains('error') === true) {
            item.classList.remove('error');
            item.querySelector('.form_message').innerHTML = '';
            item.querySelector('i').style = 'display: none';
        } else if (item.classList.contains('success') === true) {
            item.classList.remove('success');
            item.querySelector('.form_message').innerHTML = '';
            item.querySelector('i').style = 'display: none';
        } else {}
    })
});

closeForm.addEventListener('click', function (e) {
    e.preventDefault();
    modalForm.classList.add('out');
    setTimeout(function () {
        modalForm.setAttribute('style', 'display: none;');
        modalForm.classList.remove('out');
    }, 700)
});
