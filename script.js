function addMusicFromLocal() {
    document.getElementById('musicModal').style.display = 'flex';
    document.getElementById('modalTitle').value = '';
    document.getElementById('modalFile').value = '';
}

function removeMusicItem(btn) {
    const item = btn.closest('.music-item');
    if (item) {
        item.remove();
        updateMusicList();
    }
}

function updateMusicList() {
    const musicList = document.querySelector('.music-list');
    if (musicList.children.length === 0) {
        musicList.innerHTML = '<div style="text-align:center;color:#888;">No music added.</div>';
    }
}

function createMusicItem(title, audioSrc) {
    const musicList = document.querySelector('.music-list');

    if (musicList.children.length === 1 && musicList.children[0].innerText === 'No music added.') {
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

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = 'remove <span class="trash">🗑️</span>';
    removeBtn.onclick = function () {
        removeMusicItem(removeBtn);
    };

    item.appendChild(span);
    item.appendChild(audio);
    item.appendChild(removeBtn);

    musicList.appendChild(item);
}

document.addEventListener('DOMContentLoaded', function () {
    const addBtn = document.querySelector('.add-btn');
    addBtn.addEventListener('click', addMusicFromLocal);

    const modal = document.getElementById('musicModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalFile = document.getElementById('modalFile');
    const modalCancel = document.getElementById('modalCancel');
    const modalAdd = document.getElementById('modalAdd');

    modalCancel.onclick = function () {
        modal.style.display = 'none';
    };

    modalAdd.onclick = function () {
        const title = modalTitle.value.trim();
        const file = modalFile.files[0];
        if (!title || !file) {
            alert('Judul dan file musik wajib diisi!');
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            createMusicItem(title, e.target.result);
            modal.style.display = 'none';
        };
        reader.readAsDataURL(file);
    };

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.onclick = function () {
            removeMusicItem(btn);
        };
    });
});