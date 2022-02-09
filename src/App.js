import React, { useState, useEffect} from 'react';
import './App.css';
import List from './components/List/List';
import PhoneListContext from './contexts/PhoneListContext';

function App() {
  const [phoneListData, setPhoneListData] = useState(
    [
      {
        productId: 0,
        title: 'Samsung Note 11',
        brand: 'Samsung',
        url: 'https://productimages.hepsiburada.net/s/49/550/10986386128946.jpg',
        color: 'yeşil',
        price: 11000,
        discount: '14.000 TL',
        percent: '%12',
        isAddedCard: 0,
      },
      {
        productId: 1,
        title: 'Samsung Note 11',
        brand: 'Samsung',
        url: 'https://productimages.hepsiburada.net/s/49/550/10986386128946.jpg',
        color: 'yeşil',
        price: 11000,
        discount: '14.000 TL',
        percent: '%12',
        isAddedCard: 0,
      },
      {
        productId: 2,
        title: 'Apple iPhone 12',
        brand: 'Apple',
        url: 'https://productimages.hepsiburada.net/s/49/550/10986386358322.jpg',
        color: 'sarı',
        price: 12000,
        discount: '14.000 TL',
        percent: '%12',
        isAddedCard: 0,
      },
      {
        productId: 3,
        title: 'Xiaomi 13',
        brand: 'Xiaomi',
        url: 'https://productimages.hepsiburada.net/s/49/550/10986385899570.jpg',
        color: 'siyah',
        price: 13000,
        discount: '14.000 TL',
        percent: '%12',
        isAddedCard: 0,
      },
      {
        productId: 4,
        title: 'Samsung Note 11',
        brand: 'Samsung',
        url: 'https://productimages.hepsiburada.net/s/49/550/10986386128946.jpg',
        color: 'yeşil',
        price: 11000,
        discount: '14.000 TL',
        percent: '%12',
        isAddedCard: 0,
      },
      {
        productId: 5,
        title: 'Apple iPhone 12',
        brand: 'Apple',
        url: 'https://productimages.hepsiburada.net/s/49/550/10986386358322.jpg',
        color: 'sarı',
        price: 12000,
        discount: '14.000 TL',
        percent: '%12',
        isAddedCard: 0,
      },
      {
        productId: 6,
        title: 'Xiaomi 13',
        brand: 'Xiaomi',
        url: 'https://productimages.hepsiburada.net/s/49/550/10986385899570.jpg/format:webp',
        color: 'siyah',
        price: 13000,
        discount: '14.000 TL',
        percent: '%12',
        isAddedCard: 0,
      },
      {
        productId: 7,
        title: 'Samsung Note 11',
        brand: 'Samsung',
        url: 'https://productimages.hepsiburada.net/s/49/550/10986386128946.jpg',
        color: 'yeşil',
        price: 11000,
        discount: '14.000 TL',
        percent: '%12',
        isAddedCard: 0,
      },
      {
        productId: 8,
        title: 'Apple iPhone 12',
        brand: 'Apple',
        url: 'https://productimages.hepsiburada.net/s/49/550/10986386358322.jpg',
        color: 'sarı',
        price: 12000,
        discount: '14.000 TL',
        percent: '%12',
        isAddedCard: 0,
      },
      {
        productId: 9,
        title: 'Xiaomi 13',
        brand: 'Xiaomi',
        url: 'https://productimages.hepsiburada.net/s/49/550/10986385899570.jpg/format:webp',
        color: 'siyah',
        price: 13000,
        discount: '14.000 TL',
        percent: '%12',
        isAddedCard: 0,
      },
      {
        productId: 10,
        title: 'Samsung Note 11',
        brand: 'Samsung',
        url: 'https://productimages.hepsiburada.net/s/49/550/10986386128946.jpg',
        color: 'yeşil',
        price: 11000,
        discount: '14.000 TL',
        percent: '%12',
        isAddedCard: 0,
      },
      {
        productId: 11,
        title: 'Apple iPhone 12',
        brand: 'Apple',
        url: 'https://productimages.hepsiburada.net/s/49/550/10986386358322.jpg',
        color: 'sarı',
        price: 12000,
        discount: '14.000 TL',
        percent: '%12',
        isAddedCard: 0,
      },
      {
        productId: 12,
        title: 'Xiaomi 13',
        brand: 'Xiaomi',
        url: 'https://productimages.hepsiburada.net/s/49/550/10986385899570.jpg/format:webp',
        color: 'siyah',
        price: 13000,
        discount: '14.000 TL',
        percent: '%12',
        isAddedCard: 0,
      },
      {
        productId: 13,
        title: 'Samsung Note 11',
        brand: 'Samsung',
        url: 'https://productimages.hepsiburada.net/s/49/550/10986386128946.jpg',
        color: 'yeşil',
        price: 11000,
        discount: '14.000 TL',
        percent: '%12',
        isAddedCard: 0,
      },
    ]
  );

useEffect(() => {
  localStorage.setItem("PhoneData", JSON.stringify(phoneListData))
}, [phoneListData]);

const values = {
    phoneListData, 
    setPhoneListData,
}
  return (
    <div className="App">
      <PhoneListContext.Provider value={values}>
        <List />
      </PhoneListContext.Provider>
        
    </div>
  );
}

export default App;
