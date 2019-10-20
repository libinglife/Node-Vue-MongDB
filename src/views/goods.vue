<template>
    <div>
      <nav-header></nav-header>

      <!--<div style="height: 200px">-->
        <!--<span class="testSpan">你好</span>-->
      <!--</div>-->
      <bread>
        <span slot="moren">goods</span>
        <!--<span slot="second">你好2</span>-->
      </bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a @click="sortGoods" href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a @click.stop="showFilterPop" href="javascript:void(0)" class="filterby stopPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a  :class="{'cur':priceChecked=='all'}" href="javascript:void(0)" @click="setPriceFilter('all')">All</a></dd>
                <dd v-for="(priceItem , index) in priceFilter" @click="setPriceFilter(index)">
                  <a :class="{'cur':priceChecked==index}" href="javascript:void(0)">{{priceItem.startPrice}} - {{priceItem.endPrice}}</a>
                </dd>

              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item , index) in goods">
                    <div class="pic">
                      <a href="#"><img :src="'static/'+item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>

                <div class="loadingMore" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                 <p v-show="loading">加载中...</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
      <foot></foot>
    </div>
</template>

<script>
  import '../assets/css/base.css'
  import '../assets/css/login.css'
  import '../assets/css/checkout.css'
  import '../assets/css/product.css'

  import NavHeader from "@/components/NavHeader"
  import Foot from "@/components/Foot"
  import Bread from "@/components/Bread"
  // import axios from 'axios';
export default {
  name: "goods",
  data(){
    return {
        goods:[],
        priceFilter:[
            {
                startPrice:'0.00',
                endPrice:'100.00'
            },
            {
                startPrice:'100.00',
                endPrice:'500.00'
            },
            {
                startPrice:'500.00',
                endPrice:'1000.00'
            },
            {
                startPrice:'1000.00',
                endPrice:'5000.00'
            }
        ],
        sortFlag:true, //价格排序，
       page:1,
       pageSize:8,
       // priceLevel:'',

      priceChecked:'all',
      filterBy:false,
      overLayFlag:false,
      busy:true, //是否可以加载,
      loading:false
    }
  },
  components:{
    NavHeader,
    Foot,
    Bread
  },
  mounted(){
    this.getGoods();
  },
  methods:{
    getGoods(flag){
      let param ={
        page:this.page,
        pageSize:this.pageSize,
        sort:this.sortFlag? 1:-1,
        priceLevel: this.priceChecked
      };

      this.loading = true;

      this.axios.get('/api/goods',{
        params:param
      }).then(response=>{
        console.log(response);
        let res = response.data;
        this.loading =false;
        if(res.status==0){
          if(flag){
            this.goods = this.goods.concat(res.result.list);
            if(res.result.total<this.pageSize){
              this.busy = true;
            }else {
              this.busy = false;
            }
          }else {
            this.goods = res.result.list;
            this.busy =false;
          }

        }else {
          this.goods = []
        }
      })
    },
    sortGoods(){
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoods();

    },
    setPriceFilter(index){
      this.priceChecked = index;
      this.page=1;
      this.getGoods()
    },
    loadMore(){
      console.log(this.busy)
       this.busy = true;
       setTimeout(()=>{
           this.page++;
           this.getGoods(true);
       },500)
    },

    closeModal(){
      this.mdShow = false;
      this.mdShowCart = false;
    },
    showFilterPop(){
      this.filterBy=true;
      this.overLayFlag=true;
    },
    closePop(){
      this.filterBy=false;
      this.overLayFlag=false;
      // this.mdShowCart = false;
    }
  }
}
</script>

<style scoped>
  .testSpan{
    display: block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    /*border: 1px solid red;*/
    padding-left: 0;
    transition: padding-left 0.3s ease-in-out;
    margin-left: 0.3rem;
  }
  .testSpan:hover{
    padding-left: 30px;
    border-left: 3px solid red;
  }
  .loadingMore{
    text-align: center;
    padding: 20px ;
    font-size: 30px;
    color: orange;
  }
</style>
