import {
    setAuthorName
} from "../modules/organizeData";
import { sortDataPosts as articles } from "./testDataSortDataPosts";
import { wpData } from "./testDataWpData";
import { getWpPosts2 } from "../modules/wpApiFetch";


describe('wpApiFetch.tsx', () => {
    describe('setAuthorName()', () => {
        it('authorNmameに名前の値をセット', () => {
            let result = setAuthorName(articles, wpData)
            expect(typeof result[0].authorName).toBe(typeof 'oki')
        });
    });
    describe('getWpPosts2()', () => {
        it.todo('てすと')
    });
});
 