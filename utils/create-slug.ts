const createSlug = (title : string) => {
    return title.split(' ').join('-').toLowerCase()
}
  
export default createSlug