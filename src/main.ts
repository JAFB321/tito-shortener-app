import './styles/style.css'
import './styles/tooltip.css'
import './styles/custom.css'
import './styles/loader.css'

import { postUrl } from './api'
import { UrlStorage } from './url-storage'
import { urlItemMapper } from './mappers/urlItem'

function setup() {
  const urlStorage = new UrlStorage('tito--short-url-list')

  const [urlListContainer] = document.getElementsByClassName('shortened-url-list-container')
  const [urlList] = urlListContainer.getElementsByClassName('shortened-url-list')

  const shortUrlBtn = document.getElementById('short-url-btn') as HTMLElement
  const shortUrlInput = document.getElementById('short-url') as HTMLInputElement

  shortUrlInput?.addEventListener('input', (event) => {
    const input = event.target as HTMLInputElement
    const value = input.value

    if (value.length > 0) {
      input.classList.add('filled')
      shortUrlBtn.classList.remove('hide')
    } else {
      input.classList.remove('filled')
      shortUrlBtn.classList.add('hide')
    }
  })

  const updateUrlList = () => {
    const items = urlStorage.getItems()

    if (items.length === 0) urlListContainer.classList.add('hide')
    else urlListContainer.classList.remove('hide')

    urlList.innerHTML = ''

    items.forEach((item) => {
      const listItem = urlItemMapper(item)
      urlList.appendChild(listItem)
    })
  }

  const onShortUrlBtnClick = async () => {
    const url = shortUrlInput?.value
    if (!url) return

    shortUrlBtn.innerHTML = '<span class="loader"></span>'
    const response = await postUrl(url)
    shortUrlBtn.innerHTML = 'Make it short'

    if (!response?.urlId) return alert('Failed to shorten URL')
    urlStorage.add({ urlId: response.urlId, original: url, createdAt: Date.now() })
    updateUrlList()
  }

  shortUrlBtn?.addEventListener('click', () => onShortUrlBtnClick())
  shortUrlInput?.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      onShortUrlBtnClick()
    }
  })

  updateUrlList()
}

document.addEventListener('DOMContentLoaded', () => setup())
