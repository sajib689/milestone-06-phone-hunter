const loadPhone = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    const data = await res.json();
   const phones = data.data;
   displayPhones(phones);
}
const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phones.forEach(phone => {
        console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-base-100 shadow-xl  m-3`
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body text-center">
          <h2 class="text-[25px] text-[800] text-center">${phone.phone_name}</h2>
          <p class="text-[25px] text-bold text-center">$ 200</p>
          <div class="card-actions justify-center">
            <button class="btn text-white bg-[#0D6EFD]">Show Details</button>
          </div>
        </div>
     
        `
        phoneContainer.appendChild(phoneCard)
    })
}
loadPhone()