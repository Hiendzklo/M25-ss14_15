"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type WeatherData = {
  temperature: number;
  weathercode: number;
};

type WeatherResponse = {
  current_weather: WeatherData;
};

type User = {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
};

const weatherCodes: { [key: number]: string } = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Drizzle: Light intensity",
  53: "Drizzle: Moderate intensity",
  55: "Drizzle: Dense intensity",
  56: "Freezing Drizzle: Light intensity",
  57: "Freezing Drizzle: Dense intensity",
  61: "Rain: Slight intensity",
  63: "Rain: Moderate intensity",
  65: "Rain: Heavy intensity",
  66: "Freezing Rain: Light intensity",
  67: "Freezing Rain: Heavy intensity",
  71: "Snow fall: Slight intensity",
  73: "Snow fall: Moderate intensity",
  75: "Snow fall: Heavy intensity",
  77: "Snow grains",
  80: "Rain showers: Slight intensity",
  81: "Rain showers: Moderate intensity",
  82: "Rain showers: Violent intensity",
  85: "Snow showers slight",
  86: "Snow showers heavy",
  95: "Thunderstorm: Slight or moderate",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Lấy danh sách sản phẩm từ Route Handler
        const productsResponse = await fetch('/api/products');
        const productsData = await productsResponse.json();
        setProducts(productsData);

        // Lấy thông tin thời tiết từ API trực tiếp
        const weatherResponse = await axios.get<WeatherResponse>('https://api.open-meteo.com/v1/forecast?latitude=10.762622&longitude=106.660172&current_weather=true');
        setWeather(weatherResponse.data.current_weather);

        // Lấy danh sách người dùng từ JSONPlaceholder API
        const usersResponse = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
        setUsers(usersResponse.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("There was an error fetching the product, weather, or user data.");
      }
    }

    fetchData();
  }, []);

  if (error) {
    return (
      <div>
        Bài 4
        <h1>Failed to load data</h1>
        <p>{error}</p>
      </div>
    );
  }

  const weatherDescription = weather ? weatherCodes[weather.weathercode] || "Unknown weather condition" : "Loading...";

  return (
    <div>
      <h1>Bài 2 - Product List</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {products.map((product) => (
          <li key={product.id} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <img src={product.image} alt={product.title} style={{ width: '50px', height: '50px', marginRight: '20px' }} />
            <div>
              <h2 style={{ margin: '0 0 5px 0' }}>{product.title}</h2>
              <p style={{ margin: 0 }}>${product.price}</p>
            </div>
          </li>
        ))}
      </ul>

      <h1>Bài 3 - Current Weather</h1>
      <p>Temperature: {weather ? weather.temperature : "Loading..."}°C</p>
      <p>Condition: {weatherDescription}</p>

      <h1>Bài 6 - User List</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: '20px' }}>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Address: {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
