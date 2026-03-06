
//from er js
const from = document.getElementById("sign-in").addEventListener("click",function () {
    const inputName = document.getElementById("input-name");
    const name = inputName.value;
    //console.log(name);

//pin
const clickPassword  = document.getElementById("password")
    const adminPassword = clickPassword.value;
    //console.log(adminPassword);

    
if(name == "admin" && adminPassword == "admin123") {
    alert("login")
    window.location.assign("/homepage.html")

}   
else{
    alert("not matched")
    return
}
});

//GitHub Issues Tracker
