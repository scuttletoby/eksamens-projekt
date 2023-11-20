import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export async function sendRequest(url, { arg }) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg)
  })
}

export function getEvents() {
  const { data, error, isLoading } = useSWR(`http://localhost:5888/events`, fetcher);

  return {
    data,
    isLoading,
    isError: error
  }
}

export function getEvent(id) {
  const { data, error, isLoading } = useSWR(`http://localhost:5888/events/${id}`, fetcher);

  return {
    data,
    isLoading,
    isError: error
  }
}

export function getEventCategories() {
  const { data, error, isLoading } = useSWR(`http://localhost:5888/eventcategories/`, fetcher);

  return {
    data,
    isLoading,
    isError: error
  }
}

export function getGoals() {
  const { data, error, isLoading } = useSWR(`http://localhost:5888/goals`, fetcher);

  return {
    data,
    isLoading,
    isError: error
  }
}

export function getCommunity() {
  const { data, error, isLoading } = useSWR(`http://localhost:5888/community`, fetcher);

  return {
    data,
    isLoading,
    isError: error
  }
}

export function getHero(id) {
  const { data, error, isLoading } = useSWR(`http://localhost:5888/heros/${id}`, fetcher);

  return {
    data,
    isLoading,
    isError: error
  }
}

export function getContactInfo() {
  const { data, error, isLoading } = useSWR(`http://localhost:5888/contactinformation`, fetcher);

  return {
    data,
    isLoading,
    isError: error
  }
}

export function getNews() {
  const { data, error, isLoading } = useSWR(`http://localhost:5888/news`, fetcher);

  return {
    data,
    isLoading,
    isError: error
  }
}

export function getNewsArticle(id) {
  const { data, error, isLoading } = useSWR(`http://localhost:5888/news/${id}`, fetcher);

  return {
    data,
    isLoading,
    isError: error
  }
}

export function createInquery(arg) {
  const { data, error, isLoading } = useSWR(`http://localhost:5888/inqueries`, fetcher2(arg));

  return {
    data,
    isLoading,
    isError: error
  }
}

/* Temp admin section */

export async function deleteGoal(id) {
  fetch(`http://localhost:5888/goals/admin/${id}`, {
    method: 'DELETE'
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Noget gik galt, status: ${response.status}`);
    }
    console.log("Du slettede et goal!");
  });
}