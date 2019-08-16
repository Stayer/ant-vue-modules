import axios from 'axios'
const url = "/api/teams"
let opts = {
  auth: {
    username: '',
    password: ''
  }
}

class TeamService {
  static get() {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await axios.get(url, opts)
        const data = res.data
        resolve(
          data.map(user => ({
            ...user
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
          reject(err)
        }
      })
    }
    static add(team) {
      return new Promise( async (resolve, reject) => {
        try {
          await axios.put(url, team, opts)
          resolve()
        } catch(err) {
          reject(err);
        }
      })
    }
    static delete(_id) {
      return new Promise( async (resolve, reject) => {
        try {
          await axios.delete(url, {data: {_id}, auth: opts.auth})
          resolve()
        } catch(err) {
          reject(err)
        }
      })
    }
    // static edit(_userdata) {
    // }
  }
  
  export default TeamService;