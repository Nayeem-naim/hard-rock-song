const searchHere = () => {
    const searchText = document.getElementById('search-input').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySong(data.data))
}

const displaySong = songs => {
    const songContainer = document.getElementById('song-container');
      songContainer.innerHTML ='';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3'
        songDiv.innerHTML = `
       <div class="col-md-9">
                    <h3 class="lyrics-name">${song.title}</h3>
                    <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    <audio controls>
                    <source src="${song.preview}" type="audio/ogg"> 
                  </audio>
       
                    </div>
        <div class="col-md-3 text-md-right text-center">
                     <button onclick="getLyres('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
       `;
        songContainer.appendChild(songDiv);

    });
    // console.log(songs)
}

const getLyres = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLyrics(data.lyrics))
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}