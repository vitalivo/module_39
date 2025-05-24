const loadButton = document.getElementById('loadButton');
const galleryContainer = document.getElementById('galleryContainer');
const loader = document.getElementById('loader');
const animalSelect = document.getElementById('animalSelect');

async function fetchImages(type = 'dog', limit = 20) {
  let url;

  if (type === 'dog') {
    url = `https://dog.ceo/api/breeds/image/random/${limit}`;
  } else if (type === 'cat') {
    url = `https://api.thecatapi.com/v1/images/search?limit=${limit}`;
  } else {
    throw new Error('Неподдерживаемый тип животного');
  }

  loader.style.display = 'block';
  galleryContainer.innerHTML = '';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const data = await response.json();
    const images = type === 'dog' ? data.message : data.map(item => item.url);

    images.forEach((url) => {
      const img = document.createElement('img');
      img.src = url;
      img.alt = `${type} image`;
      img.className = 'gallery__image';
      galleryContainer.appendChild(img);
    });
  } catch (error) {
    console.error('Ошибка при загрузке изображений:', error);
    alert('Произошла ошибка при загрузке картинок. Попробуйте ещё раз.');
  } finally {
    loader.style.display = 'none';
  }
}

loadButton.addEventListener('click', (event) => {
  event.preventDefault();
  const selectedAnimal = animalSelect.value;
  fetchImages(selectedAnimal);
});
