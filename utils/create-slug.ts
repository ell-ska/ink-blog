const createSlug = (title : string) => {
    return encodeURI(title.split(' ').join('-').toLowerCase())
}
  
export default createSlug