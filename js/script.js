let cardContainer = document.querySelector('.container');
let api = 'https://lanciweb.github.io/demo/api/pictures/';
let overlayElement = document.querySelector('.overlay-container');
axios.get(api)
    .then(response => {
        const result = response.data;
        console.log(result);

        result.forEach((res, i) => {

            let card = document.createElement('div');
            card.classList.add('box', 'text-center');
            card.innerHTML = `
                        <div class="img-container">
                            <img src="${result[i]['url']}" alt="${result[i]['title']}">
                        </div>
                        <div class="mt-2">
                            <span class="description text-secondary">${result[i]['date']}</span><br>
                        <span class="description">${result[i]['title']}</span>
                        </div>
                        <img src="img/pin.svg" alt="pin" class="pin">`;
            cardContainer.appendChild(card);

            card.addEventListener('click', () => {
                console.log('indice:', i);
                console.log('nome', res.title);
                openOverlay(res);
            })
        });

        function openOverlay(res) {  
            overlayElement.innerHTML = `
                <div class="opacity-overlay"></div>    
                <div class="overlay">
                    <button class="button-close">click close</button>
                    <div class="img-container-overlay">
                        <img src="${res['url']}" alt="${res['title']}">
                    </div>
                </div>`;

            document.querySelector('body').className = "black-body";

            let btnClose = document.querySelector('.button-close');
            btnClose.addEventListener('click', closeOverlay);
            
        }

        function closeOverlay() {
            overlayElement.innerHTML = '';

            document.querySelector('body').classList.remove("black-body");
            document.querySelector('body').classList.add("bg-body");
        }

    })
    .catch(error => {
        console.error(error);
        let messError = document.createElement('div');
        cardContainer.classList.add('align-items-center');
        document.querySelector('body').classList.remove('bg-body');
        document.querySelector('body').classList.add('bg-error-body');
        document.querySelector('header').classList = "d-none";
        messError.innerHTML = `<div class="p-3 bg-dark text-primary text-center fs-5 border border-dark rounded-3">
                                        <p>There is a problem. 
                                        <span class= "text-danger">${error} </span>                                      
                                        Please reload the page or consult the developer of the page;</p>
                                    </div>`;
        cardContainer.appendChild(messError);
    });
