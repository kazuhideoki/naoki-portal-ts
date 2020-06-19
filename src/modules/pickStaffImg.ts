import { TstaffImg } from "../img/staff/staffImg";

// 受け取ったuserIDを対応する画像の名前(例:img7)を、staffImgから出力する
export const pickStaffImg = (staffImg: TstaffImg, num: string | number) => {
    const imgNum = 'img' + num
    let img: string[] = []

    for (var key in staffImg) {
      if (key === imgNum) {
        //@ts-ignore
        img.push(staffImg[key]);
      }
    }
    return img[0]
}