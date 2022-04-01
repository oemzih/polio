const firebaseConfig = {
    apiKey: "AIzaSyDqujJPBTh46vYJhvo5YSsuBhMz5eaMBpc",
    authDomain: "abh1ram.firebaseapp.com",
    projectId: "abh1ram",
    storageBucket: "abh1ram.appspot.com",
    databaseURL: "https://abh1ram-default-rtdb.firebaseio.com/",
    messagingSenderId: "1002929451452",
    appId: "1:1002929451452:web:03a4e6ab5489e4a3be7bb9",
    measurementId: "G-RG3NGCJ1J8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactform").addEventListener("submit", submitForm);

window.addEventListener('load', function () {
    console.log('All assets are loaded ss')
    const dbRef = firebase.database().ref("Assets");
    dbRef.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();

            if (childData != null) {
                document.getElementById(childSnapshot.key).href =  childData
            }
        });
    });
})

function submitForm(e) {
    e.preventDefault();

    var name = getElementVal("name");
    var emailid = getElementVal("emailid");
    var msgContent = getElementVal("msgContent");
    if (name.trim().length != 0 && emailid.trim().length != 0 && msgContent.trim().length != 0) {
        saveMessages(name, emailid, msgContent);
        //   enable alert
        document.getElementById("GFG").innerHTML = name + ", Your message was sent!"


        document.querySelector(".alert").style.display = "block";

        //   remove the alert
        setTimeout(() => {
            document.querySelector(".alert").style.display = "none";
        }, 3000);

        //   reset the form
        document.getElementById("contactform").reset();
    }
    else {
        document.getElementById("GFG").innerHTML = name + "Please fill in all the fields."


        document.querySelector(".alert").style.display = "block";

        //   remove the alert
        setTimeout(() => {
            document.querySelector(".alert").style.display = "none";
        }, 3000);
    }
}

const saveMessages = (name, emailid, msgContent) => {
    try {
        var newContactForm = contactFormDB.push();

        newContactForm.set({
            UserName: name,
            EmailID: emailid,
            ProjectDetails: msgContent,
        });
    }
    catch (e) {
        console.log(e);
    }
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};