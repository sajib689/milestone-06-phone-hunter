const loadPhone = async (searchText = '13', isShowAll) => {
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
            <button  onClick=" handleShowDetails('${phone.slug}'); my_modal_5.showModal()" class="btn text-white bg-[#0D6EFD]">Show Details</button>
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
    const container = document.createElement('dialog');
    container.setAttribute("id", "my_modal_5");
    container.classList.add('modal', 'modal-bottom', 'sm:modal-middle');

    container.innerHTML = `
    <div class="modal-box">
          <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <h3 class="font-bold text-lg">${phone.name}</h3>
        <h3 class="font-bold text-lg">Storage: ${phone.mainFeatures.storage}</h3>
        <h3 class="font-bold text-lg">Display Size: ${phone.mainFeatures.displaySize}</h3>
        <h3 class="font-bold text-lg">Chipset: ${phone.mainFeatures.chipSet}</h3>
        <h3 class="font-bold text-lg">Memory: ${phone.mainFeatures.memory}</h3>
        <h3 class="font-bold text-lg">Slug: ${phone.slug}</h3>
        <h3 class="font-bold text-lg">Release data: ${phone.releaseDate}</h3>
        <h3 class="font-bold text-lg">Brand: ${phone.brand}</h3>
        <h3 class="font-bold text-lg">GPS: ${phone.mainFeatures.GPS}</h3>
        
        <div class="modal-action">
            <form method="dialog">
                <button class="btn" onclick="document.getElementById('my_modal_5').close()">Close</button>
            </form>
        </div>
    </div>
    `;

    document.body.appendChild(container); // Add the dialog to the document
    container.showModal(); // Show the dialog
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
loadPhone()