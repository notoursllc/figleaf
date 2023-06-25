import { describe, it, expect } from 'vitest';
import { getIdFromUrl } from './youtube.js'

const id = 'lalOy8Mbfdc';
const sampleUrls = [
    `http://www.youtube.com/watch?v=${id}`,
    `https://www.youtube.com/watch?v=${id}`,

    `http://youtube.com/watch?v=${id}`,
    `https://youtube.com/watch?v=${id}`,

    `http://youtu.be/${id}`,
    `https://youtu.be/${id}`,

    `http://www.youtube.com/e/${id}`,
    `https://www.youtube.com/e/${id}`,

    `http://youtube.com/e/${id}`,
    `https://youtube.com/e/${id}`,

    `http://m.youtube.com/e/${id}`,
    `https://m.youtube.com/e/${id}`,

    `https://m.youtube.com/watch?v=${id}`,
    `http://m.youtube.com/watch?v=${id}`,

    `http://www.youtube.com/embed/${id}?rel=0`,
    `https://www.youtube.com/embed/${id}?rel=0`,

    `http://youtube.com/embed/${id}?rel=0`,
    `https://youtube.com/embed/${id}?rel=0`,

    `http://m.youtube.com/embed/${id}?rel=0`,
    `https://m.youtube.com/embed/${id}?rel=0`,

    `http://www.youtube-nocookie.com/embed/${id}?rel=0`,
    `https://www.youtube-nocookie.com/embed/${id}?rel=0`,
]

describe('getIdFromUrl', () => {
    it('gets the ID from URL', () => {
        sampleUrls.forEach(url => {
            expect( getIdFromUrl(url) ).toEqual(id)
        })
    })
})
