// "use client"

// import * as React from "react"
// import * as TabsPrimitive from "@radix-ui/react-tabs"

// import { cn } from "@/lib/utils"

// const Tabs = TabsPrimitive.Root

// const TabsList = React.forwardRef(({ className, ...props }, ref) => (
//   <TabsPrimitive.List
//     ref={ref}
//     className={cn(
//       "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
//       className
//     )}
//     {...props} />
// ))
// TabsList.displayName = TabsPrimitive.List.displayName

// const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
//   <TabsPrimitive.Trigger
//     ref={ref}
//     className={cn(
//       "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
//       className
//     )}
//     {...props} />
// ))
// TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

// const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
//   <TabsPrimitive.Content
//     ref={ref}
//     className={cn(
//       "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
//       className
//     )}
//     {...props} />
// ))
// TabsContent.displayName = TabsPrimitive.Content.displayName

// export { Tabs, TabsList, TabsTrigger, TabsContent }


























"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

// ScrollTabs behaviour: if the tab list is wider than its container it scrolls
// horizontally (touch-friendly, no visible scrollbar), shows a soft fade on the
// side(s) that have more content, and keeps the active tab scrolled into view.
// Desktop (non-overflowing) rendering is unchanged.
const EDGE = 24

const TabsList = React.forwardRef(({ className, style, onScroll, ...props }, ref) => {
  const innerRef = React.useRef(null)
  const [fade, setFade] = React.useState({ left: false, right: false })

  const setRefs = React.useCallback((node) => {
    innerRef.current = node
    if (typeof ref === "function") ref(node)
    else if (ref) ref.current = node
  }, [ref])

  const updateFade = React.useCallback(() => {
    const el = innerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const left = el.scrollLeft > 1
    const right = max > 1 && el.scrollLeft < max - 1
    setFade((prev) => (prev.left === left && prev.right === right ? prev : { left, right }))
  }, [])

  const scrollActiveIntoView = React.useCallback(() => {
    const el = innerRef.current
    if (!el) return
    const active = el.querySelector('[data-state="active"]')
    if (!active) return
    const target = active.offsetLeft - (el.clientWidth - active.offsetWidth) / 2
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollTo({ left: Math.max(0, target), behavior: reduce ? "auto" : "smooth" })
  }, [])

  React.useEffect(() => {
    const el = innerRef.current
    if (!el) return undefined
    updateFade()
    scrollActiveIntoView()

    let ro
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(updateFade)
      ro.observe(el)
    }
    const mo = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.attributeName === "data-state")) {
        scrollActiveIntoView()
      }
      updateFade()
    })
    mo.observe(el, { attributes: true, attributeFilter: ["data-state"], subtree: true, childList: true })

    return () => {
      if (ro) ro.disconnect()
      mo.disconnect()
    }
  }, [updateFade, scrollActiveIntoView])

  const mask =
    fade.left || fade.right
      ? `linear-gradient(to right, ${fade.left ? "transparent" : "#000"} 0, #000 ${fade.left ? EDGE : 0}px, #000 calc(100% - ${fade.right ? EDGE : 0}px), ${fade.right ? "transparent" : "#000"} 100%)`
      : undefined

  return (
    <TabsPrimitive.List
      ref={setRefs}
      onScroll={(e) => {
        updateFade()
        if (onScroll) onScroll(e)
      }}
      style={mask ? { WebkitMaskImage: mask, maskImage: mask, ...style } : style}
      className={cn(
        "inline-flex h-9 [@media(pointer:coarse)]:h-[52px] max-w-full items-center justify-center overflow-x-auto overscroll-x-contain rounded-lg bg-muted p-1 text-muted-foreground [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>:first-child]:ml-auto [&>:last-child]:mr-auto",
        className
      )}
      {...props} />
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md px-3 py-1 [@media(pointer:coarse)]:min-h-11 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props} />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props} />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }