import {
    setAuthorName
} from "../modules/organizeData";
import { sortDataPosts as articles } from "./testDataSortDataPosts";
import { wpData } from "./testDataWpData";


describe('wpApiFetch.tsx', () => {
    describe('setAuthorName()', () => {
        it('authorNmameに名前の値をセット', () => {
            let result = setAuthorName(articles, wpData)
            expect(typeof result[0].authorName).toBe(typeof 'oki')
        });
    });
});
