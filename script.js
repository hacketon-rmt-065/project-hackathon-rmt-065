
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
