const handleQr = () => {
    const url = document.getElementById("url").value.trim();

    if(!url){
        return alert("Provide a valid URL");
    }

    document.getElementById('QR').innerHTML="";

    try{
        new QRCode(document.getElementById('QR'),{
            text: url,
            width: 250,
            height: 250,
            colorDark: "#000000",
            colorLight: "#ffffff"
        })
    }
    catch(err){
        console.log(err);
    }
}

const handleChange = () =>{
    document.getElementById('QR').innerHTML="";
}
