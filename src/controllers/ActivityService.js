import axios from 'axios'
const url = "/api/activities"
let opts = {
    auth: {
    username: '',
    password: ''
  }
}

class ActivityService {
  static get() {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await axios.get(url, opts)
        const data = res.data
        resolve(
          data.map(activity => ({
            ...activity
          }))
        )
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
  static add(activity) {
    return new Promise( async (resolve, reject) => {
      try {
        await axios.put(url + '/', activity, opts)
        resolve()
      } catch(err) {
        reject(err)
      }
    })
  }
  static delete(_id) {
    return new Promise( async (resolve, reject) => {
      try {
        await axios.delete(url + '/', {data: {_id}}, opts)
        resolve()
      } catch(err) {
        reject(err)
      }
    })
  }
    // static edit(_userdata) {
    // }
}
  
  export default ActivityService;