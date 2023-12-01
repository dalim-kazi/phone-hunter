const getIphoneLoad =async (search, limetData) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const response = await fetch(url)
    const data = await response.json()
    displayLoad(data.data, limetData)
}

const displayLoad = (iphoneData, limetData) => {
    const iphoneContainer = document.getElementById('iphone-container');
    iphoneContainer.innerHTML = '';
   
    // data limet procces / more all
    const moreAll = document.getElementById('more-all');
    if (limetData && iphoneData.length > 10) {
        iphoneData = iphoneData.slice(0, 10)
        moreAll.classList.remove('hidden')
    }
    else {
        moreAll.classList.add('hidden')
    }
    // display none
    const noPhone = document.getElementById('no-massages')
    if (iphoneData.length === 0) {
        noPhone.classList.remove('hidden')
    }
    else {
        noPhone.classList.add('hidden')
    }
    iphoneData.forEach(iphone => {
        console.log(iphone)
        const iphoneListDiv = document.createElement('div');
        iphoneListDiv.classList.add('phone');
        iphoneListDiv.innerHTML = `
        <img class="phone-img" src="${iphone.image}" alt="">
        <div class="text-phone">
            <h1>Barnd: ${iphone.brand}</h1>
            <h5>Phone-name: ${iphone.phone_name}</h5>
             <p>Slug: ${iphone.slug}</p>
         </div>
        `
        iphoneContainer.appendChild(iphoneListDiv);
    });
}

const proccessData = limetData=> {
    const inputField = document.getElementById('input-field');
    const newText = inputField.value;
    inputField.value = '';
    getIphoneLoad(newText, limetData)
}

document.getElementById('search-btn').addEventListener('click', function () {
    proccessData(10);
})
 
document.getElementById('more-all-btn').addEventListener('click', function () {
    proccessData();
})
 
// getIphoneLoad('');