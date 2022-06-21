import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class PostsService {
    async getPosts() {
        const res = await api.get('/api/posts')
        logger.log(res.data)
        AppState.posts = res.data.posts
    }
    async getAds() {
        const res = await api.get('/api/ads')
        logger.log(res.data)
        AppState.ads = res.data
    }
    async getProfilePosts(profileId) {
        const res = await api.get(`api/posts?creatorId=${profileId}`)
        logger.log('-getProfilePosts-', res.data)
        AppState.posts = res.data.posts
    }
    async createPost(postData) {
        const res = await api.post('api/posts', postData)
        logger.log('-createPost-', res.data)
        AppState.posts.push(res.data)
    }
    async deletePost(id) {
        const res = await api.delete('api/posts/' + id)
        logger.log('-deletePost-', res.data)
        AppState.posts = AppState.posts.filter(p => p.id != id)
    }
    async likePost(id) {
        const res = await api.post('api/posts/' + id + '/like')
        logger.log('-likePost-', res.data)
    }
    async changePage(pageNumber) {
        const res = await api.get(`api/posts?page=${pageNumber}`)
        logger.log('-changePage-', res.data)
        AppState.posts = res.data.posts
        logger.log(AppState.posts, 'new page posts')
        AppState.currentPage += 1;
        AppState.totalPages = res.data.totalPages
    }
    async changePagePrev(pageNumber) {
        const res = await api.get(`api/posts?page=${pageNumber}`)
        logger.log('-changePage-', res.data)
        AppState.posts = res.data.posts
        logger.log(AppState.posts, 'new page posts')
        AppState.currentPage -= 1;
        AppState.totalPages = res.data.totalPages
    }
    async changePageProfile(pageNumber) {
        const res = await api.get(`api/posts?page=${pageNumber}`)
        logger.log('-changePage-', res.data)
        AppState.posts = res.data.posts
        logger.log(AppState.posts, 'new page posts')
        AppState.currentPage += 1;
        AppState.totalPages = res.data.totalPages
    }
    async changePagePrevProfile(pageNumber) {
        const res = await api.get(`api/posts?page=${pageNumber}`)
        logger.log('-changePage-', res.data)
        AppState.posts = res.data.posts
        logger.log(AppState.posts, 'new page posts')
        AppState.currentPage -= 1;
        AppState.totalPages = res.data.totalPages
    }
    async searchPosts(query = '') {
        AppState.uri = 'search/post'
        AppState.query = query
        logger.log('searching', query)
        const res = await api.get(`api/posts?${query}`)
        logger.log('-searchPosts-', res.data)
        AppState.posts = res.data.posts
        AppState.currentPage = res.data.page
        AppState.totalPages = res.data.total_pages
    }
}

export const postsService = new PostsService()