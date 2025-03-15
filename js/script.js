let cardContainer = document.querySelector('.container');
let api = 'https://lanciweb.github.io/demo/api/pictures/';

axios.get(api)
    .then(response => {
        const result = response.data;
        console.log(result);

        for (let i = 0; i < result.length; i++) {
            console.log(result[i]);
            cardContainer.innerHTML += `
            <div class="box">
                <div class="img-container">
                    <img src="${result[i]['url']}" alt="${result[i]['title']}">
                </div>
                <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, cupiditate!</p>
                <img src="img/pin.svg" alt="pin" class="pin">
            </div>`;
        }

        // <div class="box">
        //     <div class="img-container">
        //         <img src="" alt="foto">
        //     </div>
        //     <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, cupiditate!</p>
        //     <img src="img/pin.svg" alt="pin" class="pin">
        // </div>

    })
    .catch(error => {
        console.error(error);
        let messError = document.createElement('div');
        cardContainer.classList.add('align-items-center');
        document.querySelector('body').classList.remove('bg-body');
        document.querySelector('body').classList.add('bg-error-body');
        document.querySelector('header').classList = "d-none";
        messError.innerHTML =  `<div class="p-3 bg-dark text-primary text-center fs-5 border border-dark rounded-3">
                                        <p>There is a problem. 
                                        <span class= "text-danger">${error} </span>                                      
                                        Please reload the page or consult the developer of the page;</p>
                                    </div>`;
        cardContainer.appendChild(messError);
    })