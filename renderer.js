const { ipcRenderer } = require('electron');
const path = require('path');
const mangaList = document.getElementById('manga-list');
const addMangaButton = document.getElementById('add-manga-button');
const mangaModal = document.getElementById('manga-modal');
const closeButton = document.querySelector('.close-button');
const mangaForm = document.getElementById('manga-form');

const mangas = [];

addMangaButton.addEventListener('click', () => {
  mangaModal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  mangaModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target == mangaModal) {
    mangaModal.style.display = 'none';
  }
});

mangaForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const mangaName = document.getElementById('manga-name').value;
  const mangaCoverInput = document.getElementById('manga-cover');
  let mangaCover = null;

  if (mangaCoverInput.files && mangaCoverInput.files[0]) {
    mangaCover = mangaCoverInput.files[0];
  }

  try {
    const result = await ipcRenderer.invoke('select-manga-folder');
    if (result && result.chapters.length > 0) {
      const newManga = {
        name: mangaName,
        folderPath: result.folderPath,
        chapters: result.chapters,
        cover: mangaCover ? URL.createObjectURL(mangaCover) : null
      };
      mangas.push(newManga);
      renderMangaList();
      mangaModal.style.display = 'none';
    } else {
      alert("No chapters found in the selected folder.");
    }
  } catch (error) {
    console.error(error.message);
    alert("Invalid folder structure. Please ensure your folder is organized as 'Manga_Name/Chapter_Number/Page_Number.webp' (e.g., Manga_Name/1/page1.webp)."
);
  }
});

function openManga(index) {
  const selectedManga = mangas[index];
  showChapters(selectedManga);
}

function showChapters(manga) {
  const chapterContainer = document.createElement('div');
  chapterContainer.className = 'chapter-container';

  manga.chapters.forEach((chapter, index) => {
    const chapterButton = document.createElement('button');
    chapterButton.textContent = `Chapter ${index + 1}`;
    chapterButton.onclick = () => showPages(manga, chapter);
    chapterContainer.appendChild(chapterButton);
  });

  document.body.innerHTML = '';
  document.body.appendChild(chapterContainer);
}

function showPages(manga, chapter) {
  const readerContainer = document.createElement('div');
  readerContainer.className = 'reader-container';

  if (chapter.pages && chapter.pages.length > 0) {
    chapter.pages.forEach(page => {
      const pageImage = document.createElement('img');
      pageImage.src = path.join(manga.folderPath, chapter.name, page);
      pageImage.className = 'manga-page';
      readerContainer.appendChild(pageImage);
    });
  } else {
    console.error("No pages found in the selected chapter.");
    alert("No pages found in the selected chapter.");
  }

  document.body.innerHTML = '';
  document.body.appendChild(readerContainer);
}

function renderMangaList() {
  mangaList.innerHTML = '';
  mangas.forEach((manga, index) => {
    const mangaItem = document.createElement('div');
    mangaItem.className = 'manga-item';
    const mangaCover = document.createElement('img');
    mangaCover.src = manga.cover;
    mangaItem.appendChild(mangaCover);
    const mangaTitle = document.createElement('div');
    mangaTitle.textContent = manga.name;
    mangaItem.appendChild(mangaTitle);
    mangaItem.onclick = () => openManga(index);
    mangaList.appendChild(mangaItem);
  });
}
