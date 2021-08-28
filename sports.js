const loadDisplay=document.getElementById("loading-display")
loadDisplay.style.display="none";
const result=document.getElementById("no-result")
result.style.display="none"
const show= document.getElementById("container-show");
const playerLoad=document.getElementById("player-loading")
playerLoad.style.display="none";
const fullPlayer= document.getElementById("player-details");

const searchInput=()=>{
    const search=document.getElementById("input-value");
    const loadDisplay=document.getElementById("loading-display")
   let searchText= search.value;
   fullPlayer.textContent="";
if(searchText==""){
  alert("enter a club name");
}
else{
  loadDisplay.style.display="block";

  search.value="";

const url=`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}`
   fetch(url)
   .then(response=>{
     if(response.status==200){
      loadDisplay.style.display="none";
       return response.json();
     }
    })
   .then(data=>{
     if(data.teams==null){
      result.style.display="block";
     }
     return displayTeams(data.teams)});
     result.style.display="none";
 
}
}

const displayTeams=(teams)=>{

 show.textContent="";
 teams.forEach(team=>{
   
    const div= document.createElement("div");
    div.classList.add("col")
    div.innerHTML=`
    <div class="card" role="button">
    <img src="${team.strTeamBadge}" class="card-img-top w-75 mx-auto" alt="No photos Available">
    <div class="card-body">
      <h5 class="card-title">${team.strTeam}</h5>
      <p class="card-text">${team.strDescriptionEN.slice(0,200)}</p>
    </div>
  </div>
    `
show.appendChild(div);
     
 })
}


            // search players 

const searchPlayer=()=>{
const players= document.getElementById("search-player");
let playerText= players.value ;
fullPlayer.textContent="";
if(playerText==""){
  alert("please enter players name")
}
else{
  playerLoad.style.display="block";
  players.value="";

  const url2=`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${playerText}`
   
    fetch(url2)
    .then(res=>{
      if(res.status==200){
        playerLoad.style.display="none";
      }
      
      return res.json()})
    .then(data=>{
      if(data.player==null){
        result.style.display="block"
      }
      
      return showPlayers(data.player)});
      result.style.display="none"
  
  }


}

const showPlayers=(players)=>{

  show.textContent="";
  players.forEach(player=>{
     const div= document.createElement("div");
     div.classList.add("col")
     div.innerHTML=`
     <div class="card">
     <img src="${player.strThumb}" class="card-img-top mx-auto" alt="No photos Available">
     <div class="card-body">
       <h2 class="card-title">${player.strPlayer}</h2>
       <h5 class="card-text"> Nationality: ${player.strNationality}</h5>
      <button onclick="showClub('${player.idTeam}')" class="btn btn-info"> <h6 class="card-text"> Current Club: ${player.strTeam}<span> (click to see club details)</span></h6> </button>
       <button onclick="playerDetails('${player.idPlayer}')" class="btn btn-danger mt-3">More details</button>
     </div>
   </div>
     `
 show.appendChild(div);

})
};

// show club details 

 const showClub=(clubs)=>{
   const url4=`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${clubs}`
   playerLoad.style.display="block";
      fetch(url4)
      .then(res=>{
        if(res.status==200){
          playerLoad.style.display="none";
        }
        return res.json()})
      .then(data=>showClubDetails(data.teams[0]));
 }

 const showClubDetails=(clubs)=>{
   console.log(clubs)
  fullPlayer.textContent="";
  const newDiv= document.createElement("div");
  newDiv.classList.add("col");
  newDiv.innerHTML=`
  <div class="card">
       <img src="${clubs.strTeamBadge}" class="card-img-top w-50 h-50 mx-auto" alt="No photos Available">
       <div class="card-body">
         <h2 class="card-title">${clubs.strTeam}</h2>
         <h5 class="card-text"> League: ${clubs.strLeague}</h5>
         <h5 class="card-text"> Club Formed: ${clubs.intFormedYear}</h5>
         <h5 class="card-text"> Country: ${clubs.strCountry}</h5>
         <h5 class="card-text"> Stadium: ${clubs.strStadium}</h5>
         <h5 class="card-text"> Stadium location: ${clubs.strStadiumLocation}</h5>
         <h5 class="card-text"><a href="'${clubs.strWebsite}'">Visit Website</a></h5>
         <p class="card-text">  ${clubs.strDescriptionEN.slice(0,400)}</p>
        <span>Jersy: <img src="${clubs.strTeamJersey}" class=" mt-2 card-img-top w-25 h-25 mx-auto" alt="No photos Available"> </span>
       </div>
     </div>
  
  `
  fullPlayer.appendChild(newDiv);
 }


   // show detail players 

const playerDetails=(playerId)=>{
  const url3=`https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=${playerId}`
  playerLoad.style.display="block";
   fetch(url3)
   .then(response=>{
     if(response.status==200){
     
      playerLoad.style.display="none";
      return response.json()}})
  
     
   .then(data=>fullPlayerDetail(data.players[0]));
}

const fullPlayerDetail=(fullDetails)=>{
fullPlayer.textContent="";
const newDiv= document.createElement("div");
newDiv.classList.add("col");
newDiv.innerHTML=`
<div class="card">
     <img src="${fullDetails.strThumb}" class="card-img-top w-50 h-50 mx-auto" alt="No photos Available">
     <div class="card-body">
       <h2 class="card-title">${fullDetails.strPlayer}</h2>
       <h5 class="card-text"> birth place: ${fullDetails.strBirthLocation}</h5>
       <h6 class="card-text"> Current Club: ${fullDetails.strTeam}</h6>
       <h6 class="card-text"> National Team: ${fullDetails.strTeam2}</h6>
       <h6 class="card-text"> Current Amount Of Signing: ${fullDetails.strSigning}</h6>
       <h6 class="card-text"> Jersy No: ${fullDetails.strNumber}</h6>
       <h6 class="card-text"> Playing position: ${fullDetails.strPosition} </h6>
       <p class="card-text">  ${fullDetails.strDescriptionEN.slice(0,500)}</p>
     </div>
   </div>

`
fullPlayer.appendChild(newDiv);
}