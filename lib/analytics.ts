import { sendGAEvent } from '@next/third-parties/google'

type EventParams = Record<string, string | number | boolean | undefined>

export const GA_EVENTS = {
    TOOL_VIEW: 'tool_view',
    FILE_UPLOAD: 'file_upload',
    CONVERT_START: 'convert_start',
    CONVERT_COMPLETE: 'convert_complete',
    DOWNLOAD_CLICK: 'download_click',
}

export function trackEvent(eventName: string, params?: EventParams) {
    // Only track in production or if explicitly enabled
    // but for this task we want to verify, so we'll allow it if GA ID is present
    if (typeof window !== 'undefined' && window.gtag) {
        sendGAEvent('event', eventName, params || {})

        // Log to console in development for verification
        if (process.env.NODE_ENV === 'development') {
            console.log(`[GA4] ${eventName}`, params)
        }
    }
}

export function trackToolView(toolName: string, toolCategory: string, path: string) {
    trackEvent(GA_EVENTS.TOOL_VIEW, {
        tool_name: toolName,
        tool_category: toolCategory,
        page_path: path,
    })
}

export function trackFileUpload(toolName: string, fileType: string, fileSizeKb: number, fileCount: number = 1) {
    trackEvent(GA_EVENTS.FILE_UPLOAD, {
        tool_name: toolName,
        file_type: fileType,
        file_size_kb: Math.round(fileSizeKb),
        file_count: fileCount,
    })
}

export function trackConvertStart(toolName: string, operationType: string, targetFormat?: string, presetName?: string) {
    trackEvent(GA_EVENTS.CONVERT_START, {
        tool_name: toolName,
        operation_type: operationType,
        target_format: targetFormat,
        preset_name: presetName,
    })
}

export function trackConvertComplete(toolName: string, durationMs: number, outputSizeKb: number, success: boolean = true, errorMessage?: string) {
    trackEvent(GA_EVENTS.CONVERT_COMPLETE, {
        tool_name: toolName,
        duration_ms: Math.round(durationMs),
        output_size_kb: Math.round(outputSizeKb),
        success,
        error_message: errorMessage
    })
}

export function trackDownloadClick(toolName: string, outputFormat: string, outputSizeKb: number, fileCount: number = 1) {
    trackEvent(GA_EVENTS.DOWNLOAD_CLICK, {
        tool_name: toolName,
        output_format: outputFormat,
        output_size_kb: Math.round(outputSizeKb),
        file_count: fileCount,
    })
}
