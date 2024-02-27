const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
   const phones = data.data;
   displayPhones(phones, isShowAll);
}
const displayPhones = (phones,isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = ''
    //    show all phones
    const showBtn = document.getElementById('show-all')
    if(phones.length > 12 && !isShowAll) {
        showBtn.classList.remove('hidden')
       } else {
        showBtn.classList.add('hidden')
       }
    if(!isShowAll){
        phones = phones.slice(0, 6)
    }
   
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-base-100 shadow-xl  m-3`
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body text-center">
          <h2 class="text-[25px] text-[800] text-center">${phone.phone_name}</h2>
          <p class="text-[25px] text-bold text-center">$ 200</p>
          <div class="card-actions justify-center">
            <label for="my_modal_6" onClick="handleShowDetails('${phone.slug}')" class="btn text-white bg-[#0D6EFD]">Show Details</label>
          </div>
        </div>
     
        `
        phoneContainer.appendChild(phoneCard)
    })
    // hide loading indicator
    toggleLoadingSpinner(false)
}
// handleshowdetails
const handleShowDetails =async (id) => {
    const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;
    console.log(phone)
    displayShowDetails(phone);
}
const displayShowDetails = phone => {
    const modal = document.getElementById('modal');
    const container = document.createElement('div');
    container.innerHTML = `
    <input type="checkbox" id="my_modal_6" class="modal-toggle" />
    <div class="modal" role="dialog">
      <div class="modal-box">
        <h3 class="font-bold text-lg">${phone.name}</h3>
        <p class="py-4">This modal works with a hidden checkbox!</p>
        <div class="modal-action">
          <label for="my_modal_6" class="btn">Close!</label>
        </div>
      </div>
    </div>
    `
    modal.appendChild(container);
}
// search area

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchText = document.getElementById('search-filed').value;
    loadPhone(searchText, isShowAll)
    
}

// loading spinner

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinener = document.getElementById('loading-spiner')
    if(isLoading) {
        loadingSpinener.classList.remove('hidden')
    } else {
        loadingSpinener.classList.add('hidden') 
    }
    
}

// handle show all data

const handleShowAll = () => { 
    handleSearch(true)
}