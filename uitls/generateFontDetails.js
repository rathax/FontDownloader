import fs from "fs";


const respJson = await fetch("https://fontdownloader.org/api/fonts").then(res => res.json())
const fontsDetailsArray = []
for (const [index, element] of respJson.entries()) {
  console.log(`${index + 1}/${respJson.length}`)
  const resp2 = await fetch("https://fontdownloader.org/api/fonts/" + element.id)
  .then(res => res.json())
  .catch(() => {
    console.log(`error fetich ${element.id}`)
    return null
  })
  fontsDetailsArray.push(resp2 ? resp2 : {id: element.id})
}
const fileContent2 = `${JSON.stringify(fontsDetailsArray)}`
fs.writeFile("./api/fontDetails.json", fileContent2, (err) => {
  if (err) {
    throw err;
  }
});