export type UrlItem = {
  urlId: string
  original: string
  createdAt: number
}

export class UrlStorage {
  constructor(private key: string) {}

  getItems(): UrlItem[] {
    const rawItems = localStorage.getItem(this.key)
    if (!rawItems) return []

    try {
      const items = JSON.parse(rawItems)
      if (Array.isArray(items)) return items
    } catch (error) {}

    return []
  }

  add(item: UrlItem) {
    const items = this.getItems()
    items.unshift(item)

    localStorage.setItem(this.key, JSON.stringify(items))
  }
}
