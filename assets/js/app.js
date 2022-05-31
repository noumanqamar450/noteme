let loginbtn = document.querySelector('#login');
loginbtn.addEventListener("click", function () {
    document.querySelector('.login').classList.add('active');
    document.querySelector('.signup').classList.remove('active');
    document.querySelector('.overlay').style.display = 'flex';
});

let signupbtn = document.querySelector('#signup');
signupbtn.addEventListener("click", function () {
    document.querySelector('.signup').classList.add('active');
    document.querySelector('.login').classList.remove('active');
    document.querySelector('.overlay').style.display = 'flex';
});

let closebtn = document.querySelector('#close');
closebtn.addEventListener("click", function () {
    document.querySelector('.login').classList.remove('active');
    document.querySelector('.signup').classList.remove('active');
    document.querySelector('.overlay').style.display = 'none';
    // document.querySelector('.note').style.display = 'none';
});

// menu
let collapsebtn = document.querySelector('#collapse');
collapsebtn.addEventListener("click", function () {
    document.querySelector('.collapse').classList.toggle('cactive');
    document.querySelector('.nav').classList.toggle('active');
});

// Signup
let signupform = document.querySelector('#signupform');
signupform.addEventListener("submit", function (e) {
    e.preventDefault();
    let username = document.querySelector('#susername');
    let email = document.querySelector('#semail');
    let pass = document.querySelector('#spass');
    let re_pass = document.querySelector('#sre-pass');

    let datastore = localStorage.getItem('signup') ? JSON.parse(localStorage.getItem('signup')) : [];
    localStorage.setItem('signup', JSON.stringify(datastore));

    let signUpData = JSON.parse(localStorage.getItem('signup')) || [];

    let exist = signUpData.length &&
        JSON.parse(localStorage.getItem('signup')).some(data =>
            data.email == email.value
        );

    if (username.value == '') {
        alert('Please enter the username.');
        username.focus();
        username.select();
    } else if (email.value == '') {
        alert('Please enter the email.');
        email.focus();
        email.select();
    } else if (pass.value == '') {
        alert('Please enter the password.');
        pass.focus();
        pass.select();
    } else if (re_pass.value == '') {
        alert('Please enter the Re-password.');
        re_pass.focus();
        re_pass.select();
    } else if (pass.value != re_pass.value) {
        alert('The password does not match.');
        pass.focus();
        pass.select();
    } else if (pass.value.length < 8) {
        alert('Please enter the password more then 8 character.');
        pass.focus();
        pass.select();
    } else {
        if (!exist) {
            let data = {
                username: username.value,
                email: email.value,
                pass: pass.value,
                status: '0'
            }
            datastore.push(data);
            localStorage.setItem('signup', JSON.stringify(datastore));
            document.getElementsByClassName('signup')[0].innerHTML = '<h3> Sign Up have been successfully</h3>';
            setInterval(windowrefresh, 2000);
        } else {
            alert('Sorry, this email already exist.');
            email.focus();
            email.select();
        }

    }


});





// Login
let loginform = document.querySelector('#loginform');
loginform.addEventListener("submit", function (e) {
    e.preventDefault();
    let email = document.getElementById('email').value;
    let pass = document.getElementById('pass').value;
    // input select
    let emailselect = document.getElementById('email');
    let passselect = document.getElementById('pass');


    let getEmailPass = JSON.parse(localStorage.getItem('signup')) || [];
    let getEmailCheck = getEmailPass.length && JSON.parse(localStorage.getItem('signup')).some(data => data.email == email);
    if (!email) {
        emailselect.select();
    } else if (!pass) {
        passselect.select();
    } else {
        if (getEmailCheck) {
            let getEmail = getEmailPass.length && JSON.parse(localStorage.getItem('signup')).filter(data => data.email == email);
            // let getPass = getEmailPass.length && JSON.parse(localStorage.getItem('signup')).filter(data => data.pass == pass);
            let getPass = getEmail[0].pass;
            getEmail = getEmail[0].email;

            if (getEmail === email && getPass === pass) {
                let getData = localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')) : [];
                localStorage.setItem('login', JSON.stringify(getData));

                let data = {
                    email: email,
                    status: "1"
                };

                getData.push(data);
                localStorage.setItem('login', JSON.stringify(getData));
                setInterval(windowrefresh, 2000);

            } else {
                alert('Incorrect password, please enter correct password.');
                emailselect.select();
            }
        } else {
            alert('Incorrect email, please enter correct email.');
        }
    }

});


// Login check
let email = '';
let status = '';

function logInCheck() {
    let getLogin = JSON.parse(localStorage.getItem('login'));

    if (getLogin) {
        getLogin.forEach(element => {
            email = element.email;
            status = element.status;
        });

    }

    document.getElementById('user').value = email;
    if (status == "1") {
        document.getElementsByClassName('home')[0].style.display = "none";
        document.getElementsByClassName('notepad-area')[0].style.display = "block";
        document.getElementById('signupbtn').style.display = "none";
    } else {
        document.getElementById('logoutbtn').style.display = "none";
    }



}
logInCheck();
console.log(email);
console.log(status);

