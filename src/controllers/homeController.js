//đây chính là controllerrrrrrrrrrrrr
const getHomepage = (req, res) => {
    // process data
    // call model
    res.send('Hello world với Hoi Dan IT & Eric! & nodemon')
}

const getABC = (req, res) => { // nếu mà ta định nghĩa 1 cái hàm đơn lẻ không trong cái web.js kia thì ta sẽ khong có hai biến req và res
    res.send('get ABC')
}
const getHoiDanIT = (req, res) =>{
        // res.send("1111111111 vs Nam Anh");
        res.render("sample.ejs"); // tạo ra 1 view động
}


module.exports = { //export ra nhiều biến(object)
    getHomepage, getABC, getHoiDanIT
}