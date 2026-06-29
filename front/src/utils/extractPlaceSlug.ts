function extractPlaceSlug(url: string) {
  if (url.includes('eda.yandex.ru') && url.includes('placeSlug=')) {
    const regex = /[?&]placeSlug=([^?&]+)/
    const match = url.match(regex)
    if (match && match[1]) {
      return match[1]
    }
  }
  return 'invalidSlug'
}

export default extractPlaceSlug
