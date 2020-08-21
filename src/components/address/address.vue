<template>
    <div class="Address">
        <div>地址:{{areaValue}}</div>
        <div class="addBox" @click="pickAddr">选择地址</div>
        <mt-popup v-model="popupVisible" position="bottom" :closeOnClickModal="false" class="pos">
            <mt-picker :slots="areaList" value-key="name" :showToolbar="true" @change="onValuesChange">
                <Slot>
                    <div class="confirmKey">
                        <div class="conf conf_close" @click="closePopup">取消</div>
                        <div class="conf conf_sureArea" @click="sureArea">确定</div>
                    </div>
                </Slot>
            </mt-picker>
        </mt-popup>
    </div>
</template>
<script>
import { Indicator, Toast } from "mint-ui";
import {getNewRegionInfo, test} from "../../sever/api"
import {jsonp} from "../../sever/http"
import axios from 'axios'
axios.defaults.headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
}
// import getjsonp from "fetch-jsonp"

export default {
    data() {
        return {
            handler:function(e){e.preventDefault();}, //阻止body滑动
            popupVisible: false,
            flag: false,//初始时禁止picker自动加载
            areaValue:"省-市-区", //页面上显示的内容
            cityName:"",//最终选中的地区的名字
            cityCode:"",//最终选中的地区的id
            areaList: [
                {
                flex: 1,
                values: ["请选择"],
                defaultIndex:3,
                className: 'slot1',
                textAlign: 'center'
                }, {
                divider: true,
                content: '-',
                className: 'slot2'
                }, {
                flex: 1,
                values: ["请选择"],
                defaultIndex:0,
                className: 'slot3',
                textAlign: 'center'
                }, {
                divider: true,
                content: '-',
                className: 'slot4'
                }, {
                flex: 1,
                values: ["请选择"],
                defaultIndex:0,
                className: 'slot5',
                textAlign: 'center'
                }
            ],
        };
    },
    watch: {
        popupVisible (newvs, oldvs) {   //判断选择地区弹窗的状态
            if(newvs) { // 如果areaVisible的值为true,说明弹窗出现,阻止body滑动
                this.closeTouch();
            } else {
                this.openTouch();
            }
        }
    },
    mounted() {
        let country = {
            rank: 1,
            code: '0086',
            // key:'ZWBBZ-XWBCS-L4TO2-6VNGT-54AWT-DZB4T'
        }
        
        // axios.post(test).then((res) =>{
        //     console.log(res)
        // })
        jsonp( test ,country, {
            success: result => {
                this.areaList[0].values = result.regionInfos;
                console.log('地址', result)
            },
            error: (err) => {
                console.log(err)
            }
        })
    },
    methods: {
        pickAddr () {
            this.popupVisible = true;
            this.flag = true
        },
        onValuesChange (picker, values) {
            if(this.flag ) {
                this.getArea(values[0]["code"]).then((data) => {    //通过省的code 获取市级列表
                    picker.setSlotValues(1,data)    //将市的地区列表放入 areaList的二级列表中
                });
                this.getArea(values[1]["code"]).then((data) => {    // 通过市的code 获取区(县)级列表
                        console.log('2121212',data.length)
                        picker.setSlotValues(2,data)
                        // if(data.length) {
                        //     picker.setSlotValues(2,data)
                        // } else {
                        //     picker.setSlotValues(2,)
                        // }
                        //     //将区的地区列表放入 areaList的三级列表中
                });
                let arr = picker.getValues();
                let province = arr[0].name ? arr[0].name : '请选择';
                let city = arr[1] ? arr[1].name : '';
                let area = arr[2] ? arr[2].name : '';
                this.cityName = `${province}-${city}-${area}`;
                this.cityCode = {
                    province: arr[0] ? arr[0].code : '' ,
                    city: arr[0] ? arr[1].code : '',
                    area: arr[0] ? arr[2].code : ''
                }
            }
        },
        // 根据code获取地址列表
        getArea (code) {
            console.log('code',code)
            return new Promise((resolve, reject) => {
                let data = {
                    code: code
                }
                jsonp(test, data, {
                    success: result => {
                        if(result.returnCode === '0000') {
                            resolve(result.regionInfos)
                        } else {
                            console.log(result.returnCode)
                        }
                    },
                    error: err => {
                        console.log(err)
                        reject(res)
                    }
                })
            })
        },
        // 取消
        closePopup() {
            console.log('取消')
            this.popupVisible = false;
        },
        // 确定
        sureArea() {
            console.log('确定')
            this.areaValue = this.cityName
            this.popupVisible = false;
        },
        closeTouch () {
            // 阻止默认事件
            document.getElementsByTagName("body")[0].addEventListener('touchmove', this.handler, {passive: false})
        },
        openTouch () {
            // 打开默认事件
            document.getElementsByTagName("body")[0].addEventListener('touchmove', this.handler, {passive: true})
        }
    }
};
</script>
<style lang="scss" scoped>
.Address {
    font-size: 14px;
    height: 100%;
    width: 100%;
    .pos{
        width: 100%;
    }
    .confirmKey {
        height: 40px;
        width: 100%;
        border-bottom: 1px solid #dadada;
        .conf {
            width: 75px;
            height: 100%;
            line-height: 40px;
            text-align: center;
            display: inline-block;
            &.conf_close {
                color: #666;
                float: left;
            }
            &.conf_sureArea {
                color: #f13a3c;
                float: right;
            }
        }
    }
}
</style>



