/**
 * Use this service if you want to show success and error messages by default
 * Best used in forms or CRUD actions
 * Set the snackbarLabel to the singular version of whatever resource you are performing the CRUD ops on
 * The default message will be: `${snackbarLabel} has been ${method} successfully!`
 *
 * Pass snackbarError (boolean) in your components or sub services to override the default bahavior
 * Pass successMessage (string) in your components or sub services to override the default bahavior
 *
 */
import { parseUrl } from '@/inc/utils'
import BaseService from './BaseService'

export default class extends BaseService {
  #url
  #snackbarLabel
  constructor({ url, snackbarLabel = 'Resource' }) {
    super()
    this.#snackbarLabel = snackbarLabel
    this.#url = url
  }

  index({ urlParams = null, config = null } = {}) {
    return this.api.get(parseUrl(this.#url, urlParams), config)
  }

  show(id, { urlParams = null, config = null } = {}) {
    return this.api.get(`${parseUrl(this.#url, urlParams)}/${id}`, config)
  }

  store(data = {}, { urlParams = null, config = null } = {}, useFormData = false) {
    return this.api.post(parseUrl(this.#url, urlParams), useFormData ? this.convertToFormData(data) : data, this.formatConfig(config, 'created'))
  }

  update(id, data = {}, { urlParams = null, config = null } = {}, useFormData = false) {
    return this.api.put(`${parseUrl(this.#url, urlParams)}/${id}`, useFormData ? this.convertToFormData(data) : data, this.formatConfig(config, 'updated'))
  }

  destroy(id, { urlParams = null, config = null } = {}) {
    return this.api.delete(`${parseUrl(this.#url, urlParams)}/${id}`, this.formatConfig(config, 'deleted'))
  }

  formatConfig(config, method) {
    return {
      snackbarError: true,
      successMessage: `${this.#snackbarLabel} has been ${method} successfully!`,
      ...config,
    }
  }
}
