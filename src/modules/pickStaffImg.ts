// 受け取ったuserIDを対応する画像の名前(例:img7)を、staffImgから出力する
export const pickStaffImg = (staffImg: string[], num: string | number) => {
    const imgNum = 'img' + num
    let img: string[] = []
    staffImg.forEach((value: string) => {
        if (!(value.indexOf(imgNum) === -1)) {
            img.push(value)
        }
    })
    return img[0]
}