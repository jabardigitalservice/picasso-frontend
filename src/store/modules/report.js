import requestServer from '@/api'
import request from '@/utils/request'

export const actions = {
    async getListReport ({ commit }, params) {
        try {
            const response = await requestServer('/logbook/', 'GET', params)
            return response
        } catch (error) {
            return error.response
        }
    },
    async getListReportByUser ({ commit }, params) {
        try {
            const response = await requestServer('/monthly-report/', 'GET', params)
            return response
        } catch (error) {
            return error.response
        }
    },
    async downloadReportPdf ({ commit }, query) {
        const {
            userId,
            params,
        } = query
        try {
            const response = await request({
                url: `/export-pdf/report-by-user/download/${userId}`,
                method: 'GET',
                params: params,
                responseType: 'blob',
            })
            return response
        } catch (error) {
            return error.response
        }
    },
    async viewReportPdf ({ commit }, query) {
        const {
            userId,
            params,
        } = query
        try {
            const response = await request({
                url: `/export-pdf/report-by-user/view/${userId}`,
                method: 'GET',
                params: params,
            })
            return response
        } catch (error) {
            return error.response
        }
    },
    async downloadDailyReportPdf ({ commit }, query) {
        const {
            userId,
            params,
        } = query
        try {
            const response = await request({
                url: `/export-pdf/report-by-user/daily/download/${userId}`,
                method: 'GET',
                params: params,
                responseType: 'blob',
            })
            return response
        } catch (error) {
            return error.response
        }
    },
    async viewDailyReportPdf ({ commit }, query) {
        const {
            userId,
            params,
        } = query
        try {
            const response = await request({
                url: `/export-pdf/report-by-user/daily/view/${userId}`,
                method: 'GET',
                params: params,
            })
            return response
        } catch (error) {
            return error.response
        }
    },
    async exportExcelByDivisi ({ commit }, params) {
        try {
            const response = await request({
                url: '/export-excel/divisi/',
                method: 'GET',
                params: params,
                responseType: 'blob',
            })
            return response
        } catch (error) {
            return error.response
        }
    },
    async exportExcelByCategory ({ commit }, params) {
        try {
            const response = await request({
                url: '/export-excel/category/',
                method: 'GET',
                params: params,
                responseType: 'blob',
            })
            return response
        } catch (error) {
            return error.response
        }
    },
}
