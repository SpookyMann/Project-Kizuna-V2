/**
*gets the cached anime data api
*/
function getAnimeFromCache(coords) {
  if (!('caches' in window)){
    return null;
  }
  const url = `${window.location.origin}/anime/$coords`;
  return caches.match(url)
  .then((response) =>{
    if (response) {
      return response.json();
    }
    return null;
  })
  .catch((err) =>{
    console.erroer('Error getting data from cache', err);
    return null;
  });
}

const url_base = "https://kitsu.io/api/edge/anime?filter[text]=";
let fetchData = {
  Accept: "application/vnd.api+json",
  "Content-Type": "application/vnd.api+json"
};

getJSONData("little sister");
document.getElementById("search-button").addEventListener("click", search);

function getJSONData(searchTerm) {
  console.log("getting " + searchTerm);
  let url = url_base + searchTerm;
  fetch(url, fetchData)
    .then(resp => resp.json()) // Transform the data into json
    .then(function(data) {
      getImageData(data);
    })
    .catch(function(error) {
      document.getElementById("box-main").innerHTML +=
        "Error with Kitsu Api: " + error;
    });
}

function getImageData(data) {
  document.getElementById("box-main").innerHTML = "";
  for (var i = 0; i < data.data.length; i++) {
    var output = "";
    output = "<div class='card'>";
    output +=
      "<div class='box' id='img" +
      i +
      "' style='background-image:url(\"" +
      data.data[i].attributes.posterImage.medium +
      "\")'>";
    // output +=
    //   "<img src='" +
    //   data.data[i].attributes.posterImage.small +
    //   "' alt=''><br>";
    output += "<div class='dat'>" + "<h2 class='title'>";

    var str = data.data[i].attributes.titles.en_jp;
    console.log(i + " value is " + str);
    if (str == undefined) {
      output += data.data[i].attributes.canonicalTitle;
    } else {
      output += str;
    }
    output += "</h2>";

    output += "<h3>";
      
       var str = data.data[i].attributes.ageRating;
      console.log(i + " value is " + str);
   if (str == null) {
      output += "UNRATED";
  } else {
      output += str;
 }
      var str = data.data[i].attributes.ageRatingGuide;
      console.log(i + " value is " + str);
   if (str == " ") {
      output += " ";
  } else {
      output += " " + str;
 }
  
    output += "</h3>";
    
    output += "<h3>";

    var str = data.data[i].attributes.showType;
    console.log(i + " value is " + str);
    if (str == "movie") {
      output += "Movie";
    } else if (str == "special") {
      output += "Special";
    } else if (str == "music"){
      output += "Music";
    } else {
      output += str;
    }
    output += "</h3>" + "</div>";
    output += "</div>";
    output += "<div class='box2'>";
    output += "<div class='underline'>" + "<div class='box3'>" + "<h3 class='col'>";

    var str = data.data[i].attributes.averageRating;
    console.log(i + " value is " + str);
    if (str == null) {
      output += "No Rating";
    } else {
      output += str + "% Rating";
    }

    output += "</h3>";

    output +=
      "<h3>" +
      "Rank: " +
      data.data[i].attributes.popularityRank +
      "</h3>" +
      "</div>";
    output += "<hr>";
    output += "<h4>" + "Synopsis" + "</h4>";
    output += "<p>" + data.data[i].attributes.synopsis + "</p>" + "</div>";
    output += "</div>";
    output += "</div>";

    //output += "<style>" + ".box { background-image: url ("" " + data.data[i].attributes.posterImage.small + """)""" "</style>"

    //if (fetch = data.data[i].attributes.titles.en = "undefined", "null") {
    //  output += "<h1>" + data.attributes.titles.en.jp + "</h1>";
    // }

    document.getElementById("box-main").innerHTML += output;
    //document.getElementById("img"+ i).style.backgroundImage = "url (''" + data.data[i].attributes.posterImage.small + "')";
  }
}

function search() {
  let searchTerm = document.getElementById("search-input").value;
  console.log("searching " + searchTerm);
  //perform search
  //update inner HTML of Foo
  getJSONData(searchTerm);
}
