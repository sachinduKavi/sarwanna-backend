import fs from 'fs'



export function deleteImage(imageUrl: string) {
    const imageLocation = "./public/" + imageUrl.replace('\\', '/')
    console.log(imageLocation)
    fs.unlink(imageLocation, err => {
        // throw err;
        console.log('error', err)
    })
}