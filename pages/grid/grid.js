Page({
  data: {
    todayList: []
  },
  onLoad() {
    this.getColorData()
  },
  getColorData() { // 按颜色
    let dataList = [
      {
        "size": ["L", "XL", "S", "M"],
        "color": ["黑", "白", "黄", "红"],
        "detail": {
          "黑": {
            "L": 25,
            "XL": 25,
            "M": 50
          },
          "白": {
            "L": 25,
            "XL": 25,
            "M": 45
          },
          "黄": {
            "L": 25,
            "XL": 25,
            "S": 48,
            "M": 50
          },
          "红": {
            "M": 50
          }
        }
      }
    ]

    // let listData = [
    //   {
    //     colorName: '红色',
    //     subtotal: '149'
    //     sizeArr: [
    //       {sizeName: 'M', sizeValue: '149'}
    //     ]
    //   },
    //   {
    //     colorName: '黑色',
    //     subtotal: '54'
    //     sizeArr: [
    //       {sizeName: 'M', sizeValue: '9'},
    //       {sizeName: 'S', sizeValue: '45'}
    //     ]
    //   }
    // ]

    let todayList = dataList.map(item => {
      let size = item.size
      let detail = item.detail

      let listData = []
      for (let key in detail) {
        let obj = {}
        obj.colorName = key
        obj.sizeArr = []

        for (let i = 0; i < size.length; i++) {
          for (let index in detail[key]) {
            if (index == size[i]) {
              obj.sizeArr.push({
                sizeIndex: i,
                sizeName: index,
                sizeValue: detail[key][index]
              })
            }
          }
        }

        // 遍历尺寸数组长度
        size.map((element, num) => {
          obj.sizeArr.push({
            sizeIndex: num,
            sizeName: element,
            sizeValue: 0
          })
        })

        // 对象数组去重
        let newObj = {};
        obj.sizeArr = obj.sizeArr.reduce((item, next) => {
          newObj[next.sizeName] ? '' : newObj[next.sizeName] = true && item.push(next);
          return item;
        }, []);

        // 按指定序列排序
        obj.sizeArr.sort((start, next) => {
          // 按sizeName的指定顺序排序
          return size.indexOf(start.sizeName) - size.indexOf(next.sizeName)
        })

        // 小计
        let subtotal = 0
        obj.sizeArr.map(item => {
          subtotal += item.sizeValue
        })
        obj.subtotal = subtotal
        listData.push(obj)
      }
      item.listData = listData

      // 合计
      let total = 0
      listData.map(element => {
        total += element.subtotal
      })
      item.total = total

      return item
    })

    this.setData({
      todayList: todayList
    })
  }
});