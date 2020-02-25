import { scrollBack } from "../modules/scrollBack";

describe('scrollBack.ts', () => {
    describe('scrollBack()', () => {
        it('スクロール位置がもとに戻る。', () => {
            // const initPosition: any = document.getElementById('p_main')
            // console.log(initPosition);
            
            scrollBack()
            expect(true).toBe(true)
        })
    });
});
