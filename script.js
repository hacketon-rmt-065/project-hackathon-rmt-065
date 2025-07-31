function updateMusicList() {
    const musicList = document.querySelector('.music-list');
    if (musicList && musicList.children.length === 0) {
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
        src: "assets/blue_drops_-_Pachislo_Sora_no_Otoshimono_Forte_OST9_AnimeNewMusic_(Hydr0.org).mp3",
    },
    {
        title: "Lagu Kedua - Penyanyi B",
        src: "assets/freddy-fazbear-au-au-au-ur-ur-ur-original-shorts-made-with-Voicemod.mp3",
    },
    {
        title: "Lagu Ketiga - Penyanyi C",
        src: "music/lagu3.mp3",
    },
];

// ISI DROPDOWN LANGSUNG
const songSelect = document.getElementById('songSelect');
if (songSelect) {
    staticMusicList.forEach((song, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = song.title;
        songSelect.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    staticMusicList.forEach(music => {
        createMusicItem(music.title, music.src);
    });

    updateMusicList();
});

const addPlaylistBtn = document.getElementById('addPlaylistBtn');
const playlistModal = document.getElementById('playlistModal');
const playlistModalTitle = document.getElementById('playlistModalTitle');
const playlistNameInput = document.getElementById('playlistNameInput');
const cancelPlaylistBtn = document.getElementById('cancelPlaylistBtn');
const savePlaylistBtn = document.getElementById('savePlaylistBtn');
const playlistList = document.getElementById('playlistList');

// fungsi nambah lagu
const songModal = document.getElementById('songModal');
const cancelSongBtn = document.getElementById('cancelSongBtn');
const saveSongBtn = document.getElementById('saveSongBtn');

//audio player
const audioPlayer = document.getElementById('audioPlayer');

let playlists = [];
let currentPlaylistIndex = null;

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

        const ulSongs = document.createElement('ul');

        playlist.songs.forEach((song, songIndex) => {
            const songLi = document.createElement('li');
            songLi.innerHTML = `🎵 ${song.title} `;

            const playBtn = document.createElement('button');
            playBtn.textContent = '▶️';
            playBtn.style.marginLeft = '5px';
            playBtn.addEventListener('click', () => {
                audioPlayer.src = song.src;
                audioPlayer.style.display = 'block';
                audioPlayer.play();
            });

            songLi.appendChild(playBtn);
            ulSongs.appendChild(songLi);
        });

        const addSongBtn = document.createElement('button');
        addSongBtn.textContent = '➕ Lagu';
        addSongBtn.style.marginLeft = '10px';
        addSongBtn.addEventListener('click', () => {
            currentPlaylistIndex = index;
            songModal.style.display = 'flex';
            songSelect.value = '';
        });

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
        li.appendChild(ulSongs);
        playlistList.appendChild(li);
    });
}

addPlaylistBtn.addEventListener('click', () => {
    playlistModal.style.display = 'flex';
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

cancelSongBtn.addEventListener('click', () => {
    songModal.style.display = 'none';
});

saveSongBtn.addEventListener('click', () => {
    const selectedIndex = songSelect.value;

    if (selectedIndex === '') {
        return alert('Pilih lagu dari daftar.');
    }

    const selectedSong = staticMusicList[selectedIndex];

    playlists[currentPlaylistIndex].songs.push({
        title: selectedSong.title,
        src: selectedSong.src
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
        reader.onload = function (event) {
            audioPlayer.src = event.target.result;
            audioPlayer.style.display = 'block';
            audioPlayer.play();
        };
        reader.readAsDataURL(file);
    };

    input.click();
}
