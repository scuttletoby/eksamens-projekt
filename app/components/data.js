import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

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

// export async function createEvent({ arg }) {
//   return fetch(`http://localhost:5888/events/admin`, {
//     method: 'POST',
//     body: JSON.stringify(arg)
//   })
// }

/* Temp admin section */

export async function adminCreate(type, arg) {
  fetch(`http://localhost:5888/${type}/admin`, {
    method: 'POST',
    body: JSON.stringify(arg)
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Noget gik galt, status: ${response.status}`);
    }
    console.log("Du oprettede et nyt event!");
  });
}

export async function createInquery(arg) {
  fetch(`http://localhost:5888/inqueries`, {
    method: 'POST',
    body: JSON.stringify(arg)
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Noget gik galt, status: ${response.status}`);
    }
    console.log("Du oprettede en ny besked!");
  });
}

export async function createEvent(arg) {
  fetch(`http://localhost:5888/events/admin`, {
    method: 'POST',
    body: JSON.stringify(arg)
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Noget gik galt, status: ${response.status}`);
    }
    console.log("Du oprettede en ny besked!");
  });
}

export async function createGoal(arg) {
  fetch(`http://localhost:5888/goals/admin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {"goal":"goalnew","goalcount":"5121","icon":"far fa-handshake","order":"1"},
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Noget gik galt, status: ${response.status}`);
    }
    console.log("Du oprettede et nyt goal!");
  });
}

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