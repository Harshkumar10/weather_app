
//client side java script
//fetch is browser property

const weatherForm=document.querySelector('form');
const search  = document.querySelector('input');
const messageOne  = document.querySelector('#message-1');
const messageTwo  = document.querySelector('#message-2');

//messageOne.textContent = 'from javascript';
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location  = search.value;
    //heruko url
    const url='/weather?address='+location;
    fetch(url).then((response) =>{
    response.json().then((data)=>{
        if(data.error)
        {
            messageOne.textContent=data.error;
            messageTwo.textContent='';
        }
        else
        {
            messageOne.textContent=data.location;
            messageTwo.textContent=data.forecast;
        }
    })
})
})