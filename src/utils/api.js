import React from 'react'
import { baseUrl, headers } from './constants'

const checkResponse = (res) => {
  if (res.ok) {
    Promise.resolve('Promise Resolved')
    return res.json()
  }
  return Promise.reject(`Error: ${res.status}`)
}

export const getClothingItems = () => {
  return fetch(`${baseUrl}/items`, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkResponse)
}

export const postNewClothingItem = (newItem) => {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: newItem.name,
      weather: newItem.weather,
      link: newItem.link,
    }),
  }).then(checkResponse)
}

export const deleteClothingItems = (selectedCard) => {
  return fetch(`${baseUrl}/items/${selectedCard._id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkResponse)
}
