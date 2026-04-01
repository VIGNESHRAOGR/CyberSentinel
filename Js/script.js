function loginUser(event){

event.preventDefault();

let username = document.getElementById("username").value;
let password = document.getElementById("password").value;

if(username === "admin" && password === "1234"){

localStorage.setItem("loggedIn", "true");

window.location.href = "dashboard.html";

}
else{

alert("Invalid Login");

}

}