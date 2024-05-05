// SOURCE: https://www.w3resource.com/javascript-exercises/javascript-string-exercise-28.php
function hex_to_ascii(str1) {
    // Convert the input hexadecimal string to a regular string
    var hex = str1.toString();
    // Initialize an empty string to store the resulting ASCII characters
    var str = '';
    // Iterate through the hexadecimal string, processing two characters at a time
    for (var n = 0; n < hex.length; n += 2) {
        // Extract two characters from the hexadecimal string and convert them to their ASCII equivalent
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    // Return the resulting ASCII string
    return str;
}

const delay = ms => new Promise(res => setTimeout(res, ms));
const getTransInfo = async (link) => {
    await delay(1000);
    const docContent = document.getElementById('content');
    //whitelist = ['13jetMiegDDNA36zz7KxbLCh9hH1wafuDy'];
    whitelist = ['1NeFJTqhCQs7qnjot5mCAszyKQQWScUwfr'];
    //whitelist = ['13jetMiegDDNA36zz7KxbLCh9hH1wafuDy', '1NeFJTqhCQs7qnjot5mCAszyKQQWScUwfr'];

    $.ajax({
        url:'https://api.whatsonchain.com/v1/bsv/main/tx/hash/' + link.tx_hash,
        type: 'GET',
        dataType: 'json',
        success: function (data) { 

            //Data of the sent transaction
            var vout = (data.vout);

            //We confirm if the sender´s address is whitelisted
            //This method of obtaining the sender address is done this way due to WOC API´s behavior
            var sender_content = vout[(vout.length-1)];
            var sender_addr = Object.values(Object.values(sender_content)[2])[4][0];
            if(whitelist.includes(sender_addr)){
            var scriptPubKey = vout[0];
            var valuess= Object.values(scriptPubKey);
            //We obtain the "OP_RETURN"
            op_return = Object.values(valuess[2])[0]; 

            //Remove blankspaces and string "OP_RETURN"
            op_return = op_return.replaceAll(" ", '');
            op_return = op_return.replaceAll("OP_RETURN", '');
            //GET Data sent in hex to JSON format
            var data_sent = JSON.parse(hex_to_ascii(op_return));

            
                //Create the content
                const newDiv = document.createElement("div");
                const father = document.createElement("div");
                father.className = 'father';
                var newContent = document.createElement("div");
                var descripcion = document.createElement("div");
                var bsvaddr = document.createElement("div");
                newContent.innerText = 'Vendor: ' + data_sent.vendor;
                descripcion.innerText = 'Description: ' + data_sent.description;
                bsvaddr.innerText = 'BSV Address: ' + sender_addr;
                
                //Generate the download url
                var button = document.createElement('button');
                var div_btn = document.createElement('div');
                div_btn.className = 'download';
                var download = document.createElement('a');
                var first ='http://127.0.0.1:8080/ipfs/';
                var last ='?download=true&filename=';
                var hash = data_sent.hash;
                var truename = data_sent.real_name;
                var result =  first + hash + last + truename;
                //var result = 'http://127.0.0.1:8080/ipfs/QmVGAK5HmWurCRtSMHoijyirbrZRKex9Wesb33x1yyE82p?download=true&filename=arreglos.js';
                download.setAttribute('href', result);
                download.setAttribute('target', '_blank');
                download.innerText = 'Download';
                button.appendChild(download);
                div_btn.appendChild(button);
                
                
                //Append the content to the document
                newDiv.appendChild(newContent);
                newDiv.appendChild(descripcion);
                newDiv.appendChild(bsvaddr);
                newDiv.appendChild(div_btn);
                father.appendChild(newDiv);
                docContent.appendChild(father);
                
            }
            
        }
    });
    await delay(1000);
  };




$(document).ready(function() {

    $("#generate").on("click", function(){



    var x;
    //We obtain all the unspent transactions from our server BSV address
    $.ajax({
        url:'https://api.whatsonchain.com/v1/bsv/main/address/1GNkW9xS4rHswpiePoAhjbqG4wrBbHK7yj/unspent',
        type: 'GET',
        dataType: 'json',
        success: function (data) { 
            data.forEach(function(link) {
                
                //We obtain the information of each transaction to get the op_return or the data sent     
                x = getTransInfo(link);

            });
        }
    });

    
    
    
     
    
    





//FIN
    });
});