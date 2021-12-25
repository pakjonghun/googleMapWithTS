import axios from "axios";
import { Loader } from "@googlemaps/js-api-loader";

const form = document.querySelector("form")! as HTMLFormElement;
const input = document.querySelector("input")! as HTMLInputElement;
const key = process.env.KEY;

const loader = new Loader({
  apiKey: key,
  version: "weekly",
});

function getLocation(lat: number, lng: number) {
  console.log(lat, lng);

  const myLatlng = new google.maps.LatLng(lat, lng);

  const mapOptions = {
    zoom: 4,
    center: myLatlng,
  };

  const map = new google.maps.Map(
    document.getElementById("map")! as HTMLDivElement,
    mapOptions
  );

  loader.load().then(() => map);

  const marker = new google.maps.Marker({
    position: myLatlng,
    map,
    title: "Hello World!",
  });

  marker.setMap(map);
}

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  if (!input.value.trim()) return alert("올바른 값을 넣으시요");
  getApi(input.value);
});

const url = (key: string, adress: string) =>
  `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
    adress
  )}&key=${key}`;

type resData = {
  results: [
    {
      formatted_address: string;
      geometry: {
        location: {
          lat: number;
          lng: number;
        };
        location_type: "APPROXIMATE";
      };
    }
  ];
  status: "OK" | "ZERO_RESULTS";
};

async function getApi(adress: string) {
  const res1 = await axios.get<resData>(url(key, adress));
  if (res1.status > 400) return;
  if (res1.data.status !== "OK") throw new Error("wrong location");
  const data = res1.data.results[0]?.geometry.location;

  await getLocation(data.lat, data.lng);
}
