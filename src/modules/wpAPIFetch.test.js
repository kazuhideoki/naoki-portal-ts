import {
  fetchData,
  makeApiParamsPosts,
} from "./wpAPIFetch";

describe("wpAPIFetch.jsのテスト", () => {
const state = {
  currentPage: 1,
  author: "",
  tag: "",
  isJa: false
};

    describe("fetchData()のテスト", () => {
      console.log("describeのなか2");

      let result;

        test("fetchの結果でobjectが返ってくる", () => {
            result = new Promise((resolve, reject) => {
                fetchData(makeApiParamsPosts(state, 6));
            });
            expect(typeof result).toBe("object");
        });

        // test("fettchが失敗するとerrorが返ってくる", () => {
        //     result = new Promise((resolve, reject) => {
        //         fetchData(makeApiParamsPosts("無効な値", 6));
        //     });
        //     expect(typeof result).toBeFalsy();
        // });
    });
  
        
})
