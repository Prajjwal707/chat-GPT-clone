const searchBox = document.getElementById("searchBox");
const productCardsContainer = document.getElementById("productCards");

async function fetchProducts() {
    try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        return products.products; 
    } catch (error) {
        console.error('Error fetching products:', error);
        return []; 
    }
}

function displayProducts(products) {
    productCardsContainer.innerHTML = ""; 
    if (products.length === 0) {
        productCardsContainer.innerHTML = "<p>No products found.</p>";
        return;
    }
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <div class="price">$${product.price}</div>
        `;
        productCardsContainer.appendChild(productCard);
    });
}

searchBox.addEventListener("input", async function () {
    const searchQuery = searchBox.value.toLowerCase();
    const products = await fetchProducts();
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery)
    );
    displayProducts(filteredProducts);
});

fetchProducts().then(displayProducts);