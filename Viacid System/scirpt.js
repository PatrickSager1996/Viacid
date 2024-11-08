//Suchfunktion
function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const productList = document.querySelectorAll('#productList data');
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Vorherige Ergebnisse leeren

    productList.forEach(product => {
        const productName = product.textContent.toLowerCase();
        if (productName.includes(searchInput)) {
            const li = document.createElement('li');
            const productPrice = product.getAttribute('data-price');
            const productExpiry = product.getAttribute('data-expiry');
            const productLink = product.parentElement.href; // Link des Produkts
            const productImage = product.parentElement.querySelector('img').src; // Bild des Produkts
            
            li.innerHTML = `
                <img src="${productImage}" alt="${productName}" width="${productName}">
                Produkt: ${product.textContent} (Artikelnummer: ${product.getAttribute('value')}). <a href="${productLink}">Mehr erfahren</a>`;
            resultsContainer.appendChild(li);
        }
    });

    if (resultsContainer.innerHTML === '') {
        resultsContainer.innerHTML = '<li>Keine Ergebnisse gefunden</li>';
    }

    document.addEventListener('click', function(event) {
        const searchInput = document.getElementById('searchInput');
        const resultsContainer = document.getElementById('searchResults');
        
        // Überprüfen, ob der Klick außerhalb des Suchfeldes und der Ergebnisliste war
        if (!searchInput.contains(event.target) && !resultsContainer.contains(event.target)) {
            resultsContainer.innerHTML = ''; // Suchergebnisse löschen
        }
    });
}

//Kachel eins Scrollen
let isDragging = false;
let startX;
let scrollLeft;

const mainContainer = document.querySelector('.kachcontainer-one');
const scrollContainer = document.querySelector('.grid-container-one');

// Funktion für das Starten des Draggens
function startDrag(e) {
  isDragging = true;
  startX = (e.pageX || e.touches[0].pageX) - mainContainer.offsetLeft;
  scrollLeft = scrollContainer.getBoundingClientRect().left;
  mainContainer.style.cursor = 'grabbing';
  e.preventDefault(); // Verhindert das Standardverhalten des Browsers
}

// Funktion für das Beenden des Draggens
function endDrag() {
  isDragging = false;
  mainContainer.style.cursor = 'grab';
}

// Funktion für das Bewegen während des Draggens
function dragMove(e) {
  if (!isDragging) return;

  e.preventDefault(); // Verhindert das Standard-Scrolling-Verhalten während des Ziehens
  const x = (e.pageX || e.touches[0].pageX) - mainContainer.offsetLeft;
  const walk = (x - startX) * 2; // Geschwindigkeit des Scrollens

  const maxLeft = 0;
  const maxRight = -(scrollContainer.scrollWidth - mainContainer.clientWidth);

  let newScrollPosition = scrollLeft + walk;
  if (newScrollPosition > maxLeft) newScrollPosition = maxLeft;
  if (newScrollPosition < maxRight) newScrollPosition = maxRight;

  scrollContainer.style.transform = `translateX(${newScrollPosition}px)`;
}

// Mouse Events
mainContainer.addEventListener('mousedown', startDrag);
mainContainer.addEventListener('mouseup', endDrag);
mainContainer.addEventListener('mouseleave', endDrag);
mainContainer.addEventListener('mousemove', dragMove);

// Touch Events für mobile Geräte (z.B. iPad)
mainContainer.addEventListener('touchstart', startDrag, { passive: false });
mainContainer.addEventListener('touchend', endDrag);
mainContainer.addEventListener('touchmove', dragMove, { passive: false });