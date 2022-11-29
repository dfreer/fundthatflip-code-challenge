// wait until a condition is met
export const until = (condition, delay = 300) => {
  if (typeof condition !== 'function') {
    throw new Error('condition must be a callable function')
  }
  const poll = (resolve) => {
    if (condition()) resolve()
    else setTimeout(() => poll(resolve), delay)
  }
  return new Promise(poll)
}

// format a url by replacing values with :placeholders
export const parseUrl = (url, params = {}) => {
  if (!url.includes(':')) return url

  return url
    .split('/')
    .map((item) => {
      const isParameter = item.startsWith(':')
      if (!isParameter) return item
      return params[item.substring(1)] ?? null
    })
    .join('/')
}

// delay a method by n seconds
export const debounce = (func, timeout) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(args)
    }, timeout)
  }
}
