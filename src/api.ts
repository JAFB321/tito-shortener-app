export const BASE_API = 'https://2knumhsj51.execute-api.us-east-1.amazonaws.com/dev'

export const postUrl = (url: string): Promise<any> => {
  return fetch(BASE_API + '/short-url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  })
    .then((response) => response.json())
    .then((response) => response?.data ?? null)
    .catch((error) => {
      console.error(error)
      return null
    })
}
