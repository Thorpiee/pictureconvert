type EventParams = Record<string, any>

function stableStringify(value: unknown): string {
    if (value === null) return "null"
    if (value === undefined) return "undefined"
    if (typeof value !== "object") return JSON.stringify(value)
    if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`
    const obj = value as Record<string, unknown>
    const keys = Object.keys(obj).sort()
    return `{${keys.map((k) => `${JSON.stringify(k)}:${stableStringify(obj[k])}`).join(",")}}`
}

const lastFiredAt = new Map<string, number>()

export function trackEvent(
    eventName: string,
    params: EventParams = {}
) {
    if (typeof window === "undefined") return
    if (!("gtag" in window)) return

    const key = `${eventName}|${stableStringify(params)}`
    const now = Date.now()
    const last = lastFiredAt.get(key)
    if (last && now - last < 1000) return
    lastFiredAt.set(key, now)

    // @ts-ignore
    window.gtag("event", eventName, params)
}

export function getToolNameFromPath(pathname?: string) {
    const path = pathname ?? (typeof window !== "undefined" ? window.location.pathname : "")
    const firstSegment = path.split("/").filter(Boolean)[0] ?? ""
    return firstSegment.replace(/-/g, "_")
}

export function trackToolView(toolName: string, path: string) {
    trackEvent("tool_view", {
        tool_name: toolName.replace(/-/g, "_"),
        page_path: path,
    })
}

export function trackFileUpload(toolName: string, fileType: string, fileSizeKb: number, fileCount: number = 1) {
    trackEvent("file_upload", {
        tool_name: toolName.replace(/-/g, "_"),
        file_type: fileType,
        file_size_kb: Math.round(fileSizeKb),
        file_count: fileCount,
    })
}

export function trackConvertStart(toolName: string, operationType: string, targetFormat?: string, presetName?: string) {
    return
}

export function trackConvertComplete(
    toolName: string,
    durationMs: number,
    outputSizeKb: number,
    success: boolean = true,
    errorMessage?: string
) {
    return
}

export function trackDownloadClick(toolName: string, outputFormat: string, outputSizeKb: number, fileCount: number = 1) {
    return
}

export function trackConversionComplete(toolName: string, outputFormat: string) {
    const format = outputFormat.includes("/") ? outputFormat.split("/")[1] : outputFormat
    trackEvent("conversion_complete", {
        tool_name: toolName.replace(/-/g, "_"),
        output_format: format === "jpeg" ? "jpg" : format,
    })
}
