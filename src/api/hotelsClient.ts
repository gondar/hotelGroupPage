
export interface HotelRoom {
    occupancy: { maxAdults: number; maxChildren: number };
  }
  
  export interface HotelMetadata {
    id: string;
    name: string;
    starRating: string;
    address1: string;
    address2: string;
    postcode: string;
    town: string;
    country: string;
    images: {
      url: string;
    }[];
    rooms: HotelRoom[];
  }

const apiUrl = "https://obmng.dbm.guestline.net/api/";

function getHotels(collectionId: string): Promise<HotelMetadata[]> {
    return fetch(`${apiUrl}hotels?collection-id=${collectionId}`)
    .then((res) => res.json() as Promise<HotelMetadata[]>)
    .then((result) => {
      let roomCalls = result.map((hotel) =>
        fetch(`${apiUrl}roomRates/${collectionId}/${hotel.id}`)
          .then((res) => res.json())
          .then((result) => {
              return { id: hotel.id, rooms: result.rooms };            
          })
      );
      return { hotels: result, rooms: Promise.all(roomCalls) };
    })
    .then((result) => {
      let hotels = result.hotels;
      return result.rooms
        .then((roomsData) => {
          roomsData.forEach((roomData) => {
            let currentHotel = hotels.find((h) => h.id === roomData.id);
            if (currentHotel) {
              currentHotel.rooms = roomData.rooms;
            }
          });
        })
        .then(() => {
          return hotels;
        });
    })
}

export default getHotels;