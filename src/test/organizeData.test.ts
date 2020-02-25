import { formatDate } from "../modules/organizeData";
import { sortDataPosts as articles } from "./testDataSortDataPosts";

describe('organizeData.ts', () => {
    describe('formatDate()', () => {
        it('出力値のフォーマットはdd/mm/yyyy', () => {
            const result = formatDate(articles)
            expect(result[0].date).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/)
        });
    });
    describe('setAuthorImg', () => {
        it.todo('出力値はSortDataPosts、純粋関数')
        it.todo('スタッフのidと画像が一致')
    })
});
