import CrudService from './CrudService.js'

class ExampleCrudService extends CrudService {
  constructor() {
    super({ url: 'example', snackbarLabel: 'Example' })
  }
}

export default new ExampleCrudService()
