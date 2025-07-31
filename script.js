
function updateMusicList() {
    const musicList = document.querySelector('.music-list');
    if (musicList.children.length === 0) {
        musicList.innerHTML = '<div style="text-align:center;color:#888;">No music added.</div>';
    }
}

function createMusicItem(title, audioSrc) {
    const musicList = document.querySelector('.music-list');

    if (
        musicList.children.length === 1 &&
        musicList.children[0].innerText === 'No music added.'
    ) {
        musicList.innerHTML = '';
    }

    const item = document.createElement('div');
    item.className = 'music-item';

    const span = document.createElement('span');
    span.className = 'music-title';
    span.textContent = title;

    const audio = document.createElement('audio');
    audio.src = audioSrc;
    audio.controls = true;


    item.appendChild(span);
    item.appendChild(audio);
    musicList.appendChild(item);
}

const staticMusicList = [
    {
        title: "Lagu Pertama - Penyanyi A",
        src: "assets/blue_drops_-_Pachislo_Sora_no_Otoshimono_Forte_OST9_AnimeNewMusic_(Hydr0.org).mp3", // Ganti path sesuai lokasi file
    },
    {
        title: "Lagu Kedua - Penyanyi B",
        src: "music/lagu2.mp3",
    },
    {
        title: "Lagu Ketiga - Penyanyi C",
        src: "music/lagu3.mp3",
    },
];

document.addEventListener('DOMContentLoaded', function () {
    staticMusicList.forEach(music => {
        createMusicItem(music.title, music.src);
    });

    updateMusicList();
});
//fungsi nambah playlist
const addPlaylistBtn = document.getElementById('addPlaylistBtn');
const playlistModal = document.getElementById('playlistModal');
const playlistModalTitle = document.getElementById('playlistModalTitle');
const playlistNameInput = document.getElementById('playlistNameInput');
const cancelPlaylistBtn = document.getElementById('cancelPlaylistBtn');
const savePlaylistBtn = document.getElementById('savePlaylistBtn');
const playlistList = document.getElementById('playlistList');

// fungsi nambah lagu
const songModal = document.getElementById('songModal');
const songTitleInput = document.getElementById('songTitleInput');
const songFileInput = document.getElementById('songFileInput');
const cancelSongBtn = document.getElementById('cancelSongBtn');
const saveSongBtn = document.getElementById('saveSongBtn');

//audio player
const audioPlayer = document.getElementById('audioPlayer');

let playlists = [];
let currentPlaylistIndex = null; // Index playlist yang sedang ditambahkan lagu

// Load dari localStorage
window.onload = () => {
  const savedData = localStorage.getItem('playlists');
  if (savedData) {
    playlists = JSON.parse(savedData);
    renderPlaylists();
  }
};

function saveToLocalStorage() {
  localStorage.setItem('playlists', JSON.stringify(playlists));
}

function renderPlaylists() {
  playlistList.innerHTML = '';

  playlists.forEach((playlist, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${playlist.name}</strong> (${playlist.songs.length} lagu)`;


  playlist.songs.forEach((song, songIndex) => {
  const songLi = document.createElement('li');
  songLi.innerHTML = `🎵 ${song.title} `;

  // Tombol play
  const playBtn = document.createElement('button');
  playBtn.textContent = '▶️';
  playBtn.style.marginLeft = '5px';
  playBtn.addEventListener('click', () => {
    audioPlayer.src = song.fileDataUrl;
    audioPlayer.style.display = 'block';
    audioPlayer.play();
  });

  songLi.appendChild(playBtn);
  ulSongs.appendChild(songLi);
});



    // Tombol Tambah Lagu
    const addSongBtn = document.createElement('button');
    addSongBtn.textContent = '➕ Lagu';
    addSongBtn.style.marginLeft = '10px';
    addSongBtn.addEventListener('click', () => {
      currentPlaylistIndex = index;
      songModal.style.display = 'block';
      songTitleInput.value = '';
      songFileInput.value = '';
    });

    // Tombol Hapus Playlist
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.style.marginLeft = '5px';
    deleteBtn.addEventListener('click', () => {
      playlists.splice(index, 1);
      saveToLocalStorage();
      renderPlaylists();
    });

    li.appendChild(addSongBtn);
    li.appendChild(deleteBtn);

    // Daftar Lagu
    const ulSongs = document.createElement('ul');
    playlist.songs.forEach(song => {
      const songLi = document.createElement('li');
      songLi.textContent = `🎵 ${song.title}`;
      ulSongs.appendChild(songLi);
    });

    li.appendChild(ulSongs);
    playlistList.appendChild(li);
  });
}

// Event: Tambah Playlist
addPlaylistBtn.addEventListener('click', () => {
  playlistModal.style.display = 'block';
  playlistNameInput.value = '';
});

cancelPlaylistBtn.addEventListener('click', () => {
  playlistModal.style.display = 'none';
});

savePlaylistBtn.addEventListener('click', () => {
  const name = playlistNameInput.value.trim();
  if (name === '') return alert('Nama playlist tidak boleh kosong.');

  playlists.push({ name, songs: [] });
  saveToLocalStorage();
  renderPlaylists();

  playlistModal.style.display = 'none';
});

// Event: Tambah Lagu ke Playlist
cancelSongBtn.addEventListener('click', () => {
  songModal.style.display = 'none';
});

saveSongBtn.addEventListener('click', () => {
  const title = songTitleInput.value.trim();
  const file = songFileInput.files[0];

  if (title === '' || !file) {
    return alert('Judul lagu dan file wajib diisi.');
  }

  const fileName = file.name;

  playlists[currentPlaylistIndex].songs.push({
    title,
    file: fileName
  });

  saveToLocalStorage();
  renderPlaylists();
  songModal.style.display = 'none';
});

function playSongFromLocal(playlistIndex, songIndex) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'audio/*';

  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
      audioPlayer.src = event.target.result;
      audioPlayer.style.display = 'block';
      audioPlayer.play();
    };
    reader.readAsDataURL(file);
  };

  input.click();
}