let logout = document.getElementById('logout');
logout.addEventListener('click', function () {
    let confirmlogout = confirm('Are you sure?');
    if (confirmlogout) {
        localStorage.removeItem('login');
        setInterval(windowrefresh, 2000);
    }

});



function windowrefresh() {
    location.reload();
}


// Create Note
// let noteForm = document.getElementById('notepad');
// noteForm.addEventListener("click", function(e) {
function noteCreate(e) {
    e.preventDefault();
    let user = document.getElementById('user').value;
    let title = document.getElementById('title').value;
    let note = document.getElementById('note').value;
    // input select
    let titleselect = document.getElementById('title');
    let noteselect = document.getElementById('note');

    let getData = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
    localStorage.setItem("notes", JSON.stringify(getData));

    // let lengthCheck = JSON.parse(localStorage.getItem('notes')).length;
    // let ids = "0";
    ids = Math.random().toString(36).substr(2, 18);

    console.log(ids);
    let data = {
        id: ids,
        user: user,
        title: title,
        note: note
    };
    if (!title) {
        alert("Please add title.")
        titleselect.select();
        titleselect.focus();
    } else if (!note) {
        alert("Please write note.")
        noteselect.select();
        noteselect.focus();
    } else {
        if (data) {
            getData.push(data);
            localStorage.setItem("notes", JSON.stringify(getData));
            clearFrom();
            dataRender();
            document.querySelector('.note').style.display = 'none';
        }
    }

};

function clearFrom() {
    let title = document.getElementById('title').value = '';
    let note = document.getElementById('note').value = '';
}

// get Notes
function dataRender() {
    // let getData = JSON.parse(localStorage.getItem('notes'));
    let email = document.getElementById('user').value;
    let getData = JSON.parse(localStorage.getItem('notes')) ? JSON.parse(localStorage.getItem('notes')).filter(notes => notes.user === email) : '';

    let output = document.getElementsByClassName('notedisplay')[0];
    let htmlInner = ''

    if (getData && getData != "") {
        getData.forEach(element => {
            htmlInner += `
        <div class="notepad">
            <h2>${element.title}</h2>
            <hr>
            <p>${element.note}</p>
            <div class="edit" onclick="updateData('${element.id}')">
                <i class="fa fa-pencil" aria-hidden="true"></i>
            </div>
            <div class="delete" onclick="dataDelete('${element.id}')">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </div>
        </div>
        `;

            // output

            output.innerHTML = htmlInner;
        });
    } else {
        output.innerHTML = `
        <div class="notepad">
        <img src="./assets/images/note.png" width="100%">
        <button onclick="createnote()">Create First Note</button>
        </div>
        `;
    }

}
dataRender();

// Data Delete
function dataDelete(i) {

    let confirmdelete = confirm('Are you sure?');
    if (confirmdelete) {
        let getData = JSON.parse(localStorage.getItem('notes'));
        let index = getData.findIndex(object => {
            return object.id === i;
        });

        getData.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(getData));
        dataRender();
    }

}

// Data Edit
function updateData(i) {
    let datafetch = localStorage.getItem('notes');
    datafetch = JSON.parse(datafetch);
    let index = datafetch.findIndex(object => {
        return object.id === i;
    });
    document.getElementById('notepaduser').innerHTML = `
    <input type="hidden" id="noteid" value="${datafetch[index].id}">`;

    document.getElementById('title').value = datafetch[index].title;
    document.getElementById('note').value = datafetch[index].note;
    document.getElementsByClassName('btn')[0].innerHTML = `
        <button onclick="update(${index},event)">Update</button>
    `;
    document.querySelector('.note').style.display = 'flex';
}

function update(i, e) {
    e.preventDefault();
    let datafetch = localStorage.getItem('notes');
    datafetch = JSON.parse(datafetch);
    let id = document.getElementById('noteid').value;
    let user = document.getElementById('user').value;
    let title = document.getElementById('title').value;
    let note = document.getElementById('note').value;
    // input select
    let titleselect = document.getElementById('title');
    let noteselect = document.getElementById('note');
    let data = {
        id,
        user,
        title,
        note
    };

    if (!title) {
        alert("Please add title.")
        titleselect.select();
        titleselect.focus();
    } else if (!note) {
        alert("Please write note.")
        noteselect.select();
        noteselect.focus();
    } else {
        datafetch.splice(i, 1, data);
        localStorage.setItem('notes', JSON.stringify(datafetch));
        dataRender();
        clearFrom();
        document.getElementById('notepaduser').innerHTML = ``;
        document.getElementsByClassName('btn')[0].innerHTML = `
        <button onclick="noteCreate(event)">Add</button>
    `;
        document.querySelector('.note').style.display = 'none';
    }

}

// note form display

function createnote() {
    document.querySelector('.note').style.display = 'flex';

};
let closexbtn = document.querySelector('#closex');
closexbtn.addEventListener("click", function () {
    document.querySelector('.note').style.display = 'none';
});