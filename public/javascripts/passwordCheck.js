function passwordCheck(postData) {
    var password = document.querySelector("#id02 > div > div:nth-child(2) > input[type=password]:nth-child(6)").value;
    var confirmPassword = document.querySelector("#id02 > div > div:nth-child(2) > input[type=password]:nth-child(8)").value;

    if (password == "") {
        alert("Error: The password field is Empty.");
    } else if (password == confirmPassword) {
        var request = require('request');
        function updateClient(postData) {
            var clientServerOptions = {
                uri: 'http://localhost:3000/register',
                body: JSON.stringify(postData),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            request(clientServerOptions, function (error, response) {
                console.log(error, response.body);
                return;
            });
        }

    } else {
        alert("Please make sure your passwords match.")
    }
}