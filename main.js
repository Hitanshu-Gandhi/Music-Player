// Shuffle the playlist
function shufflePlaylist(playlist) {
    for (var i = 0; i < playlist.length; i++) {
        var randomIndex = Math.floor(Math.random() * playlist.length);
        var temp = playlist[i];
        playlist[i] = playlist[randomIndex];
        playlist[randomIndex] = temp;
    }
    return playlist;
}

// Play a track
var audioPlayer = document.getElementById("audio-player");
var playlist = document.getElementById("playlist");
var shuffleButton = document.getElementById("shuffle-button");
var songLogo = document.getElementById("song-logo");

playlist.addEventListener("click", function (event) {
    if (event.target.classList.contains("track")) {
        playTrack(audioPlayer, event.target);
    }
});

shuffleButton.addEventListener("click", function () {
    var tracks = Array.from(document.querySelectorAll(".track"));
    shuffleArray(tracks);
    playlist.innerHTML = "";
    for (var i = 0; i < tracks.length; i++) {
        playlist.appendChild(tracks[i]);
    }
    playTrack(audioPlayer, tracks[0]);
});


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


function playTrack(audioPlayer, track) {
    audioPlayer.src = track.getAttribute("data-preview-url");
    audioPlayer.play();

    songLogo.src = track.getAttribute("data-logo-url");
    songLogo.alt = track.getAttribute("data-title") + " logo";

    var playingTracks = document.querySelectorAll(".track.playing");
    for (var i = 0; i < playingTracks.length; i++) {
        playingTracks[i].classList.remove("playing");
    }
    track.classList.add("playing");

    audioPlayer.addEventListener("ended", function () {
        var tracks = Array.from(document.querySelectorAll(".track"));
        var currentTrackIndex = tracks.indexOf(track);

        // if (currentTrackIndex === tracks.length - 1) {
        //     // Stop playing
        //     audioPlayer.pause();
        //     audioPlayer.src = "";
        //     return;
        // }

        var nextTrack = tracks[(currentTrackIndex + 1) % tracks.length];
        playTrack(audioPlayer, nextTrack);
    });
}
// Add click event listeners to the tracks
var tracks = document.querySelectorAll(".track");
for (var i = 0; i < tracks.length; i++) {
    tracks[i].addEventListener("click", function () {
        playTrack(document.getElementById("audio-player"), this);
    });
}

// Add click event listener to the shuffle button
document.getElementById("shuffle-button").addEventListener("click", function () {
    var playlist = shufflePlaylist(Array.from(tracks));
    for (var i = 0; i < playlist.length; i++) {
        playlist[i].parentNode.appendChild(playlist[i]);
    }
});


// Shuffle Array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Shuffle and play the playlist
var shuffleButton = document.getElementById("shuffle-button");
shuffleButton.addEventListener("click", function () {
    var audioPlayer = document.getElementById("audio-player");
    var tracks = Array.from(document.querySelectorAll(".track"));
    var shuffledTracks = shuffleArray(tracks);
    playTrack(audioPlayer, shuffledTracks[0]);
});

