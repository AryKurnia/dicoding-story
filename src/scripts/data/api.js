import { getAccessToken } from '../utils/auth';
import CONFIG from '../config';

const ENDPOINTS = {
  // Auth
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,

  // Stories
  STORIE_LIST: `${CONFIG.BASE_URL}/stories`,
  STORIE_DETAIL: (id) => `${CONFIG.BASE_URL}/stories/${id}`,
  STORE_NEW_STORIE: `${CONFIG.BASE_URL}/stories`,
};

export async function getRegistered({ name, email, password }) {
  const data = JSON.stringify({ name, email, password });

  const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });

  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  }
}

export async function getLogin({ email, password }) {
  const data = JSON.stringify({ email, password });

  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getAllStories() {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.STORIE_LIST, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  
  const json = await fetchResponse.json();  

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}
export async function getStoryById(id) {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.STORIE_DETAIL(id), {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const json = await fetchResponse.json();  

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function storeNewReport({
  title,
  damageLevel,
  description,
  evidenceImages,
  latitude,
  longitude,
}) {
  const accessToken = getAccessToken();

  const formData = new FormData();
  formData.set('description', description);
  formData.set('lat', latitude);
  formData.set('lon', longitude);
  evidenceImages.forEach((evidenceImage) => {
    formData.append('photo', evidenceImage);
  });  

  const fetchResponse = await fetch(ENDPOINTS.STORE_NEW_STORIE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}