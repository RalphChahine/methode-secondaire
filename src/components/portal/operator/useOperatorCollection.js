import { useCallback, useEffect, useRef, useState } from "react"

import { getPortalOperatorCollection } from "@/lib/portalClient"

export function useOperatorCollection({ token, collection, query = "", initialItems = [] }) {
  const [items, setItems] = useState(() => (Array.isArray(initialItems) ? initialItems : []))
  const [nextCursor, setNextCursor] = useState("")
  const [total, setTotal] = useState(Array.isArray(initialItems) ? initialItems.length : 0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const requestId = useRef(0)

  const load = useCallback(async ({ cursor = "", append = false } = {}) => {
    if (!token) {
      setItems(Array.isArray(initialItems) ? initialItems : [])
      setNextCursor("")
      setTotal(Array.isArray(initialItems) ? initialItems.length : 0)
      return
    }

    const currentRequest = requestId.current + 1
    requestId.current = currentRequest
    setIsLoading(true)
    setError("")
    const result = await getPortalOperatorCollection({ token, collection, query, cursor, pageSize: 25 })
    if (requestId.current !== currentRequest) return
    setIsLoading(false)
    if (!result?.ok) {
      setError(result?.code || "OPERATOR_COLLECTION_FAILED")
      if (!append) setItems([])
      return
    }

    const nextItems = Array.isArray(result.items) ? result.items : []
    setItems((current) => append ? [...current, ...nextItems] : nextItems)
    setNextCursor(result.next_cursor || "")
    setTotal(Number(result.total) || nextItems.length)
  }, [collection, initialItems, query, token])

  useEffect(() => {
    load()
    return () => {
      requestId.current += 1
    }
  }, [load])

  return {
    items,
    nextCursor,
    total,
    isLoading,
    error,
    loadMore: () => load({ cursor: nextCursor, append: true }),
  }
}
