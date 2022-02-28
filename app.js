const allPlayer = () => {
    document.getElementById('player-container').innerHTML = ``;
    document.getElementById('details-container').innerHTML = ``
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block'
    let searchVlaue = document.getElementById('search-field').value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchVlaue}`
    fetch(url)
        .then(res => res.json())
        .then(data => showPlayerDetails(data.player))

}
const showPlayerDetails = (players) => {
    for (player of players) {
        const parent = document.getElementById('player-container');
        const div = document.createElement('div');
        // console.log(player.strThumb);
        div.innerHTML = `
        <div class = "row">
                <div class="pro-card col-12 col-md-12 col-lg-12 border shadow-lg p-3 mb-5 bg-body rounded-3 m-2">
                    <div class="pro-pic border-1 rounded-3">
                    <img height="100%" width="100%" src="${player.strThumb}" alt="">
                    </div>
                    <h2>Name: ${player.strPlayer} </h2>
                    <h5>Country: ${player.strNationality} </h5>
                    <h5>Sports: ${player.strSport}</h5>
                    <p>Discription:<p class="text-semibolde">${player.strDescriptionEN.slice(0, 150
                    )}</p> </p>
                    <div class="all-btn mb-4">
                        <button class="btn btn-danger" onclick="allClear(${player.idPlayer})">Delete</button>
                        <button class="btn btn-primary" onclick="Details(${player.idPlayer})">Details</button>
                    </div>
                </div>
                </div>`;
        parent.appendChild(div);
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'none'

    };
}

const Details = (id) => {
    document.getElementById('details-container').innerHTML = ``
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showDatails(data.players))
}
const showDatails = (info) => {
    for (infos of info) {
        if (infos.strGender == "Male") {
            const femaleWoman = document.getElementById('female');
            femaleWoman.style.display = 'none'
            femaleWoman.style.width = '100px'
            const malePhoto = document.getElementById('malePerson');
            malePhoto.style.display = 'block'
        } else {
            const malePhoto = document.getElementById('malePerson');
            malePhoto.style.display = 'none'
            const femaleWoman = document.getElementById('female');
            femaleWoman.style.display = 'block'
        }
        const detailsContainer = document.getElementById('details-container');
        const newDiv = document.createElement('div')
        newDiv.innerHTML = `
    <div class="border shadow-lg-12 bg bg-primary shadow-md-12 col-md-12 col-lg-12 p-3 mb-5 bg-body">
    <img width="100%" heigth="100%" src="${infos.strThumb}" alt="">
    <h3>Name:${infos.strPlayer} </h3>
    <h4>Detailes: ${infos.strDescriptionEN}</h4>
    </div>
        `;
        detailsContainer.appendChild(newDiv);

    }
}
const allClear = (data) => {
    document.getElementById('details-container').innerHTML = ``;

}