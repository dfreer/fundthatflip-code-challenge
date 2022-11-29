import { apiServiceTypes } from '@/inc/api'
import { useSnackbarStore } from '@/stores'
import BaseService from './baseService'
import { useApplicationStore } from '@/stores'

class ExampleBaseService extends BaseService {
  constructor() {
    super({ apiServiceType: apiServiceTypes.BASE })
  }
  async get() {
    try {
      const { data } = await this.api.get('example')
      console.log(data)
    } catch {
      useSnackbarStore().error('Error retrieving data!')
    }
  }
}

export default new ExampleBaseService()
