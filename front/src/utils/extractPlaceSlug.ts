function extractPlaceSlug(url: string) {
  if (url.includes('eda.yandex.ru')) {
    const regex = /[?&]placeSlug=([^?&]+)/
    const match = url.match(regex)
    if (match && match[1]) {
      return match[1]
    }
    return null
  } else {
    return url
  }
}

export default extractPlaceSlug
