
document.getElementById("login-btn").addEventListener("click",function(){
    const user = document.getElementById("username");
    const userInput = user.value;
    
    const password = document.getElementById("passId");
    const passInput = password.value;

    if (userInput == "admin" && passInput == "admin123"){
        alert("Login success");
        window.location.assign("home.html")
    }else{
        alert("login Failed");
        return;
    }
});