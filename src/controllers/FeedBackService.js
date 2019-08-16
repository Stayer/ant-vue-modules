import axios from 'axios'
const url = "/api/feedback"
let opts = {
    auth: {
    username: '',
    password: ''
  }
}

class FeedBackService {
  static get() {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await axios.get(url, opts)
        const data = res.data
        resolve(
          data.map(feedback => ({
            ...feedback
          }))
        )
      } catch(err) {
        reject(err)
      }
    })
  }
}
  
  export default FeedBackService;