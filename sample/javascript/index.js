document.getElementById("signup-button").onclick = function() {
    location.href = "create-user.html";
};

/*var idFunc = function(id) {
    return document.getElementById(id);
}

var loginUser = function() {
    var emailAddress = idFunc("email").value;
    var password = idFunc("password").value;
    var isValid = true;
    
    if (emailAddress == '') {
        idFunc("email-required").firstChild.nodeValue = 'Provide your email address';
        
        isValid = false;
    } else {
        idFunc("email-required").firstChild.nodeValue = '';
    }
    
    if (password == '') {
        idFunc("email-required").firstChild.nodeValue = 'Provide your password';
        
        isValid = false;
    } else {
        idFunc("password-required").firstChild.nodeValue = '';
    }
    
    if (isValid)
        idFunc("login-form").submit();
};
window.onload = function() {
    idFunc("login-button").onclick = loginUser;
    idFunc("email").focus();
};*/