"use strict";

// Visitor Ip/////////////////
function json(url) {
  return fetch(url).then((res) => res.json());
}

let apiKey = "d380e97ae204552f2666aeb5b9eabfac591062aef344b503e4a3b7a1";
$.getJSON(`https://api.ipdata.co?api-key=${apiKey}`, function (data) {
  const lat = data.latitude;
  const long = data.longitude;
  let mymap = L.map("map").setView([lat, long], 13);
  let circle = L.circle([lat, long], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(mymap);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY29rZWNvY2EzIiwiYSI6ImNrbzd2OG90bjBlcDUydm1xY2htaTZ6M2IifQ.gfupIjF3GnqFbeTQP26cwQ",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiY29rZWNvY2EzIiwiYSI6ImNrbzd2OG90bjBlcDUydm1xY2htaTZ6M2IifQ.gfupIjF3GnqFbeTQP26cwQ",
    }
  ).addTo(mymap);

  const visitorIp = data.ip;
  const visitorLocation = `${data.city}, ${data.country_code}`;
  const visitorTimeZone = data.time_zone.offset;
  const visitorIsp = data.asn.name;
  document.getElementById("ipAddress").innerHTML = visitorIp;
  document.getElementById("location").innerHTML = visitorLocation;
  document.getElementById("timezone").innerHTML = visitorTimeZone;
  document.getElementById("isp").innerHTML = visitorIsp;
});

/////////////////

// output ////////////

function handleClick() {
  $("#map").css("display", "none");
  $("#getMap").css("display", "block");
  $(".hidden").css("display", "block");
  $(".inputs").css("display", "none");

  const inputIp = $("input")[0].value;
  const inputDomain = $("input")[1].value;
  let ipUrl = "";

  if (inputIp) {
    ipUrl = `https://geo.ipify.org/api/v1?apiKey=at_IIjtm2fBfxz1aZokP34AzD19QD0f5&ipAddress=${inputIp}`;
  } else if (inputDomain) {
    ipUrl = `https://geo.ipify.org/api/v1?apiKey=at_IIjtm2fBfxz1aZokP34AzD19QD0f5&domain=${inputDomain}`;
  }

  $.getJSON(ipUrl, function (data) {
    const getLat = data.location.lat;
    const getIng = data.location.lng;
    let getmymap = L.map("getMap").setView([getLat, getIng], 20);

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY29rZWNvY2EzIiwiYSI6ImNrbzd2OG90bjBlcDUydm1xY2htaTZ6M2IifQ.gfupIjF3GnqFbeTQP26cwQ",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiY29rZWNvY2EzIiwiYSI6ImNrbzd2OG90bjBlcDUydm1xY2htaTZ6M2IifQ.gfupIjF3GnqFbeTQP26cwQ",
      }
    ).addTo(getmymap);
    let circle = L.circle([getLat, getIng], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 50,
    }).addTo(getmymap);

    const foundIp = data.ip;
    const foundLocation = `${data.location.city}, ${data.location.country}`;
    const foundTimeZone = data.location.timezone;
    const foundIsp = data.isp;
    document.getElementById("ipAddress").innerHTML = foundIp;
    document.getElementById("location").innerHTML = foundLocation;
    document.getElementById("timezone").innerHTML = foundTimeZone;
    document.getElementById("isp").innerHTML = foundIsp;
  });
}

function refresh() {
  location.reload();
}
