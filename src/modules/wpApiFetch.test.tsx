import {
    setAuthorName, sortDataPosts, formatDate
} from "./wpApiFetch";
import { sortDataPosts as articles } from "../testData/testDataSortDataPosts";
import { wpData } from "../testData/testDataWpData";


describe('wpApiFetch.tsx', () => {
    describe('setAuthorName()', () => {
        it('authorNmameに名前の値をセット', () => {
            let result = setAuthorName(articles, wpData)
            expect(typeof result[0].authorName).toBe(typeof 'oki')
        });
    });
    describe('formatDate()', () => {
        it('出力値のフォーマットはdd/mm/yyyy', () => {
            const result = formatDate(articles)
            expect(result[0].date).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/)
        });
    });
});