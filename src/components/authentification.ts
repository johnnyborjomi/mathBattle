export async function checkUserAuth(url, userName, userPass) {
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: userName,
      pass: userPass
    })
  }).then(data => data.json());
}
