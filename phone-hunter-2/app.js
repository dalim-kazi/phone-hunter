const phoneHunter =async (search ,datalimet) => {
    url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhone(data.data,datalimet)
}
const displayPhone = (phoneData ,datalimet) => {
    const phoneHunterDisplay = document.getElementById('phone-container') 
    phoneHunterDisplay.innerHTML = ''
    // show 20 phone
    // phoneData = phoneData.slice(0, 10)
    const showAll = document.getElementById('show-all')
    if (datalimet && phoneData.length >10) {
        phoneData = phoneData.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }
     
    // show no phone
    const noPhone = document.getElementById('no-phone')
    if (phoneData.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none')
    }
    phoneData.forEach(phone => {
        console.log(phone)
        const phoneListDiv = document.createElement('div');
        phoneListDiv.classList.add('col')
        phoneListDiv.innerHTML = `
        <div class="card p-3 w-52 h-52 mx-5 mt-5">
          <img class="img-iphone w-32 h-32" src="${phone.image}" class="card-img-top" alt="">
          <div class="card-body">
            <h2 class="card-title">${phone.brand}</h2>
            <h5>${phone.phone_name}</h5>
            <button onclick="showPhoneAllDetails('${phone.slug}')" type="button" class="btn btn-primary  px-5" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">all deteils</button>
          </div>
        </div>
       
        `
        phoneHunterDisplay.appendChild(phoneListDiv)
    });
    toggleSpinner(false)
}
const showAllPhone = datalimet => {
    toggleSpinner (true)
    const searchInputText = document.getElementById('input-field')
    const newText = searchInputText.value
    searchInputText.value =''
    phoneHunter(newText,datalimet)
}

document.getElementById('search-btn').addEventListener('click', function () {
    showAllPhone(10)
});

document.getElementById('input-field').addEventListener('keypress', function (e) {
     
    if (e.key === 'Enter') {
      // code for enter
      showAllPhone(10)
    }
     
});

const toggleSpinner = loading => {
    const spinnerLoad = document.getElementById('spinner-loading')
    if (loading) {
        spinnerLoad.classList.remove('d-none')
    }
    else {
        spinnerLoad.classList.add('d-none')
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    showAllPhone()
});

const showPhoneAllDetails =async id => {
    url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    phoneDateils(data.data)
}
const phoneDateils = phone => {
    console.log(phone)
    const phoneDateilsTittle = document.getElementById('exampleModalToggleLabel')  
    phoneDateilsTittle.innerHTML = `
       <img class="img-iphone" src="${phone.image}" class="card-img-top" alt="">  
        `
    const phoneDateils = document.getElementById('phone-dateils')
    phoneDateils.innerHTML = `
    <h5>phone little : ${phone.name}</h5> 
   <p>chipSet: ${phone.mainFeatures? phone.mainFeatures.chipSet: 'no chipSet'}   </p>
   <p> displaySize: ${phone.mainFeatures? phone.mainFeatures. displaySize : 'no  displaySize'}   </p>
   <p>memory: ${phone.mainFeatures? phone.mainFeatures.memory: 'no memory'}   </p>
   <p>storage: ${phone.mainFeatures? phone.mainFeatures.storage: 'no storage'}   </p>
   <p>releaseDate
   : ${phone.releaseDate ? phone.releaseDate : 'no releaseDate'}   </p>
   <button type="button" class="btn btn-success">Buy Now</button>
    `
  }
phoneHunter('samsung');