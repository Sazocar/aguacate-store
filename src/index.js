/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = 'https://platzi-avo.vercel.app/';
const appNode = document.querySelector('#app');

const formatPrice = (price) => {
    const newPrice = new Intl.NumberFormat("en-EN", {
        style: 'currency', 
        currency: 'USD'
    }).format(price);
    return newPrice;
};


// Web Api
// Para usar Fetch() debemos:
// Conectarnos al servidor
window
    .fetch(`${baseUrl}api/avo`)
    // Procesar la respuesta, y convertirla en JSON
    .then(respuesta => respuesta.json())
// JSON -> Data -> Renderizar la info en el browser
    .then(jsonResponse => {
        const allItems = [];
        jsonResponse.data.forEach(item => {
             // Create image node
            // <img class="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6" src="avatar.jpg">
            const image = document.createElement("img");
            image.className =
            "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";
            image.src = `${baseUrl}${item.image}`;

            // Create heading
            // <h2 class="text-lg">Erin Lindford</h2>
            const title = document.createElement("h2");
            title.className = "text-lg";
            title.textContent = item.name;

            // Create Price
            // <div class="text-gray-600">(555) 765-4321</div>
            const price = document.createElement("div");
            price.className = "text-gray-600";
            price.textContent = formatPrice(item.price);

            // Wrap price & title
            // <div class="text-center md:text-left"><price ><title ></div>
            const priceAndTitle = document.createElement("div");
            priceAndTitle.className = "text-center md:text-left";
            priceAndTitle.appendChild(title);
            priceAndTitle.appendChild(price);

            // Wrap Img and priceAndTitle
            // <div class="md:flex bg-white rounded-lg p-6">
            const card = document.createElement("div");
            card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
            card.appendChild(image);
            card.appendChild(priceAndTitle);

            allItems.push(card);
        });
        
        appNode.append(...allItems);
        appNode.className = 'mt-10 grid grid-cols-2 gap2';
    });