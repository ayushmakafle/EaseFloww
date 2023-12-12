export const imageFromBuffer=({type,data})=>{
   const uint8Array = new Uint8Array(data)
   const blob = new Blob([uint8Array], { type: type })
   const imageUrl = URL.createObjectURL(blob)
   return imageUrl
}