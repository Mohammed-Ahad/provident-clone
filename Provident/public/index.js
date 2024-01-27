const sendMail = async (e) => {
    e.preventDefault();
    console.log(e)
    const form = e.srcElement
    const data = {
        name: form['name'].value,
        phone: form['phone'].value,
        email: form['email'].value
    }
    
    const res = await fetch('/sendMail', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });


    let text = await res.text();

    iziToast.show({
        title: 'Sucess',
        message: text,
        position: 'topCenter',
    });
    closeModal();
}

const myModel = document.getElementById('myModel')
const modelHeader = document.getElementById('modelHeader')
const modelBtn = document.getElementById('modelBtn')

const showModal = (headerTxt, btnTxt)=>{
    modelHeader.innerHTML = headerTxt
    modelBtn.innerHTML = btnTxt

    myModel.style.display = 'block'
}

let to = setInterval(()=>{
    console.log('called')
    showModal('Send Me Plan Details', 'Send Now')
}, 5000)

const closeModal = ()=>{
    clearInterval(to)
    to = setInterval(()=>{
        console.log('called')
        showModal('Send Me Plan Details', 'Send Now')
    }, 20000)
    myModel.style.display = 'none'
}

const showMenu = ()=>{
    let right = document.querySelector('nav .right')

    if(window.getComputedStyle(right).getPropertyValue('transform')[16] == 1){
        right.style.transform = 'scaleY(0)'
    }
    else{
        right.style.transform = 'scaleY(1)'
    }
}