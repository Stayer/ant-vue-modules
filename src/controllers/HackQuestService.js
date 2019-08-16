import axios from 'axios'
const url = "/api/hackquest"
let opts = {
  auth: {
    username: '',
    password: ''
  }
}

class HackQuestService {
  static get() {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await axios.get(url, opts)
        resolve(res.data)
      } catch(err) {
        reject(err)
      }
    })
  }
  static edit(_id, _field, _value) {
    return new Promise( async (resolve, reject) => {
      try {
        await axios.post(url + '/updOneField', {id: _id, field: _field, value: _value}, opts)
        resolve()
      } catch(err) {
        reject(err);
      }
    })
  }
}
  
  export default HackQuestService;