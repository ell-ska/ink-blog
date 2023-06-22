const createSlug = (title : string) => {
    // return encodeURI(title.split(' ').join('-').toLowerCase())
    return title.toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
}
  
export default createSlug