import type { UrlItem } from '../url-storage'

export const urlItemMapper = (item: UrlItem) => {
  const defaultItem = document.createElement('li')
  defaultItem.innerText = item.urlId

  const template = document.getElementById('url-item-template') as HTMLTemplateElement

  if (!template) return defaultItem

  const listItem = document.importNode(template.content, true)
  const originalUrls = listItem.querySelectorAll('.shortened-url-original--code')
  const shortenedUrl = listItem.getElementById('shortened-url') as HTMLInputElement
  const copyBtn = listItem.getElementById('copy-btn') as HTMLButtonElement

  if (!originalUrls || !shortenedUrl) return defaultItem

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(shortenedUrl.value)
  })

  originalUrls.forEach((originalUrl) => {
    originalUrl.innerHTML = item.original
  })

  shortenedUrl.value = `tito.io/${item.urlId}`

  return listItem
}
